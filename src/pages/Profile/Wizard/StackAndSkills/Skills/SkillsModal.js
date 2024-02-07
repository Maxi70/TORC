import PrimaryBtn from "components/buttons/Primary";
import YellowBox from "../../shared/YellowBox";
import { SKILL_EXPERIENCE } from "utils/skills";
import Modal from "components/Modal";

export const SkillsModal = ({
  skill,
  handleSetExperience,
  handleOnSubmit,
  handleOnCancel,
}) => {
  return (
    <Modal>
      <div className="bg-white p-8 rounded-sm w-[400px]">
        <h5 className="mb-6">What is your experience with this skill.</h5>
        <div className="flex gap-8 mb-6">
          <div
            style={{ boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.1)" }}
            className="b5 border text-center rounded-sm border-brandSecondary w-[100px] h-[100px] flex items-center justify-center"
          >
            {skill.name}
          </div>
          <div className="flex flex-col gap-2">
            {Object.keys(SKILL_EXPERIENCE).map((exp, index) => (
              <YellowBox
                key={index}
                selected={skill?.experience === exp}
                handleClick={() => handleSetExperience(exp)}
              >
                {SKILL_EXPERIENCE[exp].label}
              </YellowBox>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <PrimaryBtn
            className="!h-[44px] !border-brandTerciary border-2"
            color="white"
            label="Cancel"
            onClick={handleOnCancel}
            fullWidth
          />
          <PrimaryBtn
            className="!h-[44px] !min-w-0"
            label="Submit"
            fullWidth
            disabled={skill.experience === undefined}
            onClick={handleOnSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
