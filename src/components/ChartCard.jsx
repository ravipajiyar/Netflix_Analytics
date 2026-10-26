
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
    </div>
  );
};

export default ChartCard;
