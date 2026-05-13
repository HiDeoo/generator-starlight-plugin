import { getVersionsBatch, type PackageVersionsInfo } from 'fast-npm-meta'

// The minimum age in days for versions used in generated package.json files.
export const MinimumReleaseAgeInDays = 3

// A list of dependencies to fetch versions for and can be used synchronously in templates.
const dependencies = new Set(['@astrojs/starlight', 'astro', 'sharp'])

// A map of dependencies and their latest versions.
const versions = new Map<string, string>()

const versionRegex = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/

export async function fetchDependencyVersions() {
  const minimumPublishedAt = Date.now() - MinimumReleaseAgeInDays * 24 * 60 * 60 * 1000
  const dependenciesVersions = await getVersionsBatch([...dependencies])

  for (const dependencyVersions of dependenciesVersions) {
    const version = getVersionWithMinimumReleaseAge(dependencyVersions, minimumPublishedAt)

    if (version) {
      versions.set(dependencyVersions.name, version)
      continue
    }

    throw new Error(`Latest version matching minimum release age for '${dependencyVersions.name}' not found.`)
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

function getVersionWithMinimumReleaseAge(
  { distTags, time, versions }: PackageVersionsInfo,
  minimumPublishedAt: number,
) {
  const latestDistTagVersion = parseVersion(distTags.latest)
  let latestVersion: { raw: string; parsed: Version } | undefined

  for (const version of versions) {
    const parsedVersion = parseVersion(version)
    if (!parsedVersion) continue

    if (latestDistTagVersion && compareVersions(parsedVersion, latestDistTagVersion) > 0) continue

    const publishedAt = time[version]
    const publishedTimestamp = publishedAt ? Date.parse(publishedAt) : Number.NaN

    if (Number.isNaN(publishedTimestamp) || publishedTimestamp > minimumPublishedAt) continue

    if (!latestVersion || compareVersions(parsedVersion, latestVersion.parsed) > 0) {
      latestVersion = { raw: version, parsed: parsedVersion }
    }
  }

  return latestVersion?.raw
}

function parseVersion(version: string): Version | undefined {
  const match = versionRegex.exec(version)
  if (!match?.groups) return

  const { major, minor, patch } = match.groups

  if (!major || !minor || !patch) return

  return [Number(major), Number(minor), Number(patch)]
}

function compareVersions(a: Version, b: Version) {
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
}

type Version = [number, number, number]
