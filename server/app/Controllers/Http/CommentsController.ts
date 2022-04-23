import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {
    const { user, body, createdAt } = request.body()
    const postId = 1
    const post = await Post.findOrFail(postId)

    const dbUser = await User.firstOrCreate({ username: user.username }, user)
    const comment = await Comment.create({ body, createdAt })

    await comment.related('post').associate(post)
    await comment.related('author').associate(dbUser)

    response.status(201)
    return comment
  }
}
