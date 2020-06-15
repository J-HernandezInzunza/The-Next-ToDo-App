describe('Default rendering (on page load)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Homepage', () => {});

  it('AddTodoInput component', () => {
    cy.get('#add-form').within(() => {
      cy.get('input').should('have.attr', 'required');
      cy.get('input').should('have.attr', 'placeholder', 'What is your Next Todo?...');
      cy.get('button').should('have.attr', 'type', 'submit');
      cy.get('button').should('have.class', 'add-button');
    });
  });

  it('SearchTodoTextField component', () => {});

  it('TodoList component', () => {});
});
