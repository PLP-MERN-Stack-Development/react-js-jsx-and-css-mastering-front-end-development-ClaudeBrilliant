export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow rounded p-4 ${className}`}>
      {children}
    </div>
  );
}
