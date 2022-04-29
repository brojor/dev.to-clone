import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class CommentsController {
  public async show({ params }: HttpContextContract) {
    const user = await User.findByOrFail('username', params.author)
    return user
  }
}
