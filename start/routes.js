const Route = use('Route');

Route.post('user', 'UserController.store');
Route.get('user', 'UserController.list');

Route.post('login', 'SessionController.store');
Route.post('passwords', 'ForgotPesswordController.store');
Route.put('passwords', 'ForgotPesswordController.update');

Route.get('file/:id', 'FileController.show');

Route.group(() => {
  Route.post('file', 'FileController.store');
  Route.resource('project', 'ProjectController').apiOnly();
  Route.resource('project.tasks', 'TaskController').apiOnly();
}).middleware(['auth']);
