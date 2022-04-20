import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Tags from 'Database/migrations/1650179644652_tags'

export default class PostsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const post = await Post.create(body)

    response.status(201)
    return post
  }

  public async show({ response }: HttpContextContract) {
    // const posts = await Post.all()
    const posts = await Post.query().preload('tags')
    return posts.map((post) =>
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
  }
}
