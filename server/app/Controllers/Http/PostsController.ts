import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'

import { DateTime } from 'luxon'

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

  public async store({ request, response }: HttpContextContract) {
    const { user, post } = request.body()
    post.published_at = DateTime.fromISO(post.published_at)

    const dbUser = await User.firstOrCreate({ username: user.username }, user)
    const dbPost = await Post.create(post)

    const ids: number[] = []
    for (const tagName of post.tags) {
      const tag = await Tag.firstOrCreate({ name: tagName }, { name: tagName })
      ids.push(tag.id)
    }

    await dbPost.related('tags').attach(ids)
    await dbPost.related('author').associate(dbUser)

    response.status(201)
    return dbPost
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findByOrFail('username', params.author)
    // console.log({ user })
    // console.log({ user_id: user.id, slug: params.slug })
    const post = await Post.query()
      .where({
        user_id: user.id,
        slug: params.slug,
      })
      .preload('tags')
      .preload('author')
      .withCount('comments')
      .firstOrFail()

    // const post = await Post.query().where(
    //   'slug',
    //   '10-github-repositories-every-developer-should-know'
    // )

    return post.serialize({
      relations: {
        tags: {
          fields: {
            pick: ['name'],
          },
        },
      },
    })
  }
}
