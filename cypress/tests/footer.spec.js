import "../support/commands";
import moment from "moment";

//need to replace this ***REPLACE ME*******
const baseUrl = "https://www.torc.dev";

describe("Validate footer", () => {
  before(() => {
    cy.visit("#/");
  });
  it("validate social links", () => {
    cy.get('a[alt="discord link"]').should(
      "have.attr",
      "href",
      "https://discord.gg/H3FSVWG8vf"
    );
    cy.get('a[alt="twitter link"]').should(
      "have.attr",
      "href",
      "https://www.twitter.com/opentorc"
    );
    cy.get('a[alt="linkedin link"]').should(
      "have.attr",
      "href",
      "https://www.linkedin.com/company/opentorc"
    );
    cy.get('a[alt="twitch link"]').should(
      "have.attr",
      "href",
      "https://www.twitch.tv/opentorc"
    );
    cy.get('a[alt="github link"]').should(
      "have.attr",
      "href",
      "https://github.com/opentorc"
    );
  });

  it("validate main footer links", () => {
    cy.get('a[alt="Contact Us"]').should(
      "have.attr",
      "href",
      `${baseUrl}/contact`
    );
    cy.get('a[alt="About Us"]').should(
      "have.attr",
      "href",
      `${baseUrl}/about-us`
    );
  });

  it("validate footer legal links", () => {
    cy.contains(`@ Torc ${moment().format("YYYY")}`);
  });
});
