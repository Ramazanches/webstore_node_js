function setCookie(name, value, options = {}) {

  const encodeName = encodeURIComponent(name)
  const encodeValue = encodeURIComponent(value)
  const cookie = encodeName + "=" + encodeValue 

  options = {
    path: '/', 
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  for (let key in options) {
    cookie += "; " + key
    if (options[key] !== true) {
      cookie += "=" + options[key]
    }
  }

  document.cookie = cookie
}

export default setCookie