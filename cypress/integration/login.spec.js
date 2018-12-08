describe("Add Good page", () => {

  beforeEach(() => {
    cy.visit("/");
    // Click Donate navbar link
    cy.get('.navbar-nav:nth-child(2)').find('.nav-item:nth-child(3)').click()
  });
  it("Shows a header", () => {
    cy.get(".vue-title").should('contain', 'Log in');
  })
  it("allows three valid ways to Login", () => {
    cy.get('.firebaseui-idp-list').find(':nth-child(1)').find('.firebaseui-idp-text').should('contain','Sign in with Facebook')
    cy.get('.firebaseui-idp-list').find(':nth-child(2)').find('.firebaseui-idp-text').should('contain','Sign in with Google')
    cy.get('.firebaseui-idp-list').find(':nth-child(3)').find('.firebaseui-idp-text').should('contain','Sign in with email')
  })
  it("allows sign in with email", () => {
    cy.get('.firebaseui-idp-list').find(':nth-child(3)').find('.firebaseui-idp-button').click()
    cy.get('.firebaseui-card-content').find('.firebaseui-textfield').find('.mdl-textfield__input').type('645372879@qq.com')
    cy.get('.firebaseui-card-actions').find('.firebaseui-form-actions').find('.firebaseui-id-submit').click()
    cy.get('.firebaseui-id-page-federated-linking').find('.firebaseui-card-actions').find('.firebaseui-form-actions').find('.firebaseui-id-submit').click()
  })
})
