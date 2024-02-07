import PropTypes from "prop-types";

const Link = ({
  children,
  url,
  color = "white",
  hover = "brandPrimary",
  className,
  ...props
}) => {
  return (
    <a
      className={`text-${color} hover:text-${hover} cursor-pointer ${className}`}
      href={url}
      {...props}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string,
  color: PropTypes.string,
  hover: PropTypes.string,
  className: PropTypes.string,
};

export default Link;
