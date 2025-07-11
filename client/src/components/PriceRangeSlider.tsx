import React, { useState, useRef, useCallback } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 50
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic step based on range
  const dynamicStep = Math.max(1, Math.floor((max - min) / 20));
  const actualStep = step < dynamicStep ? dynamicStep : step;

  const getPercentage = useCallback((val: number) => {
    if (max === min) return 0;
    return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number) => {
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    return min + (clampedPercentage / 100) * (max - min);
  }, [min, max]);

  const snapToStep = useCallback((val: number) => {
    const snapped = Math.round(val / actualStep) * actualStep;
    return Math.max(min, Math.min(max, snapped));
  }, [actualStep, min, max]);

  const updateValueFromPosition = useCallback((clientX: number, handleType: 'min' | 'max', shouldSnap = false) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    const rawValue = getValueFromPercentage(percentage);
    
    let newValue = shouldSnap ? snapToStep(rawValue) : rawValue;
    let newRange: [number, number];

    if (handleType === 'min') {
      // Ensure min doesn't exceed max minus minimum gap
      const minGap = Math.max(actualStep, (max - min) * 0.05); // 5% of range or step, whichever is larger
      newValue = Math.min(newValue, value[1] - minGap);
      newValue = Math.max(min, newValue);
      newRange = [newValue, value[1]];
    } else {
      // Ensure max doesn't go below min plus minimum gap
      const minGap = Math.max(actualStep, (max - min) * 0.05);
      newValue = Math.max(newValue, value[0] + minGap);
      newValue = Math.min(max, newValue);
      newRange = [value[0], newValue];
    }

    onChange(newRange);
  }, [value, min, max, actualStep, onChange, getValueFromPercentage, snapToStep]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(type);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      updateValueFromPosition(moveEvent.clientX, type, false);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      updateValueFromPosition(upEvent.clientX, type, true); // Snap on release
      setIsDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 0) return;
    
    setIsDragging(type);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();
      if (moveEvent.touches.length > 0) {
        updateValueFromPosition(moveEvent.touches[0].clientX, type, false);
      }
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      if (endEvent.changedTouches.length > 0) {
        updateValueFromPosition(endEvent.changedTouches[0].clientX, type, true); // Snap on release
      }
      setIsDragging(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Handle track click - click to move nearest handle
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const clickValue = getValueFromPercentage(percentage);

    // Determine which handle is closer
    const distanceToMin = Math.abs(clickValue - value[0]);
    const distanceToMax = Math.abs(clickValue - value[1]);

    const handleType = distanceToMin < distanceToMax ? 'min' : 'max';
    const snappedValue = snapToStep(clickValue);
    
    let newRange: [number, number];
    const minGap = Math.max(actualStep, (max - min) * 0.05);
    
    if (handleType === 'min') {
      newRange = [Math.min(snappedValue, value[1] - minGap), value[1]];
    } else {
      newRange = [value[0], Math.max(snappedValue, value[0] + minGap)];
    }

    onChange(newRange);
  };

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className="px-2 py-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
          <span>₹{Math.round(value[0]).toLocaleString()}</span>
          <span>₹{Math.round(value[1]).toLocaleString()}</span>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer select-none"
          onClick={handleTrackClick}
        >
          {/* Active Track */}
          <div
            className="absolute h-2 bg-black rounded-full pointer-events-none"
            style={{
              left: `${minPercentage}%`,
              width: `${Math.max(0, maxPercentage - minPercentage)}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 transition-transform duration-150 ease-out ${
              isDragging === 'min' 
                ? 'cursor-grabbing scale-110 shadow-xl' 
                : 'hover:scale-105'
            }`}
            style={{ 
              left: `${minPercentage}%`
            }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />
          
          {/* Max Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 transition-transform duration-150 ease-out ${
              isDragging === 'max' 
                ? 'cursor-grabbing scale-110 shadow-xl' 
                : 'hover:scale-105'
            }`}
            style={{ 
              left: `${maxPercentage}%`
            }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>₹{min.toLocaleString()}</span>
          <span>₹{max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;