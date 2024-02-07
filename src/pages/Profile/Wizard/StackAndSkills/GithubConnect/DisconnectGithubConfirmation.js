import { useState } from "react";
import Modal from "components/Modal";
import PrimaryBtn from "components/buttons/Primary";

import { ReactComponent as Close } from "images/new/1-button-close.svg";

const SUCCESS_MESSAGE =
  "You have successfully disconnected your Github account.";

const DisconnectGithubConfirmation = ({
  onClose,
  onSubmit,
  isSuccess,
  errorMessage,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [hasDisconnected, setHasDisconnected] = useState(false);

  const handleSubmit = async () => {
    if (hasDisconnected || isSuccess) {
      onClose();

      return;
    }
    setSubmitting(true);

    try {
      await onSubmit();
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
    setHasDisconnected(true);
  };

  return (
    <Modal>
      <div className="bg-white p-8 rounded-sm pt-8 px-[104px]">
        <div className="relative">
          <h4 className="mb-6">Disconnect Github Profile</h4>
          <div className="b3 mb-4">
            Are you sure you want to disconnect your Github account ?
            <p>
              <i>Disconnecting will remove Github stats from your profile.</i>
            </p>
          </div>
          <Close
            className="absolute right-[-75px] top-0 cursor-pointer"
            onClick={onClose}
          />
          {errorMessage && (
            <p className="text-red-500 font-nexa font-bold">{errorMessage}</p>
          )}
          {isSuccess && (
            <p className="text-brandSecondary font-nexa font-bold">
              {SUCCESS_MESSAGE}
            </p>
          )}
        </div>

        <div className="flex justify-between pt-6 font-rubik-regular font-bold w-full">
          <PrimaryBtn
            className="!border-functionalDanger border-2"
            color="white"
            disabled={submitting}
            label={submitting ? "DISCONNECTING..." : "OK"}
            onClick={handleSubmit}
          />
          {!hasDisconnected && !isSuccess && (
            <PrimaryBtn
              className="!border-gray border-2 ml-1"
              label="Cancel"
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DisconnectGithubConfirmation;
