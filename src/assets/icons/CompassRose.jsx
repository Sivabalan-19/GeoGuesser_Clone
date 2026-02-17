export default function CompassRose({ width = 140, height = 140, className = "", ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 140 140" className={className} {...props}>
      <circle cx="70" cy="70" r="65" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="70" cy="70" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="70" cy="70" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M70 10 L78 60 L70 65 L62 60 Z" fill="#FF6B35" />
      <path d="M70 130 L62 80 L70 75 L78 80 Z" fill="currentColor" opacity="0.4" />
      <path d="M130 70 L80 78 L75 70 L80 62 Z" fill="currentColor" opacity="0.6" />
      <path d="M10 70 L60 62 L65 70 L60 78 Z" fill="currentColor" opacity="0.4" />
      <circle cx="70" cy="70" r="8" fill="#FF6B35" />
      <circle cx="70" cy="70" r="4" fill="#FFF5E1" />
    </svg>
  );
}
