export default function HotAirBalloon({ width = 80, height = 100, className = "", ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 80 100" className={className} {...props}>
      <ellipse cx="40" cy="35" rx="30" ry="35" fill="currentColor" />
      <path d="M40,35 L40,70" stroke="#D4A574" strokeWidth="1" />
      <path d="M35,35 L30,70" stroke="#D4A574" strokeWidth="1" />
      <path d="M45,35 L50,70" stroke="#D4A574" strokeWidth="1" />
      <rect x="30" y="70" width="20" height="15" fill="#8B6F47" rx="2" />
      <circle cx="35" cy="30" r="8" fill="#FFF5E1" opacity="0.3" />
    </svg>
  );
}
