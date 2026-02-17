export default function TriangleIcon({ className = "w-3 h-3", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
    </svg>
  );
}
