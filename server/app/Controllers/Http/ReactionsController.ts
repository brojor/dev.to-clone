import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import Reaction from 'App/Models/Reaction'
import User from 'App/Models/User'

export default class ReactionsController {
  public async store({ request, response }: HttpContextContract) {
    const userId = 1 // todo replace with logged in user
    const { reactableType, reactableId, category = 'like' } = request.body()

    const user = await User.findOrFail(userId)

    switch (reactableType) {
      case 'post':
        const post = await Post.findOrFail(reactableId)
        const postReaction = await Reaction.create({ category })
        await postReaction.related('post').associate(post)
        await postReaction.related('user').associate(user)
        response.status(201)
        return { category, result: 'created', reaction: postReaction }

      case 'comment':
        const comment = await Comment.findOrFail(reactableId)
        const commentReaction = await Reaction.create({ category })
        await commentReaction.related('comment').associate(comment)
        await commentReaction.related('user').associate(user)
        response.status(201)
        return { category, result: 'created', reaction: commentReaction }
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = 1 // todo replace with logged in user
    const { reactableType, reactableId, category = 'like' } = request.body()

    switch (reactableType) {
      case 'post':
        const postReaction = await Reaction.query()
          .where('post_id', reactableId)
          .where('user_id', userId)
          .where('category', category)
          .firstOrFail()
        await postReaction.delete()
        return { category, result: 'deleted' }

      case 'comment':
        const commentReaction = await Reaction.query()
          .where('comment_id', reactableId)
          .where('user_id', userId)
          .where('category', category)
          .firstOrFail()
        await commentReaction.delete()
        return { category, result: 'deleted' }
    }
  }

  public async index({ request }: HttpContextContract) {
    const userId = 1 // todo replace with logged in user
    const { article_id: articleId } = request.qs()
    const reactions = await Reaction.query().where('post_id', articleId).where('user_id', userId)

    const post = await Post.query()
      .where('id', articleId)
      .withCount('reactions', (builder) => {
        builder.where('category', 'like').as('like')
      })
      .withCount('reactions', (builder) => {
        builder.where('category', 'unicorn').as('unicorn')
      })
      .withCount('reactions', (builder) => {
        builder.where('category', 'readinglist').as('readinglist')
      })

      .firstOrFail()

    const articleReactionCounts = Object.entries(post.$extras).reduce((acc, [key, value]) => {
      acc.push({ category: key, count: value })
      return acc
    }, [] as { category: string; count: number }[])

    return {
      articleReactionCounts,
      reactions: reactions.map((reaction) => reaction.serialize()),
    }
  }
}
