// tslint:disable: no-any
import { Ability, InferSubjects, SubjectRawRule } from '@casl/ability'
import { User } from '@prisma/client'
import { Request } from 'express'
import jwksClient from 'jwks-rsa'
import { isEqual, uniqWith } from 'lodash'
import interpolate from '../helpers/interpolate'
import { getUserById, getUserRoles } from '../helpers/user'
import { createAbility } from './common/casl-helpers'
import { verifyJWT } from './common/jwt'

// Modify these as per your needs
type Action = 'manage' | 'create' | 'read' | 'update' | 'delete'
type Subject = 'Test' | 'all'

// Do not touch
export type SystemAbilityAction = Action
export type SystemAbilitySubject = InferSubjects<Subject, true> | 'all'
export type SystemAbility = Ability<[SystemAbilityAction, SystemAbilitySubject]>

export async function defineSystemAbilitiesFor(user: User | null) {
  const permissions = await getRulesForUser(user)
  return createAbility<SystemAbilityAction, SystemAbilitySubject>(permissions)
}

export const getRulesForUser = async (user: User | null) => {
  if (!user) {
    return [] as SubjectRawRule<Action, Subject, any>[]
  }
  const roles = await getUserRoles(user.id)
  const permissions = uniqWith(
    roles
      .filter((role) => role.permissions !== null)
      .map((role) => interpolate(role.permissions, { user }))
      .flat(),
    isEqual,
  ).map((rule) => rule as SubjectRawRule<Action, Subject, any>)
  return permissions
}
