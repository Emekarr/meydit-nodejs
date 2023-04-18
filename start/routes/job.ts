import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/v1/job', 'JobsController.createJob').middleware('auth')

Route.get('/api/v1/job', 'JobsController.fetchJobs').middleware('auth:maker,user')
