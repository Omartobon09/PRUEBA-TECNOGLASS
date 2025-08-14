// src/utils/constants.js
export const API_URLS = {
  LOGIN: "https://reqres.in/api/login",
  TASKS: "https://689d460ace755fe697883774.mockapi.io/api/v1/Tarea",
};

export const API_CONFIG = {
  LOGIN_HEADERS: {
    "Content-Type": "application/json",
    "X-api-key": "reqres-free-v1",
  },
  TASKS_HEADERS: {
    "Content-Type": "application/json",
  },
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_EMAIL: "userEmail",
};

export const ROUTES = {
  LOGIN: "/login",
  TASKS: "/tasks",
  HOME: "/",
};
