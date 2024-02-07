import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useOffClick } from "hooks";

/**
 * @param onClose a function passed in to close the modal
 */

const Modal = ({ children, onClose }) => {
  const parentRef = useRef();

  useOffClick(parentRef, onClose, true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return createPortal(
    <div
      ref={parentRef}
      className="fixed inset-0 grid place-items-center z-2000"
      style={{
        background: `rgba(0, 0, 0, 0.3)`,
        height: "100%",
        width: "100%",
      }}
    >
      <div className="overflow-y-auto" style={{ maxHeight: "95%" }}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
