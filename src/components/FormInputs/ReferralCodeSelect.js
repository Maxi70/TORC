import Select from "components/FormComponentsNew/Select";
import Tooltip from "components/Tooltip";
import { REFERRAL_SOURCES } from "utils/referralSources";

const ReferralCodeSelect = () => {
  return (
    <div>
      <div>
        <div className="b4 mb-6">Where did you get the referral code from?</div>
        <Tooltip>
          If you entered a referral code in the previous input, select the
          source of the referral from below
        </Tooltip>
      </div>
      <Select id="referrerSource" label="Referral code source">
        <option value="">Please select</option>
        {Object.keys(REFERRAL_SOURCES).map((k) => (
          <option key={k} value={k}>
            {REFERRAL_SOURCES[k]}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ReferralCodeSelect;
