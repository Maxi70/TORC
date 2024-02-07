import Checkbox from "components/FormComponentsNew/Checkbox";

const AgreedToMarketing = () => {
  return (
    <div className="flex items-center">
      <Checkbox id="agreedToMarketing" />
      <div className="ml-4">
        <div className="b3">I agree to receive email updates from Torc.</div>
      </div>
    </div>
  );
};

export default AgreedToMarketing;
