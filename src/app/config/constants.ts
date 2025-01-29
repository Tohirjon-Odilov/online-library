import { environment } from "../../environments/environment";

// constants.ts
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  USER: 'user',
};

const BASE_URL = environment.baseUrl+"/api";

export const API_URLS = {
  // Auth URLs
  LOGIN_URL: BASE_URL + '/login',
  REGISTER_URL: BASE_URL + '/register',
  CHANGE_EMAIL_URL: BASE_URL + '/change-email',
  CHANGE_PASSWORD_URL: BASE_URL + '/change-password',

  // Country
  COUNTRIES: BASE_URL + '/countries',

  // Users
  USER: BASE_URL +'/user',
  USER_ADD_BOOK: BASE_URL + '/user/add-book',
  USER_REMOVE_BOOK: BASE_URL + '/user/remove-book',

  // Categories
  CATEGORIES: BASE_URL + '/categories',

  // Books
  ALL_BOOKS: BASE_URL + '/books',
  RANDOM_BOOKS: BASE_URL + '/book/random',
  BOOK: BASE_URL + '/book',
};

export const STATUS_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  TOO_MANY_REQUESTS: 429,
  UNPROCESSABLE_ENTITY: 422,
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};
