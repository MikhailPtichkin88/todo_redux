import * as commonCommands from './commands/common'
import * as authCommands from './commands/auth'

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(authCommands)

export {}
