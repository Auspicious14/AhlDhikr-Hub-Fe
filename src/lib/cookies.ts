import Cookies from 'js-cookie';

// Helper function to get a value from a cookie
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Helper function to set a value in a cookie
export const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(key, value, options);
};

// Helper function to remove a cookie
export const removeCookie = (key: string): void => {
  Cookies.remove(key);
};

// Helper function to get a JSON object from a cookie
export const getJsonCookie = <T>(key: string): T | null => {
  const value = Cookies.get(key);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    console.error(`Error parsing JSON from cookie "${key}":`, e);
    return null;
  }
};

// Helper function to set a JSON object in a cookie
export const setJsonCookie = <T>(key: string, value: T, options?: Cookies.CookieAttributes): void => {
  try {
    const stringValue = JSON.stringify(value);
    Cookies.set(key, stringValue, options);
  } catch (e) {
    console.error(`Error stringifying JSON for cookie "${key}":`, e);
  }
};
