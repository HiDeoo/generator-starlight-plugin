import type StarlightPluginGenerator from '../index.js'

export function copyTpl(generator: StarlightPluginGenerator, from: string) {
  generator.fs.copyTpl(generator.templatePath(from), generator.destinationPath(from), generator.answers)
}
