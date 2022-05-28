import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'

import { DateTime } from 'luxon'
import CommentService from '../Services/CommentService'
import CommentsController from './CommentsController'

export default class PostsController {
  public async index() {
    const posts = await Post.query().preload('tags').preload('author').withCount('comments')

    return posts
      .map((post) =>
        post.serialize({
          relations: {
            tags: {
              fields: {
                pick: ['name'],
              },
            },
          },
        })
      )
      .map(({ tags, ...rest }) => ({
        ...rest,
        tags: tags.reduce((acc, { name }) => [...acc, name], []),
      }))
  }

  public async store({ request }: HttpContextContract) {
    const user = await User.firstOrFail() // TODO: get user from auth
    const { title, bodyMarkdown, tags, coverImageUrl } = request.body()

    const post = await Post.create({
      title,
      body: bodyMarkdown,
      userId: user.id,
      publishedAt: DateTime.local(),
      image: coverImageUrl,
    })

    const tagsId: number[] = []
    for (const tag of tags) {
      const dbTag = await Tag.firstOrCreate({ name: tag.name }, { name: tag.name })
      tagsId.push(dbTag.id)
    }

    await post.related('tags').attach(tagsId)
    await post.related('author').associate(user)

    return post
  }
  // public async store({ request, response }: HttpContextContract) {
  //   const { user, post } = request.body()
  //   post.published_at = DateTime.fromISO(post.published_at)

  //   const dbUser = await User.firstOrCreate({ username: user.username }, user)
  //   const dbPost = await Post.create(post)

  //   const ids: number[] = []
  //   for (const tagName of post.tags) {
  //     const tag = await Tag.firstOrCreate({ name: tagName }, { name: tagName })
  //     ids.push(tag.id)
  //   }

  //   await dbPost.related('tags').attach(ids)
  //   await dbPost.related('author').associate(dbUser)

  //   response.status(201)
  //   return dbPost
  // }

  public async show({ params }: HttpContextContract) {
    const user = await User.findByOrFail('username', params.author)
    const post = await Post.query()
      .where({
        user_id: user.id,
        slug: params.slug,
      })
      .preload('tags')
      .preload('author')
      .withCount('comments')
      .firstOrFail()

    const comments = await CommentService.getCommentsForPost(post)

    return {
      post,
      comments,
    }
  }
}
