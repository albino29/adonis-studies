const Route = use('Route');

Route.post('user', 'UserController.store').validator('StoreUser');
Route.get('user', 'UserController.list');

Route.post('login', 'SessionController.store').validator('Session');
Route.post('passwords', 'ForgotPesswordController.store');
Route.put('passwords', 'ForgotPesswordController.update');

Route.get('file/:id', 'FileController.show');

Route.group(() => {
  Route.post('file', 'FileController.store');
  Route.resource('project', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['project.store'], ['Project']]]));
  Route.resource('project.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['project.tasks.store'], ['Task']]]));
}).middleware(['auth']);
