import { objectType } from 'nexus'

export const StoryContent = objectType({
  name: 'StoryContent',
  definition(t) {
    t.model.id()
    t.model.Story()
    t.model.contentSize()
    t.model.mediaType()
    t.model.duration()
    t.model.contentText()
    t.model.sourcePath()

  },
})
