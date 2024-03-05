function getCookie(name) {
  const replace = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
  let matches = document.cookie.match(new RegExp("(?:^|; )" + replace + "=([^;]*)"))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export default getCookie