

describe('Buscar vehículos', function () {

    beforeEach(function () {
        cy.wait(1000)
        cy.visit('https://www.bnventadebienes.com/vehicles/search');
    });

    /*
    Nombre: QA01
    Objetivo: Probar que no se acepta texto en el capo para ingresar el año
    Datos: Año: 'aaaa'
           Tipo de venta: N/A
           Estado del vehículo: N/A
           Precio desde: N/A
           Precio hasta: N/A
    Resultado: Que se muestre el span con el mensaje de error 'El campo Año debe ser un número.'
    */
    it('Verificar exepciones en campo de año', () => {
        cy.get('input[id=VehicleYear]').type('aaaa')
        cy.get('button.btn.btn-primary-action').click().then(function () {
            cy.get('span[id=VehicleYear-error]').should('contain.text', 'El campo Año debe ser un número.')
        });
    })

    /*
    Nombre: QA02
    Objetivo: Todos los valores ingresados correctamente
    Datos: Año: 2020
           Tipo de venta: Venta Directa
           Estado del vehículo: Disponible
           Precios desde: 1000000
           Precios hasta: 5000000
    Resultado: Que se realice la busqueda correctamente de vehiculo
    */
    it('Verificar busqueda con todos los valores validos', () => {
        cy.get('[id=VehicleYear]').type('2020')
        cy.get('[id=VehicleStatusId]').select('1')
        cy.get('[id=VehicleSaleTypeId]').select('2')
        cy.get('[id=MinPrice]').type('1000000')
        cy.get('[id=MaxPrice]').type('5000000')
        cy.get('button.btn.btn-primary-action').click()
        cy.get('h2.brand-main-color3.main-title').should('exist');
    })

    /*
    Nombre: QA03
    Objetivo: Probar la funcionalidad de buscar vehículos con Tipo de venta "Subasta"
    Datos: Año: N/A
           Tipo de venta: Subasta
           Estado del vehículo: N/A
           Precios desde: N/A
           Precios hasta: N/A
    Resultado esperado: Que se realice la busqueda correctamente
    */
    it('Verificar busqueda con Tipo de venta: "Subasta"', () => {
        cy.get('[id=VehicleSaleTypeId]').select('1')
        cy.get('button.btn.btn-primary-action').click()
        cy.get('h2.brand-main-color3.main-title').should('exist');
    })

    /*
    Nombre: QA04
    Objetivo: Probar la funcionalidad de buscar vehículos con Estado del vehículo "Con ofertas en estudio"
    Datos: Año: N/A
           Tipo de venta: N/A
           Estado del vehículo: Con ofertas en estudio
           Precios desde: N/A
           Precios hasta: N/A
    Resultado: Que se realice la busqueda correctamente
    */
    it('Verificar busqueda con Estado del vehículo: "Con ofertas en estudio"', () => {
        cy.get('[id=VehicleStatusId]').select('2')
        cy.get('button.btn.btn-primary-action').click()
        cy.get('h2.brand-main-color3.main-title').should('exist');
    })
});