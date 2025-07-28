// cypress/support/e2e.js
import './commands';

// Configuration globale
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorer certaines erreurs non critiques
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});