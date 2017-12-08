// tried using the api proxy, gave up with the undocumented permissions settings
const api         = require('../../../../api')

// generic options method - some short circuits for post/posts because those have
// more options but most other options are common.
const getOptions = (data, fieldNodes, name) => {
    const include = []
    const fields = []
    const isPost = ['post', 'posts'].includes(name)
    let selectionSet
    const plural = name.endsWith('s')
    try {
        // we have to go two levels deep because we match the ghost api
        selectionSet = fieldNodes.find(s => s.kind === 'Field' && s.name.kind === 'Name' && s.name.value === name)
        if (plural) {
            selectionSet = selectionSet.selectionSet.selections.find(s => s.kind === 'Field' && s.name.kind === 'Name' && s.name.value === name)
        }
    } catch (e) {
        console.log("caught e", e)
    }
    if (selectionSet) {
        selectionSet.selectionSet.selections.filter(s => s.kind === 'Field').forEach(s => {
            switch(s.name.value) {
                case 'count':
                    if (!isPost) {
                        if (s.selectionSet.selections.some(s => s.name.kind === 'Name' && s.name.value === 'posts')) {
                            include.push("count.posts")
                        }
                        break
                    }
                case 'category':
                    if (isPost) {
                        include.push('category')
                        if (s.selectionSet.selections.some(s => s.name.kind === 'Name' && s.name.value === 'parent')) {
                            include.push("category.parent")
                        }
                        break
                    }
                case 'tags':
                    if (isPost) {
                        include.push('tags')
                        break
                    }
                case 'author':
                    if (isPost) {
                        include.push('author')
                        break
                    }
                default:
                    fields.push(s.name.value)
            }
        })
    }
    const options = Object.assign({}, data)
    if (include.length > 0) options.include = include.join(",")
    // TODO - if we do this our queries break but it would be nice to figure out
    // why
    // if (fields.length > 0) options.fields = fields.join(",")
    return options
}

module.exports = {
  Query: {
    post: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'post')
        return api.posts.read(options).then(result => result.posts && result.posts[0])
    },
    posts: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'posts')
        return api.posts.browse(options)
    },
    user: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'user')
        return api.users.read(options).then(result => result.users && result.users[0])
    },
    users: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'users')
        return api.users.browse(options)
    },
    category: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'category')
        return api.categories.read(options).then(result => result.categories && result.categories[0])
    },
    categories: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'categories')
        return api.categories.browse(options)
    },
    tag: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'tag')
        return api.tags.read(options).then(result => result.tags && result.tags[0])
    },
    tags: (root, data, context, { fieldNodes }) =>  {
        const options = getOptions(data, fieldNodes, 'tags')
        return api.tags.browse(options)
    },
    getCategoryGraph: (root, data, context, { fieldNotes }) => {
        return api.categories.browse({ limit: 'all'})
        .then(res => {
            const categories = res.categories.filter(c => c.parent === null)
                              .map(c => {
                                  c.subcategories = res.categories.filter(d => d.parent !== null && d.parent === c.id)
                                  if (c.subcategories.length === 0) c.subcategories = null
                                  return c
                              })
            return { categories }
        })
    }
  },
  Category: {
      // if our parent object has an id then it's an actual object so we return it,
      // otherwise return null
      parent: (root, data) =>  root.parent && root.parent.id ? root.parent : null
  },
  Tag: {

  },
  PostCount: {

  },
  Post: {
      // if our category object has an id then it's an actual object so we return it,
      // otherwise return null
      category: (root, data) => root.category && root.category.id ? root.category : null
  },
};
