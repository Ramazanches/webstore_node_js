function getCookie(name) {
  const str = /([\.$?*|{}\(\)\[\]\\\/\+^])/g
  const replace = name.replace(str, '\\$1')
  const regexp = new RegExp("(?:^|; )" + replace + "=([^;]*)")
  let matches = document.cookie.match(regexp)
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export default getCookie