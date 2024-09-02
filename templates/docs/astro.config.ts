import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import <%= importName %> from '<%= name %>'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/<%= ghUsername %>/<%= name %>/edit/main/docs/',
      },
      plugins: [<%= importName %>()],
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
