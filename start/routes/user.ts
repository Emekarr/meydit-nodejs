import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/v1/user/profile', 'UsersController.fetchProfile').middleware('auth')
