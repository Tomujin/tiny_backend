import {objectType}from 'nexus'
export const LearningObject = objectType({
  name: 'LearningObject',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
