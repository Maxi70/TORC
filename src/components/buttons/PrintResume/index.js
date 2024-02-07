import downloadIcon from "../../../images/download-file.svg";

const PrintResume = ({ className }) => {
  let styles = "";

  if (className) styles += className;

  return (
    <>
      <img src={downloadIcon} alt="Download Icon" className={styles} />
    </>
  );
};

export default PrintResume;
