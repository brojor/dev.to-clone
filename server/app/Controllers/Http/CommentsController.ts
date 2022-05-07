import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {
    // const { user, body, createdAt, title } = request.body()
    // const post = await Post.findByOrFail('title', title)
    // const dbUser = await User.firstOrCreate({ username: user.username }, user)
    // const comment = await Comment.create({ body, createdAt: DateTime.fromISO(createdAt) })
    // ###############################
    // const { bodyMarkdown, commentableId, CommentableType, parentId = null } = request.body()
    // const dbUser = await User.firstOrFail()
    // await comment.related('post').associate(post)
    // await comment.related('author').associate(dbUser)
    // response.status(201)
    // return post
    const { bodyMarkdown } = request.body()
    const dirtyHtml = marked.parse(bodyMarkdown)
    const cleanHtml = sanitizeHtml(dirtyHtml)

    const post = await Post.firstOrFail()
    const dbUser = await User.firstOrFail()
    const comment = await Comment.create({ body: cleanHtml })
    await comment.related('post').associate(post)
    await comment.related('author').associate(dbUser)

    return {
      ...comment.serialize(),
      author: dbUser.serialize(),
    }
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.qs()
    const comments = await Comment.query()
      .where('post_id', id)
      .preload('author')
      .orderBy('created_at', 'desc')

    return comments
  }
}
