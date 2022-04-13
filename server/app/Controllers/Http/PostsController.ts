import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const post = await Post.create(body)

    response.status(201)
    return post
  }

  public async show({ response }: HttpContextContract) {
    const posts = await Post.all()

    response.status(200)
    return posts
  }
}
