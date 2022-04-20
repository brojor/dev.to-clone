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

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public image: string

  @column()
  public author: string

  @column()
  public body: string

  // @belongsTo(() => Tag, {
  //   localKey: 'id',
  // })
  // public tag: BelongsTo<typeof Tag>

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
