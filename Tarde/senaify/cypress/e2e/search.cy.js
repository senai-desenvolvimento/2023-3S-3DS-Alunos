describe('template spec', () => {
  let musicaItem;

  before(() => {
    cy.visit('/')
  });

  it('Redirecionar para a tela de busca', () => {
    cy.get("[href='/Search']").click();
    cy.scrollTo("top");
  });

  it("Procurando uma musica especifica", () => {
    cy.get("[data-testid='campoBusca']").type("Trem Bala");

    cy.get("[aria-label='music-item']").should("have.length.greaterThan", 0)
  });

  it("Clicar na música desejada", () => {
    // cy.get("[aria-label='music-item']").filter(":contains('Ana Vilela')").click()
    // cy.get("[aria-label='music-item']").contains(/^(Ana Vilela)/i).click()
    // cy.get("[aria-label='music-item']").contains("Ana Vilela").click()
    
    cy.wait(1500)
    musicaItem = cy.get("[aria-label='music-item']").first()
    musicaItem.click()
  })

  it("Clicar na curtir da música", () => {
    // if( musicaItem ){
    //   cy.get(musicaItem).then( (item) => {
    //     item.find("[data-testid='icon-button']").click()
    //   })
    // }

    cy.get(musicaItem).get("[data-testid='icon-button']").first().click()
  })
})