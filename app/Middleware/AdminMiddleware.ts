import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles';

export default class AdminMiddleware {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.use('web').authenticate();

    if(user.role_id != Roles.ADMIN) {
        // User is not admin
        console.log("User is not admin")
        return response.redirect().toPath('/')
    }

    await next()
  }
}
