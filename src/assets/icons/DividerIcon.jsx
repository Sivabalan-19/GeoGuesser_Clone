export default function DividerIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
