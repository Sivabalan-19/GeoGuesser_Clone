export default function Airplane({ width = 100, height = 60, className = "", ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 60" className={className} {...props}>
      <path d="M10,30 L40,20 L90,25 L95,30 L90,35 L40,40 L10,30 Z" fill="currentColor" />
      <path d="M40,30 L20,10 L30,30" fill="currentColor" />
      <path d="M60,30 L60,45 L65,45 L65,30" fill="currentColor" />
      <circle cx="85" cy="30" r="3" fill="#FF6B35" />
    </svg>
  );
}
