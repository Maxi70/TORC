import Footer from "components/Footer";

import Navigation from "components/Navigation";
import Logo from "components/Logo/Logo";
import Newsletter from "components/Newsletter";
import MoreInfoNeeded from "./MoreInfoNeeded";

function MissingInfo() {
  return (
    <>
      <div className="object-small-hidden">
        <Navigation showButtons={false} />
      </div>
      <div>
        <div className="container-large">
          <Logo />
          <div className="large-section">
            <MoreInfoNeeded />
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
}

export default MissingInfo;
