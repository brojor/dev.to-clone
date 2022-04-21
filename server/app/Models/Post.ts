import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Tag from './Tag'
import User from './User'

export default class Post extends BaseModel {
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

  @column.dateTime()
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
