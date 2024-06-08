// userService.js

import { USER_ID } from "./UserConstants";

// Function to set the user ID
export function setGlobalUserId(userId) {
  USER_ID = userId;
}

// Function to get the user ID
export function getGlobalUserId() {
  return USER_ID;
}