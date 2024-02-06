describe('L\'adresse localhost est  visible', () => {
  it('la page principal s\'affiche', () => {
    cy.visit('localhost:3000')
  })

  it('le lien vers la section nos services est visible', () => {
    cy.visit('localhost:3000')
    cy.get('a[href="#nos-services"]').should('be.visible')
    cy.get('a[href="#nos-services"]').click()
      // Vérifiez que la fenêtre est sur la section avec l'ID correspondant
    cy.location('hash').should('eq', '#nos-services'); 
  })


  it('vérifie chaque lien du menu de navigation', () => {
    cy.visit('http://localhost:3000');
    
    // Ciblez tous les liens à l'intérieur de la balise nav
    cy.get('nav a').each(($link) => {
      const hrefValue = $link.attr('href');

      // Vérifiez que le lien est visible
      cy.wrap($link).should('be.visible');

      // Cliquez sur le lien
      cy.wrap($link).click();

      // Vérifiez que la fenêtre est sur la section avec l'ID correspondant
      cy.location('hash').should('eq', hrefValue);

      // Revenez à la page d'origine pour le prochain lien
      cy.go('back');
    });
  });
})