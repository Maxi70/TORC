import Input from "components/FormComponentsNew/Input";

const ReferralCode = () => {
  return (
    <div>
      <div className="b4 mb-6">
        If you received a referral code from a current member of the Torc
        community.
      </div>
      <div className="flex relative">
        <Input id="referrerCode" label="Referral code (optional)" />
      </div>
    </div>
  );
};

export default ReferralCode;
