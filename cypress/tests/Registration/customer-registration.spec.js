import "../../support";

import moment from "moment";

const NEW_REG = "NewCustomer" + moment().format("MMDDYYYYhmmss");
const NEW_REG_PASSWORD = "Password12345!";

describe("registration with referral code", () => {
  //validate cookie for app side
  it.only("referral code for app side", () => {
    cy.visit("#/signup?referralCode=CustomerMessTest");
    cy.get("[data-cy=enterprise-signup]").click();
    cy.get("#vip").should("have.attr", "value", "CustomerMessTest");
  });
  /*
//validate cookie for marketing side
it.only("referral code for marketing side", () => {
  cy.visit("https://www.torc.dev?referralCode=MessOpenTorc")
  cy.visit("#/signup")
  cy.get('[data-cy="freelancer-signup"]').click();
  cy.get("[#vip]").should("have.attr","value", "MessOpenTorc");
});
*/
});

describe("registration from login page", () => {
  it.only("visit login but then click sign up", () => {
    cy.visit("#/");
    cy.contains("Need an account?").click();
  });
});

describe("Register new customer", () => {
  beforeEach(() => {
    cy.visit("#/signup");
    cy.get('[data-cy="enterprise-signup"]').click();
  });

  it.only("validate correct benefits are shown", () => {
    //shows enterprise benefits
    cy.contains("Access the best");
    cy.contains("Get the right talent, right away.");
    cy.contains("Feel secure.");
  });

  it.only("validate correct terms are shown", () => {
    //validate correct terms show
    cy.get('[data-cy="talent agreement"]').should("not.exist");

    cy.get('[data-cy="terms"]')
      .should("have.attr", "href", "https://www.torc.dev/terms")
      .should("have.attr", "rel", "noopener noreferrer")
      .should("have.attr", "target", "_blank");
    cy.get('[data-cy="privacy policy"]')
      .should("have.attr", "href", "https://www.torc.dev/privacy-policy")
      .should("have.attr", "rel", "noopener noreferrer")
      .should("have.attr", "target", "_blank");
  });

  //register user
  it.only("register customer", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");
    cy.get("#lastName").should("be.visible").type("Typing");
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);

    cy.get("#username").should("be.visible").type(`${NEW_REG}`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#chkTerms").click();
    cy.get("#company").should("be.visible").type("Test Company");

    //cy.get('[data-cy="error-confirmpassword"]').should("not.exist");
    cy.get('[data-cy="signup"]').click();
    //wait 2 seconds to make sure sign up completes
    cy.wait(2000);
    cy.url().should("include", "/signup"); // => true

    //cy.get("#username").should("have.attr","value",`${NEW_REG}`)
  });
});
describe("Make sure limited user gets confirmed", () => {
  it.only("attempt to login with created user", () => {
    cy.visit("#/");
    cy.url().should("include", "/login"); // => true

    cy.get("#username").should("be.visible").type(`${NEW_REG}`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);

    cy.get('[data-cy="Login"]').click();

    cy.url().should("include", "/verification"); // => true
  });
});
describe("Register new customer validation checks", () => {
  beforeEach(() => {
    cy.visit("#/signup");
    cy.get('[data-cy="enterprise-signup"]').click();
  });

  it.only("confirm password mismatch", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`${NEW_REG}`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`not matching`);
    cy.get("#company").should("be.visible").type("Test Company");

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("Passwords must match");
  });

  it.only("must not reuse email", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`!BrandNewUs3rCustomer`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#company").should("be.visible").type("Test Company");
    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.wait(1500);
    cy.contains("A user with that email address already exists");
  });

  it.only("must not reuse email case insensitive", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`!BrandNewUs3rCustomer`);
    cy.get("#email").should("be.visible").type(`DAVE+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#company").should("be.visible").type("Test Company");
    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.wait(1500);
    cy.contains("A user with that email address already exists");
  });

  it.only("must not reuse username", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`${NEW_REG}`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}new@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);

    cy.get("#company").should("be.visible").type("Test Company");

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.wait(1500);
    cy.contains("User already exists");
  });

  it.only("must not reuse username case insensitive", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`${NEW_REG.toUpperCase()}`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}new@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);

    cy.get("#company").should("be.visible").type("Test Company");

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.wait(1500);
    cy.contains("User already exists");
  });
  it.only("username must not look like email", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`t@test.com`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);

    cy.get("#company").should("be.visible").type("Test Company");

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.wait(1500);
    cy.contains("Username cannot be of email format");
  });

  it.only("validate long and short usernames", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username")
      .should("be.visible")
      .type(`ABCDEFHIJKLABCDEFHIJKLABCDEFHIJKL`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#company").should("be.visible").type("Test Company");

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("Max is 25");
    cy.get("#username").should("be.visible").clear().type(`A`);
    cy.get('[data-cy="signup"]').click();
    cy.contains("Min is 2");
  });

  it.only("validate required fields", () => {
    cy.get('[data-cy="signup"]').click();
    cy.contains("You must accept the terms and conditions");
    cy.contains("Please enter your first name");
    cy.contains("Please enter your last name");
    cy.contains("Please enter your email address");
    cy.contains("Choose your username to represent you on the site");
    cy.contains("Please enter your password");
    cy.contains("Please enter your company name");
  });
  it.only("validate errors are recoverable fields", () => {
    cy.get('[data-cy="signup"]').click();
    cy.contains("You must accept the terms and conditions");
    cy.contains("Please enter your first name");
    cy.contains("Please enter your last name");
    cy.contains("Please enter your email address");
    cy.contains("Choose your username to represent you on the site");
    cy.contains("Please enter your password");
    cy.contains("Please enter your company name");

    cy.get("#firstname").should("be.visible").type("Cypress");
    cy.get("#lastName").should("be.visible").type("Typing");
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);

    cy.get("#username").should("be.visible").type(`${NEW_REG}`);
    cy.get("#password").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#confirmPassword").should("be.visible").type(`${NEW_REG_PASSWORD}`);
    cy.get("#chkTerms").click();
    cy.get("#chkMkting").click();
    cy.get("#company").should("be.visible").type("Test Company");

    cy.contains("You must accept the terms and conditions").should("not.exist");
    cy.contains("Please enter your first name").should("not.exist");
    cy.contains("Please enter your last name").should("not.exist");
    cy.contains("Please enter your email address").should("not.exist");
    cy.contains("Choose your username to represent you on the site").should(
      "not.exist"
    );
    cy.contains("Please enter your company name").should("not.exist");
    cy.contains("Please enter your password").should("not.exist");

    //should add way to validate they don't appear
  });
});

//"Please ensure your password contains at least one, upper and lowercase characters, one number, and one special characters
describe("Validate Password rules", () => {
  beforeEach(() => {
    cy.visit("#/signup");
    cy.get('[data-cy="enterprise-signup"]').click();
  });
  it.only("validate short password 7 characters", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`RegUser`);
    cy.get("#email")
      .should("be.visible")
      .type(`dave+${NEW_REG}staging@torc.dev`);
    cy.get("#password").should("be.visible").type(`abcdefg`);
    cy.get("#confirmPassword").should("be.visible").type(`abcdefg`);

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("Minimum length of a password is 8 characters");
  });

  it.only("validate passwords contains one number", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`RegUser`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`abcdefgA!`);
    cy.get("#confirmPassword").should("be.visible").type(`abcdefgA!`);

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("ensure your password contain");
  });

  it.only("validate passwords contains one symbol", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`RegUser`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`abcdefghij1A`);
    cy.get("#confirmPassword").should("be.visible").type(`abcdefghij1A`);

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("ensure your password contain");
  });

  it.only("validate passwords contains one capital", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`RegUser`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`abcdefghij1!`);
    cy.get("#confirmPassword").should("be.visible").type(`abcdefghij1!`);

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("ensure your password contain");
  });

  it.only("validate passwords contains one lowercase", () => {
    cy.get("#firstname").should("be.visible").type("Cypress");

    cy.get("#lastName").should("be.visible").type("Typing");

    cy.get("#username").should("be.visible").type(`RegUser`);
    cy.get("#email").should("be.visible").type(`dave+${NEW_REG}@torc.dev`);
    cy.get("#password").should("be.visible").type(`ABCDEFH1!`);
    cy.get("#confirmPassword").should("be.visible").type(`ABCDEFH1!`);

    cy.get("#chkTerms").click();

    cy.get('[data-cy="signup"]').click();
    cy.contains("ensure your password contain");
  });
});
