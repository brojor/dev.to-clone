/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async () => {
//   return { hello: 'world' }
// })
Route.get('/', 'PostsController.index')

Route.get('/:author/:slug', 'PostsController.show')

// Route.post('/new', 'PostsController.store')

Route.post('/comments', 'CommentsController.store')
Route.get('/comments', 'CommentsController.show')
Route.delete('/comments', 'CommentsController.destroy')

Route.post('/reactions', 'ReactionsController.store')
Route.delete('/reactions', 'ReactionsController.destroy')
Route.get('/reactions', 'ReactionsController.index')

Route.get(':author', 'UsersController.show')

Route.post('/articles', 'PostsController.store')
