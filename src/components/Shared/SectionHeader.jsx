const SectionHeader = ({ label, title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      
      {/* Eyebrow label */}
      {label && (
        <p className="text-sm font-semibold tracking-wider uppercase text-primary">
          {label}
        </p>
      )}

      {/* Title */}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
