import { useFormContext } from "react-hook-form";

import SearchLocationsNew from "components/Locations/LocationsNew/SearchLocationsNew";
import Error from "pages/Auth/Signup/Components/CustomError";

const Location = ({ location, setLocation }) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <SearchLocationsNew location={location} setLocation={setLocation} />
      <Error message={errors.location?.message} />
    </div>
  );
};

export default Location;
