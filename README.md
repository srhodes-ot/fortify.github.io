# fortify.github.io

<https://fortify.github.io>

## Development

### Requirements

- Ruby 2.7
- Bundler
- Node.js 18+

> **🚨 Heads up!**
>
> Npm module `@micro-focus/quantum-ux-bootstrap` is only available from a
> private registry. To access it, get that registry URL and add it to your
> project or user home `.npmrc` file:
>
> ```bash
> @micro-focus:registry=https://secret-internal.registry.com
> ```

### Dev server

Serve the site locally in watch mode with the following command:

```bash
npm run dev
```

Open your browser to <http://127.0.0.1:4000/> to view the site.

### Build the site

To build the site for deployment, you can run the following command:

```bash
npm run build
```

This builds the site to the `_site/` directory.

## Audit dependencies

To check if your NPM _and_ Gem dependencies are free of known vulnerabilities, you
can run the following command:

```bash
npm run audit
```
