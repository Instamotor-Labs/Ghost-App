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
    getCategoryGraph: Categories
  }

  type Post {
    author_id: ID
    author: User
    category: Category
    created_at: String
    created_by: User
    featured: Boolean!
    html_new: String
    html: String
    id: ID!
    image: String
    language: String!
    markdown_new: String
    markdown: String
    meta_description: String
    meta_title: String
    page: Boolean!
    published_at: String
    published_by: User
    slug: String
    status: String!
    tags: [Tag!]
    title: String
    updated_at: String
    updated_by: User
    url: String
    uuid: ID!
  }

  type PostCount {
      posts: Int
  }

  type Tag {
    count: PostCount
    created_at: String
    created_by: User
    description: String
    hidden: Boolean!
    id: ID!
    image: String
    meta_description: String
    meta_title: String
    name: String
    slug: String
    updated_at: String
    updated_by: User
    uuid: ID!
  }

  type Category {
    count: PostCount
    created_at: String
    created_by: User
    description: String
    id: ID!
    image: String
    meta_description: String
    meta_title: String
    name: String
    parent_id: ID
    parent: Category
    slug: String
    subcategories: [Subcategory!]
    updated_at: String
    updated_by: User
    uuid: ID!
  }

  type Subcategory {
    count: PostCount
    created_at: String
    created_by: User
    description: String
    id: ID!
    image: String
    meta_description: String
    meta_title: String
    name: String
    parent_id: ID
    parent: Category
    slug: String
    updated_at: String
    updated_by: User
    uuid: ID!
  }


  type User {
    accessibility: Boolean
    bio: String
    count: PostCount
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
  }

  type Posts {
      meta: Meta
      posts: [Post!]!
  }

  type Users {
      meta: Meta
      users: [User!]!
  }

  type Tags {
      meta: Meta
      tags: [Tag!]!
  }

  type Categories {
      categories: [Category!]!
      meta: Meta
  }

  type Meta {
      pagination: Pagination
  }

  type Pagination {
      limit: String
      next: Int
      page: Int
      pages: Int
      prev: Int
      total: Int
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers })
