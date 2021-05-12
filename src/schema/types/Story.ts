import { objectType } from 'nexus'

export const Story = objectType({
  name: 'Story',
  definition(t) {
    t.model.id()
    t.model.publishedDate()
    t.model.User()
    t.model.StoryContent()

  },
})