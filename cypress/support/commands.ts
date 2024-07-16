import * as commonCommands from './commands/common'
import * as authCommands from './commands/auth'
import * as profileCommands from './commands/profile'
import * as mainCommands from './commands/main'

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(authCommands)
Cypress.Commands.addAll(profileCommands)
Cypress.Commands.addAll(mainCommands)

export {}
