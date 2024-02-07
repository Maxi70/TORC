import Input from "components/FormComponentsNew/Input";

const ReferrerCode = () => {
  return (
    <div>
      <div className="b4 mb-6">
        If you received a referral code from a current member of the Torc
        community.
      </div>
      <div className="flex relative">
        <Input id="referrerCode" label="Referral Code (Optional)" />
      </div>
    </div>
  );
};

export default ReferrerCode;
