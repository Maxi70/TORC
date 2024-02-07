import PrimaryBtn from "components/buttons/Primary";

const Footer = ({
  savingChanges,
  onNext,
  onSkip,
  onBack,
  disabled,
  showBackBtn,
  autoSaved,
  finalStep,
}) => {
  let buttonText = "Next";
  if (savingChanges) {
    buttonText = "Saving...";
  } else if (finalStep) {
    buttonText = "Done";
  }

  return (
    <div className="h-[18vh] z-10 fixed bottom-0 w-full bg-grey-100 before:bg-grey-100 before:w-full before:h-48 before:absolute before:left-0 before:z-[-1]">
      <div className="compact-text container-large justify-end gap-10 mb-[15px] flex items-center h-full">
        {showBackBtn && (
          <PrimaryBtn
            label="Back"
            onClick={onBack}
            className="mr-auto !border-functionalSuccess border-2"
            color="transparent"
          />
        )}
        <div className="b3 text-brandSecondary cursor-pointer" onClick={onSkip}>
          Skip
        </div>
        <div>
          <PrimaryBtn
            label={buttonText}
            loading={savingChanges}
            disabled={disabled}
            onClick={onNext}
          />
          {autoSaved && (
            <div className="b3 text-grey-800 flex justify-end absolute mt-1">
              Automatically saved
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
