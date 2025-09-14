export function authHeader() {
  const currentUser=JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    return {
      Authorization: `Bearer ${currentUser.token}`,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
export function authUploadHeader() {
  const currentUser=JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    return {
      Authorization: `Bearer ${currentUser.token}`,
    };
  } else {
    return {};
  }
}
