// cypress/support/commands.js
// Commandes personnalisées
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add('createUser', (userData) => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: userData,
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

Cypress.Commands.add('seedDatabase', () => {
  cy.request('POST', '/api/test/seed');
});