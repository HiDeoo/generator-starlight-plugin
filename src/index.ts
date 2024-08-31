import path from 'node:path'

import Generator from 'yeoman-generator'

import { getNamePrompt } from './libs/prompt.js'
import { copyTpl } from './libs/writer.js'

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
  }
}

interface PromptAnswers {
  name: string
}
