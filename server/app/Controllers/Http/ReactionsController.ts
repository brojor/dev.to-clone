import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Reaction from 'App/Models/Reaction'
import User from 'App/Models/User'

export default class ReactionsController {
  public async store({ request }: HttpContextContract) {
    const userId = 1 // todo replace with logged in user
    const { postId, category } = request.body()
    console.log({ postId, category })
    const post = await Post.findOrFail(postId)
    const user = await User.findOrFail(userId)
    const reaction = await Reaction.create({ category })
    await reaction.related('post').associate(post)
    await reaction.related('user').associate(user)

    return { category, result: 'created', reaction }
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = 1 // todo replace with logged in user
    const { postId, category } = request.body()
    const reaction = await Reaction.query()
      .where('post_id', postId)
      .where('user_id', userId)
      .where('category', category)
      .firstOrFail()
    await reaction.delete()

    return { category, result: 'deleted' }
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
