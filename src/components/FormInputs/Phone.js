import Checkbox from "components/FormComponentsNew/Checkbox";
import { FIELDS } from "pages/Profile/Wizard/ProfessionalProfile/Profile/utils";
import PhoneField from "pages/Profile/Wizard/shared/PhoneInput";

const Phone = ({ user, handleChange }) => {
  return (
    <>
      <PhoneField
        value={user.phone?.number}
        placeholder="e.g. (650) 251-23-34"
        label="Phone number"
      />
      <p className="ml-4 mt-[2px] mb-4 b5 text-grey-300">
        Your phone number is not displayed on your profile and is only used for
        job-related communication with Torc.
      </p>
      <div className="flex relative items-center" onChange={handleChange}>
        <Checkbox
          id={FIELDS.WHATSAPP_ALLOWED}
          disabled={user.phone?.number?.length < 7}
          label="Contact Me via WhatsApp. The team will reach out to you on WhatsApp for new job postings and status updateson existing job applications"
        />
        <div className="ml-4">
          <div className="b3">
            WhatsApp is my preferred method of communication from Torc for new
            job matches and status updates on existing job applications.
          </div>
        </div>
      </div>
    </>
  );
};

export default Phone;
