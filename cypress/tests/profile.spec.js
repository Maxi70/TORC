// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
import "../support";

const LIMITED_USERNAME = "limitedtorcuser";
const LIMITED_USER_PASSWORD = "Password12345!";

const UNLOCKED_USERNAME = "unlockedtorc";
const UNLOCKED_USERNAME_ODD_CASE = "unLoCkEdtoRc";
const UNLOCKED_USER_PASSWORD = "Password12345!";

describe("Log in User that is unlocked", () => {
  beforeEach(() => {
    cy.login(UNLOCKED_USERNAME, UNLOCKED_USER_PASSWORD);

    cy.visit("#/");
  });
  it.only("should be logged in", () => {
    cy.contains("Welcome Back");
    cy.contains("Full Access");
    cy.get('[data-cy="ViewProfile"]').click();
    cy.get('[data-cy="profileUserName"]').contains(
      UNLOCKED_USERNAME.toLowerCase()
    );
  });

  it.only("user should not be found", () => {
    cy.visit("#/profile/blah");
    cy.contains("we couldn't find a profile");
  });

  it.only("viewing a limited user should not be found", () => {
    cy.visit(`#/profile/${LIMITED_USERNAME}`);
    cy.contains("locked");
  });
});

describe("Log in User that is limited", () => {
  beforeEach(() => {
    cy.login(LIMITED_USERNAME, LIMITED_USER_PASSWORD);

    cy.visit("#/");
  });
  it.only("should be logged in and see their own profile", () => {
    cy.contains("Welcome Back");
    cy.contains("Limited Access");
    cy.get('[data-cy="ViewProfile"]').click();
    cy.get('[data-cy="profileUserName"]').contains(
      LIMITED_USERNAME.toLowerCase()
    );
  });

  it.only("viewing an unlocked user should be found", () => {
    cy.visit(`#/profile/${UNLOCKED_USERNAME}`);
    cy.get('[data-cy="profileUserName"]').contains(
      UNLOCKED_USERNAME.toLowerCase()
    );
  });

  it.only("viewing an unlocked user should be found and case insensitive", () => {
    cy.visit(`#/profile/${UNLOCKED_USERNAME_ODD_CASE}`);
    cy.get('[data-cy="profileUserName"]').contains(
      UNLOCKED_USERNAME_ODD_CASE.toLowerCase()
    );
  });
  it.only("user should not be found", () => {
    cy.visit("#/profile/blah");
    cy.contains("we couldn't find a profile");
  });
});

/* need to update since the badge needs to appear
  it("should be able to see they have a sign up badge", () => {
    cy.get('div[id="badges-div"]')
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://api.badgr.io/public/assertions/X2vuhRn7QYS7n7OBW-LzYA/image"
      );
  });*/

describe("Viewing profile as anonymous", () => {
  it.only("user should be locked", () => {
    cy.visit(`#/profile/${LIMITED_USERNAME}`);
    cy.contains("locked");
  });

  it.only("user should be found", () => {
    cy.visit(`#/profile/${UNLOCKED_USERNAME}`);
    cy.get('[data-cy="profileUserName"]').contains(
      UNLOCKED_USERNAME.toLowerCase()
    );
  });

  it.only("user should not be found", () => {
    cy.visit("#/profile/blah");
    cy.contains("we couldn't find a profile");
  });
});
/*
describe('Visit Login', () => {
    it('Visits the Login Page', () => {
      cy.visit('http://localhost:3000/#/')
      cy.contains('AllowAll')
    })
  })
  */
