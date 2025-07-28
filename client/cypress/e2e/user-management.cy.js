describe('Vérification de la route de seed', () => {
  it('devrait renvoyer un status 200 et un message de succès', () => {
    cy.seedDatabase().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Base de test réinitialisée');
    });
  });
});


describe ('User Management E2E tests',()=>{
     beforeEach(() => {
    cy.seedDatabase();
  });

describe('user registration flow',()=>{
    it("should allow user to register", ()=>{

        //arrange
        const userData = {
            email: "pipo@example.com",
            password: "Qq1!passAa2,"
        }

        //act
        cy.visit('/');
        cy.get('[data-testid="register-openmodal-button"]').click();

        //remplir le formulaire
        cy.get('[data-testid="email-input"]').type(userData.email);
        cy.get('[data-testid="password-input"]').type(userData.password);
        cy.get('[data-testid="confirm-password-input"]').type(userData.password);

        // Soumettre le formulaire
        cy.get('[data-testid="register-submit-button"]').click();


        //assert
        cy.url().should('include', '/forms');
        cy.get('[data-testid="h1-vos-formulaires"]').should('contain', 'Vos formulaires');
        cy.get('[data-testid="success-notification"]').should('contain', 'Registration successful');
    }
    )
})

})