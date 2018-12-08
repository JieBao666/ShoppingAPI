describe("Add Good page", () => {

  beforeEach(() => {
    cy.request('https://shoppingwebapp.herokuapp.com/goods/')
      .its('body')
      .then( (goods) => {
        goods.forEach( (element) => {
          cy.request('DELETE',
            'https://shoppingwebapp.herokuapp.com/goods/' + element._id)
        });
      })
    // Populate API's datastore
    cy.fixture('goods')
      .then((goods) => {
        goods.forEach((good) => {
          cy.request('POST',
            'https://shoppingwebapp.herokuapp.com/goods/', good )
        })
      })
    cy.visit("/");
    // Click Donate navbar link
    cy.get('.navbar-nav:nth-child(1)').
    find('.nav-item:nth-child(3)').click()
  });

  it("allows a valid good to be submitted", () => {
    // Fill out web form
    cy.get('#goods_name').select('Coke')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(1009);
    cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type('1200');
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(2);
    cy.contains('Thanks for add Good!').should('not.exist');
    cy.get('.error').should('not.exist')
    cy.get('.col-md-6').find(':nth-child(5)').find('.btn').click();
    cy.contains('Thanks for add Good!').should('exist');
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.url().should('include','/goods' )
  });
  it("shows error messages for incomplete form fields", () => {
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Please Fill in the Form Correctly.').should('exist');
    cy.get('.error').contains('ID')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(1010);
    cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type('1200');
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(3);
    cy.get('.col-md-6').find(':nth-child(5)').find('.btn').click()
    cy.contains('Thanks for add Good!').should('exist');
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.url().should('include','/goods' )
  });
})
