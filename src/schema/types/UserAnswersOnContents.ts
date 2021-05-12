import {objectType} from 'nexus'
export const userAnswersOnContents = objectType({
  name: 'UserAnswersOnContents',
  definition(t) {
    t.model.id()
    t.model.Content()
    t.model.Answer()
    t.model.answerText()
    t.model.User()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
