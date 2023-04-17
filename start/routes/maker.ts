import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/v1/maker/profile', 'MakersController.fetchProfile').middleware('auth')
