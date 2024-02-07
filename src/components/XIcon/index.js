export default function XIcon({ className }) {
  return (
    <svg viewBox="0 0 1 1" className={className}>
      <line
        x1={0.1}
        y1={0.1}
        x2={0.9}
        y2={0.9}
        stroke="currentColor"
        strokeWidth="0.15"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1={0.9}
        y1={0.1}
        x2={0.1}
        y2={0.9}
        stroke="currentColor"
        strokeWidth="0.15"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
