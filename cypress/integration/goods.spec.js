describe("Manage Goods page", () => {

  beforeEach(() => {
    // Delete all donations in the API's datastore
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
    cy.get('.navbar-nav:nth-child(1)').
    find('.nav-item:nth-child(2)').click()

  });

  it("allows a good to be deleted", () => {
    cy.get('tbody').find('tr').should('have.length', 6)
    // Click trash/delete link of 3rd donation in list
    cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(8)').click()
    // Click confirmation button
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 5)
  });

  it("allows amount to be increased", () => {
    cy.get('tbody').find('tr').should('have.length', 6)
    // Click trash/delete link of 3rd donation in list
    cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(6)').click()
    cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(5)').should('contain', 1001)
  });
  it("allows a good to be edited", () => {
    cy.get('tbody').find('tr').should('have.length', 6)
    cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(7)').click()
    cy.url().should('include','/edit' )
    cy.get('#goods_name').should('contain','beef')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').should('have.length', 1)
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.url().should('include','/goods' )
  })
})
