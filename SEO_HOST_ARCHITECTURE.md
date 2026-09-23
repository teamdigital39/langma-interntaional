# Langma International SEO host architecture

## Confirmed rule

`https://www.langmainternational.com` is the only canonical and indexable public website host.

`https://api.langmainternational.com` is a backend/API host. It must not be used as a canonical URL, `og:url`, sitemap URL, or public SEO landing-page host.

## Local implementation

- Runtime canonical URLs are built from `SITE_URL` in `src/seo.js`.
- Static route generation writes canonicals, `og:url`, and JSON-LD URLs on the `www` host.
- `public/sitemap.xml` contains only `www.langmainternational.com` URLs.
- `scripts/validate-seo-host.mjs` fails the production build if a generated canonical, social URL, or sitemap entry uses the API host or another host.

## Production/server checklist

The API host should be configured separately from this frontend repository:

1. Decide whether API endpoints need to be publicly crawlable. For a backend-only host, they normally should not be indexable.
2. Do not blindly block the API host until equivalent public content is confirmed on the `www` host.
3. If the API host exposes duplicate HTML pages, return a permanent redirect to the matching `www` URL or return `noindex` where a redirect is not appropriate.
4. Ensure API responses do not emit `rel=canonical` or `og:url` values pointing to the API host.
5. Submit only `https://www.langmainternational.com/sitemap.xml` in Google Search Console.
6. Use Search Console URL Inspection on representative `www` language, course, landing, blog, and contact URLs.
7. Monitor the API hostname separately for indexed URLs and unexpected HTML responses.

This repository change does not alter API routing, server redirects, robots behavior on the API host, or deployment configuration.
