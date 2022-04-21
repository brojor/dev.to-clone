import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public twitter_username: string | null

  @column()
  public github_username: string | null

  @column()
  public summary: string

  @column()
  public location: string

  @column()
  public website_url: string

  @column()
  public profile_image: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true, serializeAs: 'joined_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
