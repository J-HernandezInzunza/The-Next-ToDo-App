describe('Deleting todo items', () => {
  beforeEach(() => {
    // Seed application with 8 todos (from fixtures directory
    // 4 complete, 4 incomplete
    cy.seedCompletedTodos();
    cy.seedIncompleteTodos();
    cy.visit('/');
  });

  it('Delete a single incomplete todo item | Click Path', () => {
    cy.get('#todo-list').children().should('have.length', 8);
    cy.get(`[data-testid='delete-icon']`).eq(0).click();
    cy.contains('Trash It').click();
    cy.get('#todo-list').children().should('have.length', 7);
  });

  it('Delete a single completed todo item | Click Path', () => {
    cy.get('#todo-list').children().should('have.length', 8);
    cy.get(`.completed-item [data-testid='delete-icon']`).eq(0).click();
    cy.contains('Trash It').click();
    cy.get('#todo-list').children().should('have.length', 7);
  });

  it('Delete multiple incomplete todo items | Click Path', () => {
    const todoArray = [0, 1, 2, 3];

    todoArray.forEach(() => {
      cy.get(`[data-testid='delete-icon']`).eq(0).click();
      cy.contains('Trash It').click();
      cy.wait(250);
    });

    cy.get('#todo-list').children().should('have.length', 4);
  });

  it('Delete multiple completed todo items | Click Path', () => {
    const todoArray = [0, 1, 2, 3];

    todoArray.forEach(() => {
      cy.get(`.completed-item [data-testid='delete-icon']`).eq(0).click();
      cy.contains('Trash It').click();
      cy.wait(250);
    });

    cy.get('#todo-list').children().should('have.length', 4);
  });
});
