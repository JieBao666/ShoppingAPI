describe("Home page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows a header", () => {
    cy.get(".vue-title").should('contain','Homer for Shopping !!');


    cy.get(".lead").should('contain','Time for shopping !!');
  })
  describe("Navigation bar", () => {
    it("Shows the required links", () => {
      cy.get(".navbar").contains('Home' );
      cy.get('.navbar-nav:nth-child(1)').within(() => {
        cy.get('.nav-item:first').should('contain', 'Home')
        cy.get('.nav-item:nth-child(2)').should('contain', 'Manage')
        cy.get('.nav-item:nth-child(3)').should('contain', 'Add')
        cy.get('.nav-item:nth-child(4)').should('contain', 'Map')
      })
      cy.get('.navbar-nav:nth-child(2)').within(() => {
        cy.get('.nav-item:first').should('contain', 'About')
        cy.get('.nav-item:nth-child(2)').should('contain', 'Contact')
        cy.get('.nav-item:nth-child(3)').should('contain', 'Login')
        cy.get('.nav-item:nth-child(4)').should('contain', 'Logout')
      })
    });

    it("Redirects when links are clicked", () => {
      cy.get(".navbar").contains('Manage' ).click();
      cy.url().should('include','/goods' )
      // etc
    });
    it("shows a brand", () => {
      cy.get(".navbar-brand").should('contain','Shopping Web App' )
      // etc
    });
  })
});
