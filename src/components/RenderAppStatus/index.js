import SvgIcon from "components/SvgIcon";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";

const RenderAppStatus = ({ status, type }) => {
  if (type === "customer") {
    switch (status) {
      case JOB_APPLICATION_MATCH_STATUS.ACCEPTED:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-blue-800 mr-2" />
            HIRED
          </div>
        );
      case JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER:
      case JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-red-600 mr-2" />
            REJECTED
          </div>
        );
      case JOB_APPLICATION_MATCH_STATUS.MOREINFO:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-electricBlue mr-2" />
            INFO REQUESTED
          </div>
        );
      default:
        return <></>;
    }
  }

  switch (status) {
    case JOB_APPLICATION_MATCH_STATUS.ACCEPTED:
      return (
        <div className="flex text-sm font-rubik-regular items-center">
          <div className="w-2 h-2 rounded bg-green-900 mr-2" />
          HIRED
        </div>
      );

    case JOB_APPLICATION_MATCH_STATUS.APPLIED:
    case JOB_APPLICATION_MATCH_STATUS.MOREINFO:
    case JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK:
      return (
        <div className="flex text-sm font-rubik-regular items-center">
          <SvgIcon type={"wizardLinkFull"} className="mr-2 w-6 md:w-7 lg:w-8" />
          APPLIED
        </div>
      );
    case JOB_APPLICATION_MATCH_STATUS.INTERESTED:
      return (
        <div className="flex text-sm font-rubik-regular items-center">
          <SvgIcon type={"wizardLinkFull"} className="mr-2 w-6 md:w-7 lg:w-8" />
          INTERESTED
        </div>
      );
    case JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER:
      return (
        <div className="flex text-sm font-rubik-regular items-center">
          <div className="w-2 h-2 rounded bg-red-600 mr-2" />
          REJECTED
        </div>
      );
    case JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER:
      return (
        <div className="flex text-sm font-rubik-regular items-center">
          <div className="w-2 h-2 rounded bg-red-400 mr-2" />
          DECLINED
        </div>
      );
    default:
      return <div>&nbsp;</div>;
  }
};

export default RenderAppStatus;
