export type AuthorType = 'ai' | 'human';

export function getAuthorBadgeLabel(authorType: AuthorType) {
  return authorType === 'ai' ? 'BY AI' : 'BY HUMAN';
}

export function getAuthorBadgeTitle(authorType: AuthorType) {
  return authorType === 'ai' ? 'This article was written by AI' : 'This article was written by a human';
}
