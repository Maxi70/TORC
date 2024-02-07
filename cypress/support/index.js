// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')
//cookie for consent manager
const COOKIE_NAME = "tracking-preferences";
//as of 11/23 turns off all trackers
const COOKIE_VALUE =
  "{%22version%22:1%2C%22destinations%22:{%22Google%20Tag%20Manager%22:false%2C%22Heap%22:false}%2C%22custom%22:{%22marketingAndAnalytics%22:false%2C%22advertising%22:false%2C%22functional%22:false}}";

// turns off all trackers by creating cookie
Cypress.on("window:before:load", (window) => {
  window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; path=/`;
});
