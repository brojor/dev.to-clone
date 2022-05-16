import { HasManyQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

const recursiveCallback = (builder: HasManyQueryBuilderContract<typeof Comment, any>) => {
  builder.preload('author')
  builder.preload('responses', recursiveCallback)
  builder.preload('reactions')
}

export default class CommentService {
  public static async getCommentsForPost(post: Post): Promise<Comment[]> {
    const comments = await post
      .related('comments')
      .query()
      .whereNull('replyTo')
      .preload('author')
      .preload('responses', recursiveCallback)
      .preload('reactions')
      .orderBy('created_at', 'asc')

    return comments
  }
}
