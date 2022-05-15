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

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.qs()
    const comment = await Comment.findByOrFail('id', id)

    if (await hasChildren(comment)) {
      comment.merge({
        body: '<p>[Comment deleted]</p>',
        isArchived: true,
      })
      await comment.save()
    } else {
      await comment.delete()
    }

    await deleteParentIfisArchivedAndEmpty(comment)

    return response.status(200)
  }
}

async function hasChildren(comment: Comment) {
  const children = await Comment.query().where('replyTo', comment.id)
  return children.length > 0
}

// async function deleteParentIfisArchivedAndEmpty(comment: Comment) {
//   if (hasParent(comment)) {
//     const parentComment = await Comment.findBy('id', comment.replyTo)
//     if (parentComment?.isArchived) {
//       const siblings = await Comment.query().where('replyTo', parentComment.id)
//       if (siblings.length === 0) {
//         await parentComment.delete()
//         await deleteParentIfisArchivedAndEmpty(parentComment)
//       }
//     }
//   }
// }

async function deleteParentIfisArchivedAndEmpty(comment: Comment) {
  if (comment.replyTo === null) return

  const parentComment = await Comment.findByOrFail('id', comment.replyTo)
  if (!parentComment.isArchived) return

  const siblings = await Comment.query().where('replyTo', parentComment.id)
  if (siblings.length > 0) return

  await parentComment.delete()
  await deleteParentIfisArchivedAndEmpty(parentComment)
}
