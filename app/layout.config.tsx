import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/nitaking/wiki.nitaking.dev',
  nav: {
    title: "wiki.nitaking.dev",
  },
  links: [
    {
      text: 'Github',
      url: 'https://github.com/nitaking',
      active: 'url',
    },
  ],
};
