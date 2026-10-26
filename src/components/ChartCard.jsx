<<<<<<< HEAD
// src/components/ChartCard.jsx
import React from 'react';

const ChartCard = ({ title, children, className = 'mb-4' }) => {
  return (
    <div className={`bg-white shadow rounded p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
=======

const ChartCard = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  bodyClassName = '',
  index = 0,
}) => {
  return (
    <div
      className={`card animate-fade-up p-5 sm:p-6 ${className}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h3 className="font-display text-base font-semibold tracking-tight text-white">
                {title}
              </h3>
            )}
            {subtitle && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
    </div>
  );
};

<<<<<<< HEAD
export default ChartCard;
=======
export default ChartCard;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
