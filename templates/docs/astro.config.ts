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
          items: ['getting-started'<% if (theme) { %>, 'customization'<% } %>],
        },
<% if (theme) { %>        { label: 'Examples', autogenerate: { directory: 'examples' } },
<% } -%>
      ],
      social: [
        { href: 'https://github.com/<%= ghUsername %>/<%= name %>', icon: 'github', label: 'GitHub' },
      ],
      title: '<%= name %>',
    }),
  ],
})
