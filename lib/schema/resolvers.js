module.exports = {
  Query: {
    allPosts: (root, data, {api}) => api.posts.browse().then(res => res.posts),
    allUsers: (root, data, {api}) => api.users.browse().then(res => res.users),
    allTags: (root, data, {api}) => api.tags.browse().then(res => res.tags),
    allCategories: (root, data, {api}) => api.categories.browse().then(res => res.categories),
  },
};
