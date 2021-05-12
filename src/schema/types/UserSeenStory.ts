import { objectType } from 'nexus'
export const UserSeenStory = objectType({
  name: 'UserSeenStory',
  definition(t) {
    t.model.id()
    t.model.User()
    t.model.Story()
    t.model.StoryContent()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
