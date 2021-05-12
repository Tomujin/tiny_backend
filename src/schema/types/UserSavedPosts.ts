import { objectType } from 'nexus'
export const UserSavedPosts = objectType({
  name: 'UserSavedPosts',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.Post()
    t.model.isPublic()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
