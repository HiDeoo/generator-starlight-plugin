import type { StarlightPlugin } from '@astrojs/starlight/types'

export default function <%= importName %>(): StarlightPlugin {
  return {
    name: '<%= name %>',
    hooks: {
      setup() {
        // TODO(HiDeoo)
      },
    },
  }
}
