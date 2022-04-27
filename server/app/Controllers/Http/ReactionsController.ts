import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Reaction from 'App/Models/Reaction'
import User from 'App/Models/User'

export default class ReactionsController {
  public async store({ request }: HttpContextContract) {
    const { postId, category, userId } = request.body()
    const post = await Post.findOrFail(postId)
    const user = await User.findOrFail(userId)
    const reaction = await Reaction.create({ category })
    await reaction.related('post').associate(post)
    await reaction.related('user').associate(user)

    return { category, result: 'created' }
  }

  public async destroy({ request }: HttpContextContract) {
    const { postId, category, userId } = request.body()
    const reaction = await Reaction.query()
      .where('post_id', postId)
      .where('user_id', userId)
      .where('category', category)
      .firstOrFail()
    await reaction.delete()

    return { category, result: 'deleted' }
  }
}
