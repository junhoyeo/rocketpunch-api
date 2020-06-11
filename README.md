# Rocketpunch API

[<img src="./docs/images/rocketpunch-logo.png" align="right" width="100">](https://www.rocketpunch.com/)

> 🚀 Node.js를 위한 **로켓펀치 API** 클라이언트

[로켓펀치](https://www.rocketpunch.com/)는 스타트업 기업/채용 플랫폼으로 시작한 비즈니스 네트워킹 서비스로, 수많은 기업과 사람들의 프로필 그리고 채용 정보를 확인할 수 있습니다.

이 모듈은 비공식 API 클라이언트로,<br />
1️⃣ 기업과 개인이 프로젝트와 이력서 정보를 더 빠르게 **업데이트**하고,<br />
2️⃣ 자신에게 필요한 채용 정보를 구하는 과정을 **자동화**할 수 있도록 제작되었습니다.

## 📦 Installation

```bash
npm install rocketpunch-api
# Or using yarn
yarn add rocketpunch-api
```

## 👊 Usage

```ts
import {
  RocketPunchAPIClient,
  ICompanyMember,
  IProject,
  IUserSummary,
} from 'rocketpunch-api';

// Initialize API Client with Email Login
const rocketpunchAPI = new RocketPunchAPIClient({
  email: 'junhoyeo@example.com',
  password: '••••••••••',
});

(async () => {
  // Login with providen credentials
  await rocketpunchAPI.login();

  // User profile API
  const userProfile = rocketpunchAPI.getUser('jyeo');

  // Receive summary about user profile
  const summary: IUserSummary = userProfile.getSummary();
  console.log(summary.job);
  // => 'Frontend Web Developer'

  // Receive a list of user projects
  const projects: IRocketPunchProject[] = userProfile.getProjects();
  projects.forEach((project) => console.log(project));

  // Company profile API
  const companyProfile = rocketpunchAPI.getCompany('inu');

  // Receive brief profile information about company members
  const members: ICompanyMember = companyProfile.getMembers();
  console.log(members);
})();
```

## 📖 API

- 📃 명세
- 🚧 구현 중
- ✅ 구현 완료

### ✅ getUser
특정 `username`를 가진 사용자의 문서를 불러옵니다.

```ts
const userProfile = await rocketpunchAPI.getUser('@jyeo');
```

### ✅ userProfile.getSummary
해당 사용자의 **요약된 프로필 정보**를 반환하는 함수입니다.

```ts
userProfile.getSummary();
```

```js
{
  avatar: 'https://image.rocketpunch.com/user/183977/183977_1591104071.jpeg?s=200x200&t=cover',
  name: '여준호',
  englishName: 'Junho Yeo',
  status: '프리랜서',
  job: 'Frontend Web Developer',
  role: [ '디자인', 'SW 개발', '기획/PM' ],
  interests: [ 'JavaScript', 'Front-end', 'React' ],
  overview: 'Frontend is INEVITABLE™: 불가능한 프론트엔드는 없다고 믿습니다...',
  highlights: [
    { name: 'EmoticBox', href: '/tag/emoticbox-tuif05' },
    { name: '이누', href: '/tag/inu-vrcojq' },
    {
      name: '한국디지털미디어고등학교',
      href: '/tag/korea-digital-media-high-school-n8zzfw'
    }
  ],
  socialInfo: { recommends: 6, friends: 116, residence: '송파구' },
  webpage: 'https://trendy-resume.now.sh/',
  socialLinks: [
    { name: 'facebook', href: 'https://www.facebook.com/juno3704' },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/jyeo_official'
    },
    { name: 'github', href: 'https://github.com/junhoyeo' }
  ],
  connection: { following: 185, follower: 119 }
}
```

### 📃 userProfile.getCareer()
해당 사용자의 **경력 정보**를 반환하는 함수입니다.

```ts
userProfile.getCareer();
```

### ✅ userProfile.getEducation()
해당 사용자의 **학력 정보**를 반환하는 함수입니다.

```ts
userProfile.getEducation();
```

```js
[
  {
    name: '한국디지털미디어고등학교',
    href: '/tag/korea-digital-media-high-school-n8zzfw',
    major: [ '전문(실업)' ],
    date: '2019년 입학',
    description: '18기 해킹방어과',
    projects: [ '디미고인', '디미시간', 'CAKE' ]
  }
]
```

### 📃 userProfile.getProjects()
해당 사용자가 **등록한 프로젝트 목록**을 반환하는 함수입니다.

```ts
userProfile.getProjects();
```

### 📃 userProfile.getAwards()
해당 사용자의 **수상 정보**를 반환하는 함수입니다.

```ts
userProfile.getAwards();
```

### 📃 userProfile.getPosts()
해당 사용자가 **작성한 블로그 글 목록**을 반환하는 함수입니다.

```ts
userProfile.getPosts();
```

### 📃 userProfile.getMedia()
해당 사용자가 실린 **뉴스 및 미디어 정보**를 반환하는 함수입니다.

```ts
userProfile.getMedia();
```
