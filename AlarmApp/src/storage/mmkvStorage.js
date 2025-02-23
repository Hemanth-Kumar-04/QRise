import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Save data (key-value)
export const saveData = (key, value) => {
  storage.set(key, JSON.stringify(value));
};

// Retrieve data
export const getData = (key) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

// Remove data
export const removeData = (key) => {
  storage.delete(key);
};
