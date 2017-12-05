module.exports = function (api) {
  return {
      Query: {
        allPosts: () => api.posts.browse().then(res => res.posts),
        allUsers: () => api.users.browse().then(res => res.users),
        allTags: () => api.tags.browse().then(res => res.tags),
        allCategories: () => api.categories.browse().then(res => res.categories),
      },
  }
};
