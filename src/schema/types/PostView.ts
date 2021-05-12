import {objectType}from 'nexus'
export const PostView = objectType({
  name: 'PostView',
  definition(t) {
    t.model.id()
    t.model.Post()
    t.model.postType()
    t.model.User()
    t.model.visiblePercent()
    t.model.watchIndex()
    t.model.watchDate()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
