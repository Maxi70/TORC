import { ReactComponent as CurrentStep } from "images/new/1-form-progress-indicator-current.svg";
import { ReactComponent as SuccessStep } from "images/new/1-form-progress-indicator-sucess.svg";
import { ReactComponent as OffStep } from "images/new/6-form-progress-indicator-off.svg";

export default function ProgressTick({
  text,
  current = false,
  success = false,
  jumpToStep,
}) {
  return (
    <div className="flex items-center" onClick={jumpToStep}>
      <div className="relative cursor-pointer ">
        {success ? <SuccessStep /> : current ? <CurrentStep /> : <OffStep />}
        <span className="absolute w-max left-1/2 transform -translate-x-1/2 top-16 b3">
          {text}
        </span>
      </div>
    </div>
  );
}
