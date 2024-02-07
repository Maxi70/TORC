import React, { useEffect } from "react";
import NotFoundImage from "images/404.png";
import Footer from "components/Footer";
import Header from "components/Header";

export default function Generic404Page() {
  useEffect(() => {
    document.title = "404 - Looking for something";
  }, []);

  //return consistent header
  const getHeader = <Header />;

  return (
    <div>
      {getHeader}

      <img className="object-center" alt="404 not found" src={NotFoundImage} />

      <Footer />
    </div>
  );
}
