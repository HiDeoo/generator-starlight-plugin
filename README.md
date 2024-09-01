<div align="center">
  <h1>generator-starlight-plugin 🔋</h1>
  <p>Yeoman generator for Starlight plugins.</p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/generator-starlight-plugin/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/generator-starlight-plugin/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/generator-starlight-plugin/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/generator-starlight-plugin" />
  </a>
  <br />
</div>

## Features

An **opinionated** but still **lightweight** Yeoman generator to help create Starlight plugins.

- **opinionated**: [Git](https://git-scm.com/) and [pnpm](https://pnpm.io/) are required to generate a monorepo containing a Starlight plugin package and a Starlight documentation project acting at the same time as a playground to test your plugin. The plugin is expected to be written in TypeScript, hosted on GitHub, and licensed under the MIT license.
- **lightweight**: Formatting, linting, testing, bundling, publishing, deploying the documentation, which are all optional for a Starlight plugin, are not enforced by the generator. You are free to add them to your project as you see fit using the tools and services you prefer.

## Usage

To use the generator, run the following command in your terminal from the directory where you want to work on your plugin:

```shell
npx yo @hideoo/starlight-plugin
```

To start creating your Starlight plugin, edit the `packages/plugin-name/index.ts` file which will be the entry point of your plugin.

To test your plugin, run the following command from the `docs/` directory:

```shell
pnpm dev
```

To learn more about plugin development, check the [Starlight documentation](https://starlight.astro.build/reference/plugins/).

## Project Structure

The generated project uses a monorepo structure with different pnpm workspaces:

- `docs/`: A Starlight documentation project to document your plugin that also acts as a playground to test it.
- `packages/plugin-name/`: A package containing your Starlight plugin.

## Resources

The generated project contains the bare minimum to get started with a Starlight plugin. Here are some additional resources to help you develop and release your plugin:

- [Starlight Documentation](https://starlight.astro.build/)
- [Starlight Plugins Reference](https://starlight.astro.build/reference/plugins/)
- [Starlight Plugins Showcase](https://starlight.astro.build/resources/plugins/)
- [Astro Documentation](https://docs.astro.build/)
- [Astro Integration API](https://docs.astro.build/en/reference/integrations-reference/)
- [Astro “Deploy your site” guide](https://docs.astro.build/en/guides/deploy/)
- [Astro Discord](https://astro.build/chat/)
- [npm Registry Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

> [!TIP]
> After [deploying](https://docs.astro.build/en/guides/deploy/) your documentation, add a link to it in the `packages/plugin-name/README.md` file to help users find it.

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/generator-starlight-plugin/blob/main/LICENSE) for more information.
