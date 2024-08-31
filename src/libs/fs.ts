import type StarlightPluginGenerator from '../index.js'

export function copyTpl(generator: StarlightPluginGenerator, from: string, to?: string) {
  generator.fs.copyTpl(generator.templatePath(from), generator.destinationPath(to ?? from), generator.answers)
}
