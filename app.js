const STORAGE_KEY = "todo-items";
const THEME_STORAGE_KEY = "todo-theme";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const filterButtons = document.querySelectorAll(".filter-button");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let currentFilter = "all";

// 從瀏覽器儲存空間讀取待辦資料。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前的待辦資料保存到瀏覽器儲存空間。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依使用者偏好或作業系統設定套用主題。
function applyTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isDark = savedTheme ? savedTheme === "dark" : systemTheme.matches;

  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  } else {
    delete document.documentElement.dataset.theme;
  }

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// 依目前篩選條件重新繪製清單，統計數字則始終計算全部待辦。
function renderTodos() {
  list.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const incompleteTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成：${incompleteTodos} 項`;

  if (filteredTodos.length > 0) {
    emptyMessage.hidden = true;
    return;
  }

  emptyMessage.hidden = false;
  emptyMessage.textContent = currentFilter === "active"
    ? "目前沒有未完成的待辦事項。"
    : currentFilter === "completed"
      ? "目前沒有已完成的待辦事項，項目可能只是被標記為未完成，並未被刪除。"
      : "還沒有任何待辦事項，新增一個吧！";
}

themeToggle.addEventListener("click", () => {
  const isDark = themeToggle.getAttribute("aria-pressed") === "true";
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "light" : "dark");
  applyTheme();
});

systemTheme.addEventListener("change", () => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

applyTheme();
renderTodos();
