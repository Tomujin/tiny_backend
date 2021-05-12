import { objectType } from 'nexus'
export const PostComments = objectType({
  name: 'PostComments',
  definition(t) {
    t.model.id()
    t.model.Post()
    t.model.User()
    t.model.postId()
    t.model.comment()
    t.model.ParentComment()
    t.model.ChildComments()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
