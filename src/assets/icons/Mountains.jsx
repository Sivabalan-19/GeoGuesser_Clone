export default function Mountains({ width = 300, height = 200, className = "", ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 300 200" className={className} {...props}>
      <path d="M0,200 L50,120 L100,200 Z" fill="currentColor" />
      <path d="M80,200 L150,80 L220,200 Z" fill="currentColor" />
      <path d="M200,200 L250,140 L300,200 Z" fill="currentColor" />
      <path d="M150,90 L160,70 L170,90" stroke="#FF6B35" strokeWidth="2" fill="none" />
    </svg>
  );
}
