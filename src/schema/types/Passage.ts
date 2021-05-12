import {objectType}from 'nexus'
export const Passage = objectType({
  name: 'Passage',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.text()    
    t.model.mediaType()
    t.model.sourcePath()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.Posts()
  },
})
