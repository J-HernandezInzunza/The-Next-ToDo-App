const viewportSizes = Cypress.env('viewports');

describe('Moving incomplete todo items', () => {
  beforeEach(() => {
    // Seed application with 4 completed todos (from fixtures directory)
    cy.seedIncompleteTodos();
    cy.visit('/');
  });

  viewportSizes.forEach((size) => {
    let viewport = `Width: ${size.width}px Height: ${size.height}px`;

    describe(viewport, () => {
      it('Move todo item up one', () => {
        cy.viewport(size.width, size.height).then(() => {
          cy.get('#todo-list').children().eq(3).contains('French Toast');

          cy.get('.todo-item')
            .eq(3)
            .within(() => {
              cy.get('.menu-icon').click();
            });
          cy.get('.MuiMenu-list').eq(3).contains('Move Up').click();

          cy.get('#todo-list').children().eq(2).contains('French Toast');
          cy.wait(500);
        });
      });

      it('Move todo item to top', () => {
        cy.viewport(size.width, size.height).then(() => {
          cy.get('#todo-list').children().eq(3).contains('French Toast');

          cy.get('.todo-item')
            .eq(3)
            .within(() => {
              cy.get('.menu-icon').click();
            });
          cy.get('.MuiMenu-list').eq(3).contains('Move To Top').click();

          cy.get('#todo-list').children().eq(0).contains('French Toast');
          cy.wait(500);
        });
      });

      it('Move todo item down one', () => {
        cy.viewport(size.width, size.height).then(() => {
          cy.get('#todo-list').children().eq(0).contains('Buy Milk');

          cy.get('.todo-item')
            .eq(0)
            .within(() => {
              cy.get('.menu-icon').click();
            });
          cy.get('.MuiMenu-list').eq(0).contains('Move Down').click();

          cy.get('#todo-list').children().eq(1).contains('Buy Milk');
          cy.wait(500);
        });
      });

      it('Move todo item to bottom', () => {
        cy.viewport(size.width, size.height).then(() => {
          cy.get('#todo-list').children().eq(0).contains('Buy Milk');

          cy.get('.todo-item')
            .eq(0)
            .within(() => {
              cy.get('.menu-icon').click();
            });
          cy.get('.MuiMenu-list').eq(0).contains('Move To Bottom').click();

          cy.get('#todo-list').children().eq(3).contains('Buy Milk');
          cy.wait(500);
        });
      });
    });
  });
});
