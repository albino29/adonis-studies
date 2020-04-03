const User = use("App/Models/User");
const moment = require("moment");
const crypto = require("crypto");

const Mail = use("Mail");

class ForgotPesswordController {
  async store({ request, response }) {
    const email = request.input("email");
    try {
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();
      await Mail.send(
        ["emails.forgot_password"],
        { email, token: user.token },
        (message) => {
          message
            .to(user.email)
            .from("Adonis@Team")
            .subject("Password recovery");
        }
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Email não existe" } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired)
        return response
          .status(401)
          .send({ error: { message: "Token expirou" } });

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (error) {
      return response.status(error.status).send({
        error: { message: "Algo deu errado", message: error.message },
      });
    }
  }
}

module.exports = ForgotPesswordController;
