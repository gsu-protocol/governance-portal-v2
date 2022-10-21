import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';

export const GenericLink: React.FC<{
  href: string;
  title: string;
}> = ({ href, title, children }) => {
  if (href.includes('http')) {
    return (
      <ExternalLink href={href} title={title}>
        <> {children}</>
      </ExternalLink>
    );
  } else {
    return (
      <InternalLink href={href} title={title}>
        <> {children}</>
      </InternalLink>
    );
  }
};
