const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers');
// Define your types here.
const typeDefs = `
 type Query {
    post(id: ID, slug: String, uuid: ID): Post
    user(id: ID, slug: String, uuid: ID): User
    tag(id: ID, slug: String, uuid: ID): Tag
    category(id: ID, slug: String, uuid: ID): Category
    posts(limit: String, page: Int, order: String, filter: String, blogPosts: Boolean): Posts
    users(limit: String, page: Int, order: String, filter: String): Users
    categories(limit: String, page: Int, order: String, filter: String): Categories
    tags(limit: String, page: Int, order: String, filter: String): Tags
  }

  type Post {
    id: ID!
    uuid: ID!
    title: String
    slug: String
    markdown: String
    html: String
    markdown_new: String
    html_new: String
    image: String
    featured: Boolean!
    page: Boolean!
    status: String!
    language: String!
    meta_title: String
    meta_description: String
    created_at: String
    created_by: User
    updated_at: String
    updated_by: User
    published_at: String
    published_by: User
    author: User
    author_id: ID
    url: String
    tags: [Tag!]
    category: Category
  }

  type PostCount {
      posts: Int
  }

  type Tag {
    id: ID!
    uuid: ID!
    name: String
    slug: String
    hidden: Boolean!
    image: String
    meta_title: String
    meta_description: String
    created_at: String
    created_by: User
    updated_at: String
    updated_by: User
    count: PostCount
  }

  type Category {
    id: ID!
    uuid: ID!
    name: String
    slug: String
    parent_id: ID
    parent: Category
    image: String
    meta_title: String
    meta_description: String
    created_at: String
    created_by: User
    updated_at: String
    updated_by: User
    count: PostCount
  }

  type User {
    accessibility: Boolean
    bio: String
    cover: String
    created_at: String
    created_by: User!
    id: ID!
    image: String
    language: String
    last_login: String
    location: String
    meta_description: String
    meta_title: String
    name: String
    slug: String
    status: String!
    tour: String
    updated_at: String
    updated_by: User
    uuid: ID!
    website: String
    count: PostCount
  }

  type Posts {
      posts: [Post!]!
      meta: Meta
  }

  type Users {
      users: [User!]!
      meta: Meta
  }

  type Tags {
      tags: [Tag!]!
      meta: Meta
  }

  type Categories {
      categories: [Category!]!
      meta: Meta
  }

  type Meta {
      pagination: Pagination
  }

  type Pagination {
      page: Int
      prev: Int
      next: Int
      pages: Int
      total: Int
      limit: Int
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers })
