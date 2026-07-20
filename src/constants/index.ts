export const EXPERIENCE_ALL_REDIS_KEY = 'experience_all_cache_key';

export const PROFILE_REDIS_KEY = 'profile_cache_key';

export const SOCIAL_LINKS_ALL_REDIS_KEY = 'social_links_all_cache_key';

export const CARD_GET_BY_SLUG = (slug: string) =>
  `card_get_by_slug_${slug}_cache_key`;

export const EXPERIENCE_GET_BY_ID = (id: string) =>
  `experience_get_by_id_${id}_cache_key`;

export const GET_ALL_CARD_REDIS_KEY = 'get_all_card_cache_key';

export const REDIS_DEFAULT_TTL = 60 * 60 * 24;
