function saveAuthToCookie (value) {
  document.cookie = `auth=${value}`
}

function saveRoleToCookie (value) {
  document.cookie = `role=${value}`
}

function saveUserIdToCookie (value) {
  document.cookie = `userId=${value}`
}

function saveUserNumToCookie (value) {
  document.cookie = `userNum=${value}`
}

function getAuthFromCookie () {
  return document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getRoleFromCookie () {
  return document.cookie.replace(/(?:(?:^|.*;\s*)role\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getUserIdFromCookie () {
  return document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getUserNumFromCookie () {
  return document.cookie.replace(/(?:(?:^|.*;\s*)userNum\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function deleteCookie (value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export {
  saveAuthToCookie,
  saveRoleToCookie,
  saveUserIdToCookie,
  saveUserNumToCookie,
  getAuthFromCookie,
  getRoleFromCookie,
  getUserIdFromCookie,
  getUserNumFromCookie,
  deleteCookie,
}
