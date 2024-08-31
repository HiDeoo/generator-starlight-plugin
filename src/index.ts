import path from 'node:path'

import Generator, { type BaseOptions } from 'yeoman-generator'

import { copyTpl } from './libs/fs.js'
import { promptForName, promptForText } from './libs/prompt.js'

export default class StarlightPluginGenerator extends Generator<BaseOptions & Configuration> {
  configuration: Configuration

  constructor(...args: unknown[]) {
    super(...args)

    this.configuration = {}
    this.description = '// TODO(HiDeoo)'
    this.sourceRoot(path.join(this.sourceRoot(), '../../templates'))

    // TODO(HiDeoo) Move this to an optional install step.
    // TODO(HiDeoo) --skip-install
    // @ts-expect-error - Environment options are not typed.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.env.options.nodePackageManager = 'pnpm'

    this.option('name', { type: String, description: 'Name of the Starlight plugin' })
    this.option('description', { type: String, description: 'Description of the Starlight plugin' })
  }

  async prompting() {
    await promptForName(this)
    await promptForText(this, 'description', 'What is the description of your Starlight plugin?')
  }

  writing() {
    copyTpl(this, 'package.json')

    copyTpl(this, 'packages/plugin', `packages/${this.configuration.name}`)
  }
}

export interface Configuration {
  name?: string
  description?: string
}
