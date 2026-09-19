![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，提供簡潔的任務管理介面，讓使用者可以新增、整理、完成並保存日常待辦事項。

## 線上展示

[前往 GitHub Pages 展示](https://<你的帳號>.github.io/<你的repo名稱>/)

## 功能

- 新增待辦事項。
- 防止提交空白的待辦事項。
- 將待辦事項標記為已完成或未完成。
- 刪除待辦事項。
- 依照全部、未完成或已完成狀態篩選清單。
- 顯示目前未完成的待辦事項數量。
- 支援深色模式與淺色模式切換。
- 在沒有手動設定主題時，依照作業系統的色彩偏好顯示主題。
- 保存待辦事項、主題偏好與目前篩選條件，重新開啟頁面後仍可保留使用狀態。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發。
- 不使用任何前端框架、外部套件或建置工具。
- 使用瀏覽器的 `localStorage` 保存待辦資料、主題設定與篩選條件。
- 透過 DOM API 更新待辦清單與介面狀態。

## 開發方式

本專案在 GitHub Copilot 實戰工作坊中，透過 GitHub Copilot Agent Mode、MCP，以及 `.github/prompts` 中的提示檔案建立 agentic workflow。這套流程協助將需求拆解為可執行的開發步驟，搭配專案內容與工具取得上下文，完成待辦清單功能、介面調整與驗證。實作仍以專案中的 HTML、CSS 與原生 JavaScript 為主，沒有引入框架或套件。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode 協助理解需求、規劃工作並執行開發任務。
- 如何透過 MCP 連接工具與上下文，讓 Agent 能更有效地處理專案工作流程。
- 如何使用 `.github/prompts` 定義可重複使用的 agentic workflow。
- 如何以原生 JavaScript 管理 DOM、事件、篩選狀態與瀏覽器儲存資料。
- 如何在不使用框架的前提下，完成具備主題切換與響應式介面的前端小型專案。