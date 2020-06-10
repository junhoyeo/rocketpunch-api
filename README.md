# Rocketpunch API

[<img src="./docs/images/rocketpunch-logo.png" align="right" width="100">](https://www.rocketpunch.com/)

> 🚀 Node.js를 위한 로켓펀치 API 클라이언트

[로켓펀치](https://www.rocketpunch.com/)는 스타트업 기업/채용 플랫폼으로 시작한 비즈니스 네트워킹 서비스로, 수많은 기업과 사람들의 프로필 그리고 채용 정보를 확인할 수 있습니다.

이 모듈은 비공식 API 클라이언트로,<br />
1️⃣ 기업과 개인이 프로젝트와 이력서 정보를 더 빠르게 업데이트하고,<br />
2️⃣ 자신에게 필요한 채용 정보를 구하는 과정을 자동화할 수 있도록 제작되었습니다.

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
  const userProfile = await rocketpunchAPI.getUser('jyeo');

  // Receive summary about user profile
  const summary: IUserSummary = await userProfile.getSummary();
  console.log(summary);

  // Receive a list of user projects
  const projects: IRocketPunchProject[] = await userProfile.getProjects()
  projects.forEach((project) => console.log(project));

  // Company profile API
  const companyProfile = await rocketpunchAPI.getCompany('inu');

  // Receive brief profile information about company members
  const members: ICompanyMember = await companyProfile.getMembers()
  console.log(members);
})();
```
