const testUrl = 'http://localhost:4000';

const domElementsIds = {
  ingredientItem: '[data-testid="ingredient-item"]',
  bunTop: '[data-testid="bun-top"]',
  bunBottom: '[data-testid="bun-bottom"]',
  constructorMainIngredient: '[data-testid="constructor-main-ingredient"]',
  modal: '[data-testid="modal"]',
  modalCloseButton: '[data-testid="modal-close-button"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  orderButton: '[data-testid="order-button"]'
};

const textElements = {
  bunName: 'Краторная булка N-200i',
  mainIngredientName: 'Биокотлета из марсианской Магнолии',
  sauceName: 'Соус Spicy-X'
};

describe('e2e tests', () => { 
  beforeEach(() => { 
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
      }).as('getIngredients');

    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  describe('тест добавления ингредиентов', () => { 
    it('тест добавления булки', () => { 
      cy.contains(textElements.bunName)
        .parents(domElementsIds.ingredientItem)
        .find('button')
        .click()
      
      cy.get(domElementsIds.bunTop).should('contain', textElements.bunName);
      cy.get(domElementsIds.bunBottom).should('contain', textElements.bunName);
    }) 

    it('тест добавления начинки', () => { 
      cy.contains(textElements.mainIngredientName)
        .parents(domElementsIds.ingredientItem)
        .find('button')
        .click()
      
      cy.get(domElementsIds.constructorMainIngredient).should('contain', textElements.mainIngredientName)
    })

    it('тест добавления соуса', () => {
      cy.contains(textElements.sauceName)
        .parents(domElementsIds.ingredientItem)
        .find('button')
        .click();

      cy.get(domElementsIds.constructorMainIngredient).should('contain', textElements.sauceName);
    });
  })

  describe('тест модального окна ингредиента', () => { 
    it('тест открытия модалки', () => { 
      cy.contains(textElements.sauceName)
        .click()

      cy.get(domElementsIds.modal)
        .should('be.visible')
        .and('contain', textElements.sauceName)
        .and('contain', 'Детали ингредиента');
    })

    it('тест закрытия модалки кликом по крестику', () => { 
      cy.contains(textElements.sauceName)
        .click()

      cy.get(domElementsIds.modal)
        .should('be.visible')

      cy.get(domElementsIds.modalCloseButton)
        .click()

      cy.get(domElementsIds.modal)
        .should('not.exist')
    })

    it('тест закрытия модалки кликом на оверлей', () => { 
      cy.contains(textElements.sauceName)
        .click()

      cy.get(domElementsIds.modal)
        .should('be.visible')

      cy.get(domElementsIds.modalOverlay)
        .click({ force: true })

      cy.get(domElementsIds.modal)
        .should('not.exist')
    })
  })

  describe('тест оформления заказа', () => { 
    beforeEach(() => {
      cy.intercept('GET', '**/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('POST', '**/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.window().then((w) => {
        w.localStorage.setItem('refreshToken', 'mockRefreshToken');
      });

      cy.setCookie('accessToken', 'mockAccessToken');
      cy.reload();
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.window().then((w) => {
        w.localStorage.removeItem('refreshToken');
      });
      cy.clearCookies();
    });

    it('тест создания заказа', () => { 
      cy.contains(textElements.bunName)
        .parents(domElementsIds.ingredientItem)
        .find('button')
        .click();

      cy.contains(textElements.mainIngredientName)
        .parents(domElementsIds.ingredientItem)
        .find('button')
        .click();

      cy.get(domElementsIds.orderButton).click();

      cy.wait('@createOrder');

      cy.get(domElementsIds.modal)
        .should('be.visible')
        .and('contain', '1')
      
      cy.get(domElementsIds.modalOverlay)
        .click({ force: true })

      cy.get(domElementsIds.modal)
        .should('not.exist')

      cy.get(domElementsIds.bunBottom).should('not.exist')
      cy.get(domElementsIds.bunTop).should('not.exist')
      cy.get(domElementsIds.constructorMainIngredient).should('contain', 'Выберите начинку')
    })
  })
})

