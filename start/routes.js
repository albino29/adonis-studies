const Route = use("Route");

Route.post("user", "UserController.store");
Route.get("user", "UserController.list");

Route.post("login", "SessionController.store");
Route.post("passwords", "ForgotPesswordController.store");
Route.put("passwords", "ForgotPesswordController.update");

Route.post("file", "FileController.store");
Route.get("file/:id", "FileController.show");
