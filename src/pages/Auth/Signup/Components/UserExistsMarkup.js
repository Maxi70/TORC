import { Link } from "react-router-dom";

export const UserExistsMarkup = () => {
  return (
    <>
      A user exists, please{" "}
      <Link
        to="/login"
        className="text-bluepurple hover:text-black transition-color transition font-bold"
      >
        login
      </Link>{" "}
      or send yourself a{" "}
      <Link
        to="/forgot-password"
        className="text-bluepurple hover:text-black transition-color transition font-bold"
      >
        password reminder
      </Link>
      .
    </>
  );
};
