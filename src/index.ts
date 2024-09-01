import path from 'node:path'

import Generator, { type BaseOptions } from 'yeoman-generator'

import { copy, copyTpl } from './libs/fs.js'
import { fetchDependencyVersions } from './libs/npm.js'
import { promptForName, promptForText } from './libs/prompt.js'

export default class StarlightPluginGenerator extends Generator<BaseOptions & Configuration> {
  configuration: Configuration

  constructor(...args: unknown[]) {
    super(...args)

    this.description = '// TODO(HiDeoo)'
    this.sourceRoot(path.join(this.sourceRoot(), '../../templates'))

    this.configuration = {
      year: new Date().getFullYear().toString(),
    }

    // TODO(HiDeoo) Move this to an optional install step.
    // TODO(HiDeoo) --skip-install
    // @ts-expect-error - Environment options are not typed.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.env.options.nodePackageManager = 'pnpm'

    this.option('name', { type: String, description: 'Name of the Starlight plugin' })
    this.option('description', { type: String, description: 'Description of the Starlight plugin' })
    this.option('ghUsername', { type: String, description: 'GitHub username' })
  }

  async prompting() {
    await promptForName(this)
    await promptForText(
      this,
      'description',
      'What is the description of your Starlight plugin?',
      'My awesome Starlight plugin',
    )
    await promptForText(this, 'ghUsername', 'What is your GitHub username?', 'ghost')
  }

  async configuring() {
    // TODO(HiDeoo) message
    this.log.info('Fetching latest versions of dependencies…')
    await fetchDependencyVersions()
  }

  writing() {
    copy(this, '.vscode')
    // TODO(HiDeoo) .vscode/launch.json
    // TODO(HiDeoo) gitignore
    copyTpl(this, 'LICENSE')
    // TODO(HiDeoo) README
    copyTpl(this, 'package.json')
    copy(this, 'pnpm-workspace.yaml')

    copyTpl(this, 'docs')
    // TODO(HiDeoo) docs/public
    // TODO(HiDeoo) docs/README

    const pluginPath = `packages/${this.configuration.name}`

    copyTpl(this, 'packages/plugin', pluginPath)
    copy(this, 'packages/plugin/.npmignore', `${pluginPath}/.npmignore`)
    // TODO(HiDeoo) plugin/gitignore?
    // TODO(HiDeoo) plugin/README
    // TODO(HiDeoo) plugin/index.ts
  }
}

export interface Configuration {
  name?: string
  description?: string
  ghUsername?: string
  year: string
}
