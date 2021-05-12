import { objectType } from 'nexus'
export const Feedback = objectType({
  name: 'Feedback',
  definition(t) {
    t.model.id()
    t.model.feedback()
    t.model.isFixed()
    t.model.screenshot()
    t.model.solution()
    t.model.User()
    t.model.createdAt()
    t.model.updatedAt()
   },
})
