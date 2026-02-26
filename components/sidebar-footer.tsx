'use client';

import { Globe, BookOpen, User } from 'lucide-react';

const links = [
  { label: 'nitaking.dev', url: 'https://www.nitaking.dev', icon: Globe },
  { label: 'micro.blog', url: 'https://nitaking.micro.blog', icon: BookOpen },
  { label: 'omg.lol', url: 'https://nitaking.omg.lol', icon: User },
];

export function SidebarFooter() {
  return (
    <div className="flex flex-row items-center gap-1 px-2 py-3 border-t">
      {links.map(({ label, url, icon: Icon }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-md text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
