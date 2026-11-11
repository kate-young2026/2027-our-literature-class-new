# 2027 우리들의 문학수업

양지고등학교 1학년 공통국어 문학 영역을 위한 14차시 수업 웹앱이다. 기초 2차시, 공통국어1의 세 성취기준 각 2차시, 공통국어2의 두 성취기준 각 3차시로 구성된다. 학생 답안은 브라우저에 저장된다.

## 교육자료와 출처

- [2022 개정 중등교육과정 학습 지도 MCP](https://github.com/raphysicst-create/korean-secondary-learning-map-mcp), [성취기준 원문 데이터](https://github.com/raphysicst-create/korean-secondary-learning-map-mcp/blob/main/data/kr/standard-texts.json): 5개 성취기준의 문구와 연결 확인. 데이터 출처와 고지는 원 저장소의 LICENSE 및 NOTICE를 확인한다.
- [경기도교육청 성취기준 수업·평가 자료](https://www.goe.go.kr/resource/old/BBSMSTR_000000030136/BBS_202502250541478772.pdf): 성취기준과 교수·학습 방향 대조.
- [비상교육 공통국어1(박영민) 관련 교재](https://m.book.visang.com/books/info/5869): 교과 연계 참고. 교과서 내용과 문항은 복제하지 않았다.
- [아산시 맹씨행단](https://tour.asan.go.kr/tour/develop/m_tour/?m_mode=view&pds_no=2024080705563539099), [홍성문화원](https://hs.cnkccf.or.kr/hsm/kor/main.do), [충북 관광 정지용 생가](https://tour.chungbuk.go.kr/www/selectTourCntnts.do?key=60&searchMainSe=ATTR&tourNo=433), [신경림 시 연구](https://journal.kci.go.kr/kolali/archive/articlePdf?artiId=ART001660867), [김선영 작가 소개](https://store.kyobobook.co.kr/person/detail/1000076908): 작가와 작품 관련 참고 자료. 작가의 지역 연고는 작품 배경과 구분한다.

현대 작품의 전문은 수록하지 않는다. 학생은 학교 도서관 등 적법한 경로로 작품을 읽어야 하며, 『시간을 파는 상점』은 사전 독서를 전제로 한다. 기초 차시와 학습 활동은 자체 제작했다.

## 개발과 배포

Node.js 22.13 이상과 네트워크에 접근 가능한 npm이 필요하다. `npm ci`, `npm run db:generate`를 실행하고 생성된 SQL을 확인한다. Sites 호스팅 설정의 `DB` 바인딩과 서버 환경변수 `ADMIN_EMAIL`이 필요하다. 이메일은 소스에 넣지 않고 호스팅 환경에서 설정한다. 로그인과 관리자 권한은 서버에서 검사한다. 로컬과 운영 데이터베이스는 별도이며 마이그레이션은 각 환경에 적용한다. GitHub 공개 시 교사용 개인 자료, 답안, 이메일과 비밀정보를 포함하지 않는다.

현재 구현은 작업 중이다. 의존성 설치, 데이터베이스 마이그레이션, 실제 로그인, PDF 출력 및 전체 브라우저 검증을 완료한 후 배포해야 한다.

교사용 자료는 서버 비밀 설정 `TEACHER_GUIDE`로만 초기 제공하며, 수정본은 D1의 비공개 레코드에 저장한다. 학생용 API는 교사용 레코드와 공개 중지된 본문을 반환하지 않는다. `TEACHER_GUIDE`를 설정하지 않으면 관리자 입력란은 빈 상태로 시작한다. 차시 공개 여부를 확인할 수 없는 경우 학생 화면은 차시 본문을 표시하지 않는다.

자료 구조 검사: `node --experimental-strip-types tests/content.mjs`. 이 검사는 화면 렌더링, 인증, 보안, PDF 또는 실제 배포 검사를 대신하지 않는다.
