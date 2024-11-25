import type { PageMeta } from '$lib/models/Paginatable.ts';

const DEFAULT_PAGE = '0';

export function extractPageMeta(headers: Headers): PageMeta {
  return {
    current: parseInt(headers.get('x-pagination-page') ?? DEFAULT_PAGE),
    total: parseInt(headers.get('x-pagination-page-count') ?? DEFAULT_PAGE),
  };
}
