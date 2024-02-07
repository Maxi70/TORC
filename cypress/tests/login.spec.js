import "../support";

const NOT_CONFIRMED_USER = "NotConfirmedUser";
const NOT_CONFIRMED_USER_PASSWORD = "Password12345!";
describe("Login", () => {
  before(() => {
    cy.visit("#/");
  });
  it.only("not confirmed user", () => {
    cy.get("#username").should("be.visible").type(NOT_CONFIRMED_USER);
    cy.get("#password").should("be.visible").type(NOT_CONFIRMED_USER_PASSWORD);
    cy.get('[data-cy="Login"]').click();
    cy.url().should("include", "/verification");
    cy.get("#username")
      .should("be.visible")
      .should("have.attr", "value", NOT_CONFIRMED_USER);
    cy.get('[data-cy="ResendCode"]').click();
    cy.wait(500);
    cy.get('[data-cy="VerificationCodeSent"]');
  });
});

describe("Verify Forgot Password", () => {
  before(() => {
    cy.visit("#/");
    cy.get('[data-cy="ForgotPassword"]').click();
    cy.url().should("include", "/forgot-password"); // => true
  });

  it.only("test invalid username", () => {
    cy.wait(1000);
    cy.get("#username").should("be.visible").type("CypressTestUserNotHere");
    cy.get('[data-cy="GetConfirmationCode"]').click();
    cy.contains("Username is invalid");
  });

  it.only("validate return to login page", () => {
    cy.get('[data-cy="Login"]').click();
    cy.url().should("include", "/");
  });
});
