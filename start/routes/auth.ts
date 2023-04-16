import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/user', 'AuthController.createUser')
