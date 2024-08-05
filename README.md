## 템플릿

### 세팅

```
  npm install
  npm run dev
```

### .env

```
VITE_API_BASE_URL=https://timmyroom.site/
```

## 파일 구조

### api

- 지금은 chat.ts 제외하고 다 테스트 해본 api들
- api/index.ts가 axios 기본 설정
  - localStorage에 token있으면 가져와서 헤더에 붙임
- 호출은 그냥

```
const response = await login({
  email,
  password,
});
coosnole.log(response) // 응답값
```

### assets

- `icons/`에 svg 넣고 index.ts에 컴포넌트 등록 후 import 해서 사용
- `images/`에 이미지 등록 후 import해서 사용

### components

- 아시죠?
- common에 있는 건 전에 썼던 것 중에서 쓸만한 것들 가져옴
  - 파라미터 읽어보고 input은 잘 모르겠지만 text는 자주 쓸 것 같아요
- `modal` 은 혹시나 모달 띄울 때 쓰면 되는데 portal로 관리합니다~~ index.html에 `<div id="modal"></div>` 따로 만들어서 거기다 띄우고 있어요. 관리는 `useModalStore` 에서 관리합니다. 이건 이따가..
- test는 그냥 api 테스트해보려고 만든 것입니다 무시해주세요

### pages

- 아시죠

### store

- `modalStore.ts`는 `ModalType` 선언해서 불러오면 됩니다. 간단하게 말하면 `Main.tsx`에서 `{isOpen && modalType === 'confirm' && <ConfirmModal />}` 를 선언만 해두고 사용할 땐

```
const { openModal } = useModalStore();
openModal('confirm', {
  confirmText: <div>어쩌구 저쩌구</div>,
});

or

openModal('confirm', {
  confirmText: `확인~`,
  confirmOnClick : () => {}, // 확인 눌렀을 때 실행할 함수
});
```

- 처럼 사용하시면 됩니다.

### styles

- `palette.ts`는 색상 넣는 곳으로 색상을 `myGray : '#22222'`를 등록했을 때 `text-myGray` or `bg-myGray` 처럼 사용하면 됩니다.

### 테일윈드 설정

- `pxr` 단위를 넣었는데, 디자이너가 디자인 해서 dev모드에 보이는 모든 px단위(width,height,radius,border)를 사용할 때 pxr단위를 그대로 사용하시면 됩니다. 16px = 1rem을 그대로 적용해서 변환시켜줘요
