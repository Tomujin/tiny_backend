import {objectType}from 'nexus'
export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.model.id()
    t.model.orderNum()
    t.model.contentType()
    t.model.mediaType()
    t.model.Post()
    t.model.contentText()
    t.model.sourcePath()
    t.model.voiceOverPath()
    t.model.contentSize()
    t.model.answerType()
    t.model.Answers()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
