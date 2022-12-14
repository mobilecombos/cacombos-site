import { useState } from 'react';

import Section from '@components/Design/Section';
import Link from '@components/Links/Link';
import LinkButton from '@components/Inputs/LinkButton';

export interface IBreadcrumb {
  /**
   * URL for the page
   */
  url: string;
  /**
   * Textual label
   */
  t: string;
}

export interface IBreadcrumbsProps {
  data: IBreadcrumb[];
}

export default function Breadcrumbs({ data }: IBreadcrumbsProps) {
  const breadcrumbsToDisplay: (IBreadcrumb | null)[] = [];

  const [breadcrumbsExpanded, setBreadcrumbsExpanded] = useState(false);

  // Limit breadcrumbs to 3 items
  if (breadcrumbsExpanded || data.length <= 3) breadcrumbsToDisplay.push(...data);
  else {
    breadcrumbsToDisplay.push(data[0]);
    breadcrumbsToDisplay.push(null);
    breadcrumbsToDisplay.push(data[data.length - 2], data[data.length - 1]);
  }

  return (
    <Section width="wider" darker usePadding css={{ paddingTop: '24px !important', paddingBottom: '24px !important' }}>
      <nav aria-label="Breadcrumbs">
        <ol
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0,
          }}
        >
          {breadcrumbsToDisplay.map((crumb, index) => {
            const separator = index < breadcrumbsToDisplay.length - 1 && (
              <span
                css={{
                  margin: '0 8px',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                /
              </span>
            );

            if (crumb === null) {
              return (
                <li key="__ellipses__">
                  <LinkButton aria-label="Expand breadcrumbs" data-tooltip onClick={() => setBreadcrumbsExpanded(true)}>
                    ...
                  </LinkButton>
                  {separator}
                </li>
              );
            }

            return (
              <li key={crumb.url}>
                <Link href={crumb.url} aria-current={index === breadcrumbsToDisplay.length - 1 ? 'page' : undefined}>
                  {crumb.t}
                </Link>
                {separator}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* JSON-LD breadcrumb data for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: data.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i,
              item: {
                '@id': 'https://mastdatabase.co.uk' + crumb.url,
                name: crumb.t,
              },
            })),
          }),
        }}
      />
    </Section>
  );
}
