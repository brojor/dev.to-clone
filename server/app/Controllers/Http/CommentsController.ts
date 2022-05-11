import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import CommentService from '../Services/CommentService'

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {
    const { postId, bodyMarkdown: body, replyTo } = request.body()

    const levelIndex = replyTo ? (await Comment.findByOrFail('id', replyTo)).levelIndex + 1 : 0

    await Comment.create({ postId, body, userId: 1, replyTo, levelIndex })

    return response.status(201)
  }

  public async show({ request }: HttpContextContract) {
    const { postId } = request.qs()
    const post = await Post.findByOrFail('id', postId)

    const comments = await CommentService.getCommentsForPost(post)

    return comments
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.qs()
    const comment = await Comment.findByOrFail('id', id)
    await comment.delete()
    return comment
  }
}
