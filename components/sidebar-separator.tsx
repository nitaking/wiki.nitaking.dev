'use client';

import type { Separator } from 'fumadocs-core/page-tree';
import { cn } from '@/lib/utils';

export function SidebarSeparator({ item }: { item: Separator }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 mb-1.5 px-2 font-medium [&_svg]:size-4 [&_svg]:shrink-0 empty:mb-0',
        item.name === 'Meta' ? 'mt-16' : 'mt-6',
      )}
    >
      {item.icon}
      {item.name}
    </p>
  );
}
