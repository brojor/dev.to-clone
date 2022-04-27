import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Tag from './Tag'
import User from './User'
import Comment from './Comment'
import Reaction from './Reaction'

export default class Post extends BaseModel {
  /**
   * Serialize the `$extras` object as it is
   */
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public image: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @column()
  public body: string

  @manyToMany(() => Tag, {
    pivotTable: 'post_tags', // nemusel bych zadávat, pokud by se moje pivotTable jmenovala post_tag [singular_singular]
    pivotColumns: ['tag_id'],
  })
  public tags: ManyToMany<typeof Tag>

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Reaction)
  public reactions: HasMany<typeof Reaction>

  @column.dateTime()
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
