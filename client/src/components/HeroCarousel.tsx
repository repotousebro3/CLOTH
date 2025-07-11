import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Trendy & Youthful',
      description: 'T-Shirts That Speak Your Style',
      buttonText: 'Shop Now',
      textPosition: 'right'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Elevate Your Everyday Style',
      description: 'Discover premium men\'s shirts tailored for comfort, class, and confidence — perfect for work, weekends, and everything in between',
      buttonText: 'Shop Now',
      textPosition: 'left'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Modern Sophistication',
      description: 'Jackets & Outerwear for the Contemporary Man',
      buttonText: 'Explore Collection',
      textPosition: 'center'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleShopNow = () => {
    console.log('Shop Now clicked');
    // Placeholder for shop now navigation
  };

  const getTextAlignment = (position: string) => {
    switch (position) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
        return 'text-center items-center';
      default:
        return 'text-left items-start';
    }
  };

  const getTextContainer = (position: string) => {
    switch (position) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
        return 'justify-center';
      default:
        return 'justify-start';
    }
  };

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Slides */}
      <div 
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative"
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Text Content */}
            <div className={`absolute inset-0 flex ${getTextContainer(slide.textPosition)} items-center px-8 lg:px-16`}>
              <div className={`max-w-2xl flex flex-col ${getTextAlignment(slide.textPosition)} space-y-6`}>
                <div className={`${getTextAlignment(slide.textPosition)}`}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white whitespace-nowrap">
                    {slide.title}
                  </h1>
                </div>
                
                <p className="text-lg lg:text-xl text-white font-light leading-relaxed max-w-lg mt-4">
                  {slide.description}
                </p>
                
                <button
                  onClick={handleShopNow}
                  className="group inline-flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-fit mt-6"
                >
                  <span>{slide.buttonText}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Indicators (optional - for desktop) */}
      <div className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col space-y-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-1 h-12 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-30 hover:bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;