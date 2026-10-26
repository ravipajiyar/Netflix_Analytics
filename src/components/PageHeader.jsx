
const PageHeader = ({ eyebrow = 'Analytics', title, description, children }) => {
  return (
    <div className="flex flex-col gap-5 animate-fade-up lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(229,9,20,0.9)]" />
          {eyebrow}
        </div>
        <h1 className="mt-3 font-display text-[1.85rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-zinc-400">{description}</p>
        )}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
};

export default PageHeader;
