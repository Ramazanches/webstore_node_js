function setCookie(name, value, options = {}) {
  try {

    const encodeName = encodeURIComponent(name)
    const encodeValue = encodeURIComponent(value)
    let cookie = encodeName + "=" + encodeValue 

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
  
  } catch (e) {
    console.warn(e)
  }

}

export default setCookie