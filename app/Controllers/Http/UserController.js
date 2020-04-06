const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);
    return user;
  }

  async list({ response }) {
    const data = await User.find();

    return data;
  }
}

module.exports = UserController;
