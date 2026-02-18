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

## 개인화(내 정보로 변경)

핵심 정보는 `app/lib/site.ts`에서 관리합니다.

수정 항목:
- `name`: 표시 이름
- `title`: 브라우저 탭/메타 타이틀
- `description`: 사이트 설명
- `email`: 연락처
- `intro`: 메인 소개 문구
- `navigation`: 상단 메뉴
- `socials`: 소셜 링크

## MDX 아티클 작성 방법

글 원본은 `content/articles/*.mdx` 파일입니다.

### 1) 생성기 사용(권장)

```bash
npm run new:post -- --title "My New Post"
```

옵션:
- `--description "요약"`
- `--author-type ai|human` (기본값: `ai`)
- `--author "표시 이름"` (미입력 시 `author-type`에 맞는 기본값 사용)
- `--date YYYY-MM-DD`
- `--slug post-slug`

### 2) 템플릿 복사(수동)

`content/articles/_template.mdx`를 복사해서 새 파일을 만듭니다.

예시:

```bash
cp content/articles/_template.mdx content/articles/my-second-post.mdx
```

### 3) frontmatter 작성

필수/권장 필드:
- `title`
- `date` (`YYYY-MM-DD`)
- `description`
- `authorType` (`ai` or `human`)
- `author` (작성자명)

### 4) 본문 작성

Markdown/MDX 문법(JSX 포함)으로 본문을 작성하면:
- 홈(`/`) 최신 글 3개 자동 반영
- 아티클 목록(`/articles`) 전체 글 자동 반영 (검색 + 5개 단위 페이징)
- 상세 페이지(`/articles/{slug}`) 자동 생성

### 참고

- slug는 파일명 기준입니다.  
예: `content/articles/my-second-post.mdx` -> `/articles/my-second-post`
- `_`로 시작하는 파일은 목록/페이지 생성에서 제외됩니다.  
예: `_template.mdx`

## GitHub Pages 배포

1. 저장소 `Settings > Pages`에서 `Build and deployment`를 `GitHub Actions`로 설정
2. `main` 브랜치에 push
3. `.github/workflows/deploy.yml`가 자동으로 정적 사이트를 배포

`next.config.mjs`는 저장소 이름이 `username.github.io`이면 루트 경로(`/`)로,
프로젝트 저장소이면 `/<repo-name>` basePath를 자동 적용합니다.
