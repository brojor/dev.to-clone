import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Reaction from './Reaction'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public body: string

  @column()
  public postId: number

  @column({ serializeAs: null })
  public userId: number

  @column()
  public replyTo: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? formatDate(value) : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public rootParentId: number

  @column()
  public levelIndex: number

  @column()
  public isArchived: boolean

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @hasMany(() => Comment, { foreignKey: 'replyTo', localKey: 'id' })
  public responses: HasMany<typeof Comment>

  @belongsTo(() => Comment, { foreignKey: 'replyTo', localKey: 'id' })
  public parent: BelongsTo<typeof Comment>

  @hasMany(() => Reaction)
  public reactions: HasMany<typeof Reaction>
}

function formatDate(date: DateTime | null) {
  const res = date?.setLocale('en').toLocaleString(DateTime.DATE_MED)
  if (date?.year !== DateTime.now().year) {
    return res
  }
  return res?.split(',')[0]
}
