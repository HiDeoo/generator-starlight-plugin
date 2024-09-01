import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import plugin from '<%= name %>'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/<%= ghUsername %>/<%= name %>/edit/main/docs/',
      },
      plugins: [plugin()],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/<%= ghUsername %>/<%= name %>',
      },
      title: '<%= name %>',
    }),
  ],
})
