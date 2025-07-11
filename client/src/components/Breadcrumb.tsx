import React from 'react';
import { navigateToPage } from '../utils/navigation';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {item.href || item.onClick ? (
            <button
              onClick={item.onClick || (() => navigateToPage('home'))}
              className="hover:underline"
            >
              {item.label}
            </button>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-1">&gt;</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;