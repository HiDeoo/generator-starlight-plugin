import path from 'node:path'

import Generator, { type BaseOptions } from 'yeoman-generator'

import { copy, copyTpl } from './libs/fs.js'
import { fetchDependencyVersions } from './libs/npm.js'
import { promptForName, promptForText } from './libs/prompt.js'

export default class StarlightPluginGenerator extends Generator<BaseOptions & Configuration> {
  configuration: Configuration

  constructor(...args: unknown[]) {
    super(...args)

    this.description = 'Generates a Starlight plugin ready for development.'
    this.sourceRoot(path.join(this.sourceRoot(), '../../templates'))

    this.configuration = {
      year: new Date().getFullYear().toString(),
    }

    this.option('name', { type: String, description: 'Name of the Starlight plugin' })
    this.option('description', { type: String, description: 'Description of the Starlight plugin' })
    this.option('ghUsername', { type: String, description: 'GitHub username' })
  }

  initializing() {
    this.log('Welcome to the Starlight plugin generator!\n')
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
    this.log.info('Preparing dependencies…')
    await fetchDependencyVersions()
  }

  writing() {
    // root
    copy(this, 'vscode', '.vscode')
    copy(this, 'gitignore', '.gitignore')
    copyTpl(this, 'LICENSE')
    copyTpl(this, 'README.md')
    copyTpl(this, 'package.json')
    copy(this, 'pnpm-workspace.yaml')

    // docs
    copyTpl(this, 'docs')

    // packages/plugin
    const pluginPath = `packages/${this.configuration.name}`

    copyTpl(this, 'packages/plugin', pluginPath)
    copy(this, 'npmignore', `${pluginPath}/.npmignore`)
  }

  install() {
    // @ts-expect-error - Environment options are not typed.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.env.options.nodePackageManager = 'pnpm'
  }

  async end() {
    this.log.info('Initializing Git repository…')
    await this.spawn('git', ['init', '--quiet'])

    this.log('\nYour Starlight plugin has been successfully created!\n')
    this.log(`Edit the 'packages/${this.configuration.name}/index.ts' file to start developing your plugin.`)
    this.log('For more information, also visit https://starlight.astro.build/')
  }
}

export interface Configuration {
  name?: string
  description?: string
  ghUsername?: string
  year: string
}
