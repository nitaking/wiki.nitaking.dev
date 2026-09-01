import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Globe, MessageCircle, AtSign } from 'lucide-react';

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/nitaking/wiki.nitaking.dev',
  nav: {
    title: "wiki.nitaking.dev",
  },
  links: [
    {
      type: 'icon',
      text: 'nitaking.dev',
      url: 'https://www.nitaking.dev',
      icon: <Globe />,
      external: true,
    },
    {
      type: 'icon',
      text: 'micro.blog',
      url: 'https://nitaking.micro.blog',
      icon: <MessageCircle />,
      external: true,
    },
    {
      type: 'icon',
      text: 'me.nitaking.dev',
      url: 'https://me.nitaking.dev',
      icon: <AtSign />,
      external: true,
    },
  ],
};
