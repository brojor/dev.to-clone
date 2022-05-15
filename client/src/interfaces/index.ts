export interface Comment {
  id: number;
  body: string;
  post_id: number;
  created_at: string;
  updated_at: string;
  reply_to?: number;
  root_parent_id?: number;
  level_index: number;
  author: Author;
  responses: Comment[];
}

export interface Author {
  id: number;
  name: string;
  username: string;
  twitter_username: string;
  github_username: string;
  summary: string;
  location: string;
  website_url: string;
  profile_image: string;
  joined_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  image: string;
  user_id: number;
  body: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags?: TagsEntity[] | null;
  author: Author;
  meta: Meta;
}

export interface TagsEntity {
  name: string;
}

export interface Meta {
  comments_count: number;
}