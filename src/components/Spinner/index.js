import classNames from "classnames";
import styles from "./spinner.module.css";

const Spinner = ({ className }) => {
  return <div className={classNames(styles.loadingSpinner, className)}></div>;
};

export default Spinner;
