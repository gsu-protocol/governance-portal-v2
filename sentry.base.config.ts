import getConfig from 'next/config';

const SENTRY_DSN: string =
  process.env.SENTRY_DSN ||
  'https://a8697da22e834ab9bd03a23287b8ce26@o1364656.ingest.sentry.io/4504004886986752';

export const sentryBaseConfig = {
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV,
  // release is also used for source map uploads at build time,
  // so ensure that SENTRY_RELEASE is the same at build time.
  release: process.env.SENTRY_RELEASE || getConfig()?.publicRuntimeConfig?.sentryRelease,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENV !== 'development'
};
