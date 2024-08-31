import path from 'node:path'

import Generator from 'yeoman-generator'

import { copyTpl } from './libs/fs.js'
import { getNamePrompt } from './libs/prompt.js'

export default class StarlightPluginGenerator extends Generator {
  answers?: PromptAnswers

  constructor(...args: unknown[]) {
    super(...args)

    this.description = '// TODO(HiDeoo)'
    this.sourceRoot(path.join(this.sourceRoot(), '../../templates'))
    // @ts-expect-error - Options are not typed.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.env.options.nodePackageManager = 'pnpm'
  }

  async prompting() {
    this.answers = await this.prompt<PromptAnswers>([getNamePrompt()])
  }

  writing() {
    copyTpl(this, 'package.json')

    copyTpl(this, 'packages/plugin', `packages/${this.answers?.name}`)
  }
}

interface PromptAnswers {
  name: string
}
