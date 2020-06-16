describe('Adding todo items', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add a single todo item | Click Path', () => {
    const todoText = 'Add a todo by clicking';

    cy.get('#add-form input')
      .click()
      .type(todoText)
      .then(() => {
        cy.get('.add-button').click();
        cy.get('.todo-item').contains(todoText);
      });
  });

  it('Add a single todo item (Empty Input) | Click Path', () => {
    const todoText = 'Add a todo by clicking';

    cy.get('#todo-list').children().should('have.length', 0);
    cy.get('.add-button').click();
    cy.get('#todo-list').children().should('have.length', 0);
  });

  it('Add a single todo item | Keyboard', () => {
    const todoText = 'Add a todo by hitting enter (return)';

    cy.get('#add-form input')
      .focus()
      .type(`${todoText}{enter}`)
      .then(() => {
        cy.get('.todo-item').contains(todoText);
      });
  });

  it('Add a single todo item (Empty Input) | Keyboard', () => {
    cy.get('#todo-list').children().should('have.length', 0);
    cy.get('#add-form input').focus().type('{enter}');
    cy.get('#todo-list').children().should('have.length', 0);
  });

  it('Adding multiple todo items | Click Path', () => {
    const todoText = 'Add a todo by hitting enter (return) ';
    const todoArray = [0, 1, 2, 3, 4];

    todoArray.forEach((num) => {
      cy.get('#add-form input')
        .click()
        .type(todoText + num)
        .then(() => {
          cy.get('.add-button').click();
          cy.get('.todo-item')
            .eq(num)
            .contains(todoText + num);
        });
    });

    cy.get('#todo-list').children().should('have.length', 5);
  });
});
