// `message` may be undefined if there is no error
export default function FormError({ children }) {
  if (!children) return null;
  return <p className="text-red-600">{children}</p>;
}
