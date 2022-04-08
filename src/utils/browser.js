export function getCurrentUrl() {
  return window.location.href;
}

export function getGroupId() {
  return window.location.pathname.split('/').slice(-1)[0];
}
