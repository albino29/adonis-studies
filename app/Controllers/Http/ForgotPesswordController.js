'use strict'
const User = use('App/Models/User')
const crypto = require('crypto')

class ForgotPesswordController {
  async store({ request, response }) {
    const email = request.input('email');
    try {
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'Email não existe' } })
    }

  }
}

module.exports = ForgotPesswordController
