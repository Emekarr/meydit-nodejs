import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/auth/user', 'AuthController.createUser')

Route.post('/api/v1/auth/maker', 'AuthController.createMaker')

Route.post('/api/v1/user/login', 'AuthController.loginUser')
