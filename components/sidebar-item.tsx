'use client';

import type { PageTree } from 'fumadocs-core/server';
import { SidebarItem } from 'fumadocs-ui/components/layout/sidebar';

export function SidebarPageItem({ item }: { item: PageTree.Item }) {
  return (
    <SidebarItem href={item.url} external={item.external} icon={item.icon}>
      <span className="truncate">{item.name}</span>
    </SidebarItem>
  );
}
