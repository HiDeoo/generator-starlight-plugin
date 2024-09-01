import type StarlightPluginGenerator from '../index.js'

import { getLatestMinorVersion, getLatestVersion } from './npm.js'

export function copyTpl(generator: StarlightPluginGenerator, from: string, to?: string) {
  generator.fs.copyTpl(
    generator.templatePath(from),
    generator.destinationPath(to ?? from),
    getTemplateContext(generator),
  )
}

export function copy(generator: StarlightPluginGenerator, from: string, to?: string) {
  generator.fs.copy(generator.templatePath(from), generator.destinationPath(to ?? from))
}

function getTemplateContext(generator: StarlightPluginGenerator) {
  return {
    ...generator.configuration,
    dep(pkg: string) {
      return `"${pkg}": "^${getLatestVersion(pkg)}"`
    },
    peerDep(pkg: string) {
      return `"${pkg}": ">=${getLatestMinorVersion(pkg)}"`
    },
  }
}
