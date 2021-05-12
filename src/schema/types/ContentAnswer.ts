import {objectType}from 'nexus'
export const ContentAnswer = objectType({
  name: 'ContentAnswer',
  definition(t) {
    t.model.id()
    t.model.mediaType()
    t.model.answer()
    t.model.sourcePath()
    t.model.Point()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
