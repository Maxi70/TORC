// import { useCallback, useEffect, useRef, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Footer from "components/Footer";
// import Header from "components/Header";
// import styles from "./index.module.css";
// import classNames from "classnames";

return (

  <>
    <div className="bg-background">
      <Header
        pageHeader={
          <>
            <div className="flex items-center justify-center mx-32 mt-8 pb-4">
              <div className="w-full tracking-wider"></div>
            </div>
          </>
        }
      />
      <body>
        <iframe src="https://torc.my.salesforce-sites.com/torcshop?id=<user._id>"
                width="100%"
                height="100vh"
                frameborder="0"
                style="min-height: 400px;">
        </iframe>
      </body>
      <Footer/>
    </div>
  </>
);