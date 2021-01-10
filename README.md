# amazing-talker-calendar

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# run jest tests
$ npm run test
```

---

## 前端工程師作業(行事曆) | Frontend Engineer Assessment (Calendar)

### 請實作以下畫面的前端功能

(可 [此網址](https://en.amazingtalker.com/teachers-and-tutors/amy-estrada?from_tutors_page&language=english) 參考實際的前端設計)
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F28e91eac-4b84-426b-9087-0a887ecebfca%2FUntitled.png?table=block&id=37686379-5d5a-47c3-a223-4db4f3f0e57c&width=1270&userId=&cache=v2)

### 需求規範

- 桌面及手機 Responsive Web Design
- 請使用 React.js. 或 Vue.js

### 功能規範

1. [x] 查看行事曆
   - [x] 以週為單位
   - [x] 不能查看過去的時段
2. [x] 依照不同地區顯示當地時區的時間
   - [x] 行事曆會依照該時區顯示預約時間
3. [x] 顯示「可預約的時間」和「已被預約」的時間
   - [x] 已被預約的時間會顯示灰色
   - [x] 可被預約的時間會顯示綠色
4. [x] 參照以下提供預約時間的 JSON，請預設有個 API URL，回傳以下資料格式

```json
{
  "available": [
    {
      "start": "2020-07-17T10:30:00Z",
      "end": "2020-07-17T11:00:00Z"
    },
    {
      "start": "2020-07-17T13:00:00Z",
      "end": "2020-07-17T14:00:00Z"
    },
    {
      "start": "2020-07-18T05:30:00Z",
      "end": "2020-07-18T07:00:00Z"
    }
  ],
  "booked": [
    {
      "start": "2020-07-17T11:00:00Z",
      "end": "2020-07-17T13:00:00Z"
    },
    {
      "start": "2020-07-17T14:00:00Z",
      "end": "2020-07-17T15:00:00Z"
    },
    {
      "start": "2020-07-18T07:00:00Z",
      "end": "2020-07-18T08:00:00Z"
    },
    {
      "start": "2020-07-18T11:30:00Z",
      "end": "2020-07-18T13:00:00Z"
    }
  ]
}
```

### 重要提醒

- 測驗主要考核 **Clean Code** 和 **SOLID** 的實踐。
  - 我們會認真的檢視您對於組件(component)拆分和介面的設計，以及各個資料層的相依性
- 你有 48 小時的時間完成這份線上測驗。
- 這份線上測驗分數會決定您的薪資範圍，請必定要交卷。請把 Source Code 壓縮成 Zip File，並在限期前上載到此 [Assessment Submission Form](https://docs.google.com/forms/d/e/1FAIpQLSfJxDLnHhwTjBjRoUP9QD2Gcsx89a3D378g9Jkpyul1373NVg/viewform) ，上載後請回覆 Email 通知我們。

### 加分題

- [x] Unit Test
- [x] I18n
