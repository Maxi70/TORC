import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import Checkbox from "components/FormComponentsNew/Checkbox";
import CustomError from "pages/Auth/Signup/Components/CustomError";
import CustomLink from "components/Link/index";
import URLS from "utils/urls";

const AgreedToTerms = ({ isEnterprise }) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <div className="flex items-center">
        <Checkbox id="agreedToTerms" />
        <div className="ml-4">
          <div className="b3">
            I agree to the{" "}
            {!isEnterprise && (
              <>
                <CustomLink
                  color="bluepurple"
                  hover="black"
                  className="transition-color transition font-bold"
                  href={URLS.TALENT_AGREEMENT}
                  alt="talent agreement"
                  data-cy="talent agreement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talent Agreement
                </CustomLink>
                {", "}{" "}
              </>
            )}
            <CustomLink
              color="bluepurple"
              hover="black"
              className="transition-color transition font-bold"
              href={URLS.TERMS}
              alt="terms"
              data-cy="terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </CustomLink>{" "}
            and{" "}
            <a
              className="text-bluepurple hover:text-black transition-color transition font-bold"
              href="https://www.torc.dev/privacy-policy"
              alt="privacy policy"
              data-cy="privacy policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy.
            </a>
          </div>
        </div>
      </div>
      <CustomError
        message={errors.agreedToTerms?.message}
        className="sm:ml-16"
      />
    </div>
  );
};

AgreedToTerms.propTypes = {
  isEnterprise: PropTypes.bool,
};

export default AgreedToTerms;
