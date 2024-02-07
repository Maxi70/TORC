import Modal from "components/Modal";
import PropTypes from "prop-types";
import PrimaryBtn from "components/buttons/Primary";

import { ReactComponent as Close } from "images/new/1-button-close.svg";

export default function DeleteConfirmation({
  isLoading,
  title,
  handleClose,
  handleDelete,
}) {
  return (
    <Modal>
      <div className="bg-white p-8 rounded-sm pt-8 px-[104px]">
        <div className="relative mb-10">
          <h4 className="mb-6">Delete Experience</h4>
          <div className="b3 mb-4">
            Are you sure you want to delete {title}?
          </div>
          <Close
            className="absolute right-[-64px] top-0 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex justify-end gap-6">
          <PrimaryBtn
            className="!border-functionalDanger border-2"
            color="white"
            disabled={isLoading}
            label={isLoading ? "Deleting..." : "Delete"}
            onClick={() => handleDelete()}
          />
          <PrimaryBtn
            className="!border-gray border-2"
            label="Cancel"
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  );
}

DeleteConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
