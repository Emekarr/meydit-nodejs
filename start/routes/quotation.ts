import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/quotation', 'QuotationsController.createQuotation').middleware('auth:maker')
