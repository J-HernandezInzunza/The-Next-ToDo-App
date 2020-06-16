describe('Default rendering (on load) | No Todos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Homepage', () => {});

  it('AddTodoInput component', () => {
    cy.get('#add-form').within(() => {
      cy.get('input').should('have.attr', 'required');
      cy.get('input').should('have.attr', 'placeholder', "What's Your Next Todo?...");
      cy.get('button').should('have.attr', 'type', 'submit');
      cy.get('button').should('have.class', 'add-button');
    });
  });

  it('SearchTodoTextField component', () => {});

  it('TodoList component', () => {});
});

describe('Default rendering (on load) | Incomplete and Complete Todos', () => {
  beforeEach(() => {
    // Seed application with 8 todos (from fixtures directory
    // 4 complete, 4 incomplete
    cy.seedCompletedTodos();
    cy.seedIncompleteTodos();
    cy.visit('/');
  });

  it('Homepage', () => {});

  it('AddTodoInput component', () => {
    cy.get('#add-form').within(() => {
      cy.get('input').should('have.attr', 'required');
      cy.get('input').should('have.attr', 'placeholder', "What's Your Next Todo?...");
      cy.get('button').should('have.attr', 'type', 'submit');
      cy.get('button').should('have.class', 'add-button');
    });
  });

  it('SearchTodoTextField component', () => {});

  it('TodoList component', () => {});
});
