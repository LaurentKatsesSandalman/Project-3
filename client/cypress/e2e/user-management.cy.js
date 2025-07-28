describe('Vérification de la route de seed', () => {
  it('devrait renvoyer un status 200 et un message de succès', () => {
    cy.seedDatabase().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Base de test réinitialisée');
    });
  });
});


// describe ('User Management E2E tests',()=>{


// })