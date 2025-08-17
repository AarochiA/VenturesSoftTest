describe('mi primer test', () =>{
  beforeEach(()=>{
    cy.visit("/");
  })

  it('validar existe titulo Angular', () =>{
    cy.contains('Angular');
  })
});
