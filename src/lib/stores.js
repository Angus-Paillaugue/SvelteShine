import { writable } from 'svelte/store';

export const toasts = writable([]);
export const searchModalShown = writable(false);

/**
 * Generates a unique ID by combining the current timestamp with a random number.
 * @returns {string} The generated ID.
 */
const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();

/**
 * Creates a new toast notification.
 * @param {Object} obj - The toast object.
 * @param {string} obj.type - The type of the toast (green, red, gray).
 * @param {string} [obj.title] - The title of the toast. If not provided, a default title will be used based on the type.
 * @param {string} obj.message - The message of the toast.
 */
export function newToast(obj) {
  let { type, title, message } = obj;

  const baseToastTitles = {
    green: 'Success',
    red: 'Error',
    gray: 'Info'
  };
  const newToast = {
    type: type || 'gray',
    title: title || baseToastTitles[type],
    message,
    id: generateId()
  };
  // Add the new toast to the beginning of toasts the array.
  toasts.update((oldToast) => {
    oldToast = [newToast, ...oldToast];
    return oldToast;
  });

  // Remove the toast after 5 seconds.
  setTimeout(() => {
    removeToast(newToast.id);
  }, 5000);
}

/**
 * Removes a toast from the toasts array based on its id.
 * @param {number} id - The id of the toast to be removed.
 */
export function removeToast(id) {
  toasts.update((all) => all.filter((t) => t.id !== id));
}
