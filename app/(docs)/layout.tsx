import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { SidebarSeparator } from '@/components/sidebar-separator';
import { SidebarPageItem } from '@/components/sidebar-item';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{ components: { Separator: SidebarSeparator, Item: SidebarPageItem } }}
    >
      {children}
    </DocsLayout>
  );
}
