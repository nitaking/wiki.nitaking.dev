'use client';

import type { PageTree } from 'fumadocs-core/server';
import { cn } from '@/lib/utils';

export function SidebarSeparator({ item, index }: { item: PageTree.Separator; index: number }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 mb-1.5 px-2 font-medium [&_svg]:size-4 [&_svg]:shrink-0 empty:mb-0',
        item.name === 'Meta' ? 'mt-16' : index !== 0 ? 'mt-6' : undefined,
      )}
    >
      {item.icon}
      {item.name}
    </p>
  );
}
