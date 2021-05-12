import {
  SystemAbilityAction,
  SystemAbilitySubject,
} from '../core/authorization'
import { rule } from 'graphql-shield'
import { ForbiddenError } from '@casl/ability'
import { Rule } from 'graphql-shield/dist/rules'
import { Context } from '../context'

export const can = (
  action: SystemAbilityAction,
  subject: Extract<SystemAbilitySubject, string>,
): Rule =>
  rule()(async (parent, args, { ability }: Context) => {
    ForbiddenError.from(ability).throwUnlessCan(action, subject)
    return true
  })
