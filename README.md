## 🧩 zylo: 협업 툴 프로젝트

**📆 프로젝트 기간: 2025.06.05 ~ 2025.07.01**
---
## 프로젝트 개요
| **구 분** | **내 용** |
| --- | --- |
| **프로젝트 주제** | - 자바, 스프링 활용 롯데정보통신 사내 커뮤니티 게시판 사이트 개발
  (Front Office, Back Office, API 서버) |
| **프로젝트 개요** | [배경]
본 프로젝트는 커뮤니티 사이트 구현을 통해 커뮤니티 사이트의 도메인 지식 함양과 SI 프로젝트 실무 역량을 제공하는 것을 목표로 한다.

[목표]
1. 본 프로젝트는 커뮤니티 사이트를 구성하는 주요 요소들의 설계 및 구현을 목표로 한다.
2. 이를 이용하는 사용자, 관리자는 부여된 권한에 따른 메뉴 구성 및 기능을 제공 받아야 한다.
3. JSP, Thymeleaf 등의 라이브러리(혹은 프레임워크)를 통한 Component Based UI의 활용을 통해 유지보수가 용이하고, 확장성 있는 프로젝트 환경을 구축한다. |
| **사용대상** | 사용자, 관리자 |
| **필수**
**구현기능** | **1. BO(Back Office)**
회원 : 회원정보 조회, 수정, 삭제 등이 가능한 관리 기능 구현
메뉴 : 게시판의 추가, 수정, 삭제, 숨기기 등의 관리 기능 구현
게시판 : 생성된 게시판의 게시글, 댓글 등의 관리 기능 구현
고객센터 : 1:1 문의에 대한 답변을 제공할 수 있는 기능 구현

**2. FO(Front Office)**
회원 : Session을 기반으로 한 인증/인가 기능 구현
게시판 : BO를 통해 등록된 게시판의 표출 기능 및 페이징 처리,게시글, 댓글 등록 기능 구현
검색 : 키워드를 통한 검색 기능의 구현
멤버쉽 : 결제를 통해 유료 기능(유료 게시판 조회) 구현
고객센터 : 1:1문의를 할 수 있는 페이지 구현

**3. API 서버**
BO, FO를 지원하는 API 서버 구현 |
| **추가**
**구현기능** | - 로그인 및 결제 시스템은 롯데멤버스 오픈 플랫폼([https://open.lottemembers.com](https://open.lottemembers.com/))을 이용해 구현(java로 구현)
- GA(Google Analytics) 태그 구현
- 검색엔진 노출을 위한 메타 태그 구현 |
| **산출물(Output)** | - 아키텍처 설계 문서
- 시스템 구성도, S/W Stack, 사용한 라이브러리 정보
- API 정의서
- Front Office, Back Office 화면 별 스토리보드
- 테스트 시나리오 및 결과서 |
| **기타 참고사항** | - API 서버 : JAVA기반의 SpringBoot를 사용하여 구축
- 대응 해상도 : PC, Mobile(반응형)
- 인프라 : Public Cloud 활용
- 데이터베이스 : 오픈소스 데이터베이스 |
---
**사용 기술**

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=java" width="48" height="48" alt="Java" /><br>Java
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=spring" width="48" height="48" alt="Spring" /><br>Spring
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=html" width="48" height="48" alt="HTML5" /><br>HTML5
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=css" width="48" height="48" alt="CSS3" /><br>CSS3
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/js-icon.svg" width="48" height="48" alt="JavaScript" /><br>JavaScript
    </td>
  </tr>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=mysql" width="48" height="48" alt="MySQL" /><br>MySQL
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=redis" width="48" height="48" alt="Redis" /><br>Redis
    </td>
         <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=mongo" width="48" height="48" alt="mongo" />MongoDB
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=aws" width="48" height="48" alt="AWS" /><br>AWS
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/docker-icon.svg" width="48" height="48" alt="Docker" />Docker
    </td>
  </tr>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=linux" width="48" height="48" alt="Linux" /><br>Linux
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=git" width="48" height="48" alt="Git" /><br>Git
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/github-icon.svg" width="48" height="48" alt="GitHub" /><br>GitHub
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/restapi-icon.svg" width="48" height="48" alt="Rest API" /><br>Rest API
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" /><br>React
    </td>
  </tr>
</table>
---
## 핵심 경험 및 기술

**MSA 아키텍처 적용**

- API Gateway, 드라이브 서비스, 채팅 서비스, 통합 서비스를 분리하여 배포 및 운영
- 별도의 API Gateway를 통해 단일한 서비스 엔드포인트 구축
- Proxy Pattern을 적용하여 서비스 간 통신을 최소화

**핵심 경험 및 기술**

**MSA 아키텍처 적용**

- API Gateway, 드라이브 서비스, 채팅 서비스, 통합 서비스를 분리하여 배포 및 운영
- 별도의 API Gateway를 통해 단일한 서비스 엔드포인트 구축
- Proxy Pattern을 적용하여 서비스 간 통신을 최소화

**핵심 경험 및 기술**

**MSA 아키텍처 적용**

- API Gateway, 드라이브 서비스, 채팅 서비스, 통합 서비스를 분리하여 배포 및 운영
- 별도의 API Gateway를 통해 단일한 서비스 엔드포인트 구축
- Proxy Pattern을 적용하여 서비스 간 통신을 최소화
