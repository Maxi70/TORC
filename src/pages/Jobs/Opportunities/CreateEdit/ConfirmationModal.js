import { createPortal } from "react-dom";
import Button from "components/FormComponents/Button";
import XIcon from "components/XIcon";
import { JOB_OPPORTUNITY_STATUSES } from "lookup";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  status,
  actionInProgress,
}) {
  let confirmText = "";
  let confirmButtonText = "";

  if (!open) return null;

  if (status === JOB_OPPORTUNITY_STATUSES.ACTIVE) {
    confirmText = "Are you sure you want to cancel this job?";
    if (actionInProgress) {
      confirmButtonText = "Cancelling...";
    } else {
      confirmButtonText = "Cancel Job";
    }
  } else if (status === JOB_OPPORTUNITY_STATUSES.CANCELLED) {
    confirmText = "Are you sure you want to restore this job?";
    if (actionInProgress) {
      confirmButtonText = "Restoring...";
    } else {
      confirmButtonText = "Restore Job";
    }
  } else {
    confirmText = "Are you sure you want to delete this job?";
    if (actionInProgress) {
      confirmButtonText = "Deleting...";
    } else {
      confirmButtonText = "Delete Job";
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 grid place-items-center z-10"
      style={{ background: `rgba(0, 0, 0, 0.3)` }}
    >
      <div
        className="md:p-24 p-8 text-white rounded flex flex-col gap-8 items-center relative"
        style={{ background: `linear-gradient(136.93deg, #CC4041, #8025BF)` }}
      >
        <button
          type="button"
          onClick={() => void onClose()}
          className="p-2 rounded border border-white absolute md:top-8 top-6 right-8"
        >
          <XIcon className="w-3 h-3" />
        </button>

        <p className="font-nexa text-3xl md:mt-0 mt-8">{confirmText}</p>

        <Button onClick={() => void onConfirm()} white>
          {confirmButtonText}
        </Button>
      </div>
    </div>,
    document.body
  );
}
