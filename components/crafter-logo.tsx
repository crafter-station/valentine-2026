export function CrafterLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#ff6b9d" />
      <path
        d="M16 8L8 12V20L16 24L24 20V12L16 8Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M16 13L12 15V19L16 21L20 19V15L16 13Z"
        fill="#ff6b9d"
      />
    </svg>
  );
}
