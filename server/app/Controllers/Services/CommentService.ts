import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class CommentService {
  public static async getCommentsForPost(post: Post): Promise<Comment[]> {
    const comments = await post
      .related('comments')
      .query()
      .preload('author')
      .orderBy('created_at', 'asc')

    const rootComments = comments.filter((comment) => comment.replyTo === null)

    const commentsTree = rootComments.map((rootComment) => ({
      ...rootComment.serialize(),
      children: findChildren(comments, rootComment.id),
      level: 0,
    }))
    return commentsTree
  }
}

function findChildren(comments: Comment[], parentId: number) {
  const children = comments.filter((comment) => comment.replyTo === parentId)
  if (children.length === 0) {
    return []
  }
  return children.map((child) => ({
    ...child.serialize(),
    children: findChildren(comments, child.id),
    level: child.levelIndex,
  }))
}
