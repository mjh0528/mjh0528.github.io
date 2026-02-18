# Personal Blog (Next.js + Tailwind)

Next.js(TypeScript) + Tailwind CSS 기반 개인 블로그입니다.

## Run locally

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 확인

## Build

```bash
npm run build
```

## 개인화(내 정보로 변경) 방법

핵심 정보는 `app/lib/site.ts`에서 관리합니다.

수정 항목:
- `name`: 표시 이름
- `title`: 브라우저 탭/메타 타이틀
- `description`: 사이트 설명
- `email`: 연락처
- `intro`: 메인 소개 문구
- `navigation`: 상단 메뉴
- `socials`: 소셜 링크

추가로 수정하면 좋은 파일:
- `app/about/page.tsx`: 자기소개 상세
- `app/projects/page.tsx`: 프로젝트 목록

## 블로그 글 추가 방법

현재 구조는 App Router 기반이며, `ArticleLayout` 템플릿 컴포넌트를 재사용합니다.

### 1) 새 글 파일 생성

예시: `app/articles/my-first-post/page.tsx`

```tsx
import { ArticleLayout } from '@/app/components/article-layout';

export default function MyFirstPostPage() {
  return (
    <ArticleLayout
      title="My First Post"
      date="2026-02-18"
      description="글 요약"
      tags={['nextjs', 'blog']}
    >
      <p>여기에 글 본문을 작성하세요.</p>
      <h2>섹션 제목</h2>
      <p>내용...</p>
    </ArticleLayout>
  );
}
```

### 2) 글 목록 페이지에 링크 추가

`app/articles/page.tsx`에 글 링크를 추가해 목록으로 노출합니다.

예시:

```tsx
<Link href="/articles/my-first-post">My First Post</Link>
```

### 3) 홈에서 최신 글 노출(선택)

홈(`app/page.tsx`)에 최신 글 카드/링크를 추가해 첫 화면에서 바로 진입할 수 있게 구성합니다.

## 현재 메뉴 구성

- `Articles`
- `Projects`
- `About`

## GitHub Pages 배포

1. 저장소 `Settings > Pages`에서 `Build and deployment`를 `GitHub Actions`로 설정
2. `main` 브랜치에 push
3. `.github/workflows/deploy.yml`가 자동으로 정적 사이트를 배포

`next.config.mjs`는 저장소 이름이 `username.github.io`이면 루트 경로(`/`)로,
프로젝트 저장소이면 `/<repo-name>` basePath를 자동 적용합니다.
