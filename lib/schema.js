const {makeExecutableSchema} = require('graphql-tools')

// Define your types here.
const typeDefs = `
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
    url: String
    tags: [Tag!]!
  }

  type Query {
    allPosts: [Post!]!
    allTags: [Tag!]!
    allUsers: [User!]!
  }

  type Tag {
    id: ID!
    uuid: ID!
    name: String
    slug: String
    hidden: Boolean!
    parent: String
    image: String
    meta_title: String
    meta_description: String
    created_at: String
    created_by: User
    updated_at: String
    updated_by: User
    posts: [Post!]!
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
    posts: [Post!]!
  }

`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs})
