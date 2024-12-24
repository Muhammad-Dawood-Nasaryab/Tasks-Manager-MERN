/* This JavaScript code snippet defines a module that manages a token blacklist using a Set data
structure. This gets refreshed everytime the server restarts. Here's a breakdown of what each part 
of the code does: */

const tokenBlacklist = new Set();

/**
 * @desc - Adds a token to the blacklist
 * @param {string} token - JWT token to be blacklisted
 */
export const add = (token) => {
   tokenBlacklist.add(token);
};

/**
 * @desc - Checks if a token is blacklisted
 * @param {string} token - JWT token to remove
 */
export const remove = (token) => {
   tokenBlacklist.delete(token);
};

/**
 * @desc - Checks if a token is blacklisted
 * @param {string} token - JWT token to check
 * @returns {boolean} - Returns true if the token is blacklisted
 */
export const has = (token) => {
   return tokenBlacklist.has(token);
};

/**
 * @desc - Clears the blacklist (for testing or specific purposes)
 */
export const clear = () => {
   tokenBlacklist.clear();
};

export default {
   add,
   remove,
   has,
   clear,
};
