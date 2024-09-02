import latestVersion from 'latest-version'

// A list of dependencies to fetch versions for and can be used synchronously in templates.
const dependencies = new Set(['@astrojs/starlight', 'astro', 'sharp'])

// A map of dependencies and their latest versions.
const versions = new Map<string, string>()

export async function fetchDependencyVersions() {
  for (const pkg of dependencies) {
    versions.set(pkg, await latestVersion(pkg))
  }
}

export function getLatestVersion(pkg: string) {
  const version = versions.get(pkg)

  if (version) return version

  throw new Error(`Latest version for '${pkg}' not found.`)
}

export function getLatestMinorVersion(pkg: string) {
  const version = versions.get(pkg)

  if (version) return version.split('.').slice(0, 2).join('.')

  throw new Error(`Latest minor version for '${pkg}' not found.`)
}
