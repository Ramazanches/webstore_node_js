
class Get {
	static arguments (args) {
		try {

			let url, options

			if (args.length >= 2) {
				url = args[0]
				options = args[1]
			}

			if (args.length === 1) {

				options = args[0]

				if (typeof options === 'string') {
					url = options
				}

				if (options && options instanceof Object) {
					url = options.url
				} else {
					console.warn('Error set url') 
				}
			}

			if (!args || args.length === 0) {
				console.warn('Error: ' + 'Please set arguments')
			}

			return { url, options }		

		} catch (e) {
			console.warn(e)
		}
	}
	static path (url, options) {
		try {

			let path

			if (!url || typeof url !== 'string') {
				if (options.url && typeof options.url === 'string') {
					path = options.url
				} else {
					path = ''
				}
			} else {
				path = url
			}
			return path		

		} catch (e) {
			console.warn(e)
		}
	}
	static host (options) {
		try {

			let host
			const defaultUrl = 'http://localhost:3000/'
			const { baseUrl } = options

			if (baseUrl && baseUrl !== undefined && baseUrl !== '') {
				host = baseUrl
			} else {
				host = defaultUrl
			}

			return host	

		} catch (e) {
			console.warn(e)
		}
	}
	static params (url, params) {
		try {

			if (params && params instanceof Object) {
				Object.entries(params).map( entry => {
					url.searchParams.set(entry[0], entry[1])
				})
			} else {
				return url	
			}	

			return url	

		} catch (e) {
			console.warn(e)
		}
	}
	static configuration(options) {
		try {

			const { settings, body } = options
			const defaultCharset = 'charset=UTF-8'
			let charset, 
					type
			
			if (settings && settings instanceof Object) {
				if (settings.charset && typeof settings.charset === 'string') {
					charset = settings.charset
				} else {
					charset = defaultCharset
				}
				if (settings.type && typeof settings.type === 'string') {
					type = settings.type
				} else {
					type = 'json'					
				}
			} else {
				if (typeof body === 'string') {
					type = 'text'
				} else {
					type = 'json'
				}
				charset = defaultCharset
			}

			return { type, charset }

		} catch (e) {
			console.warn(e)
		}
	}
	static bodyLength (body) {
		try {

			let length

			typeof body === 'string' ?
			length = body.length :
			typeof body === 'number' ?
			length = 1 :
			body instanceof Array ?
			length = body.length :
			body instanceof Object ?
			length = Object.entries(body).length :
			length = 0;

			return length
			
		} catch (e) {
			console.warn(e)
		}
	}
  static headers (options, type, length, charset) {
    try {

      let accept, content, $headers, HEADERS = []

  		const { 
  			headers, 
  			settings, 
  			body 
  		} = options

      const types = [
        {
          type: 'xml',
          accept: 'text/xml',
          content: 'text/xml'
        },
        {
          type: 'html',
          accept: 'text/html',
          content: 'text/html'
        },
        {
          type: 'text',
          accept: 'text/plain',
          content: 'text/plain'
        },
        {
          type: 'json',
          accept: 'application/json',
          content: 'application/json'
        },
        {
          type: 'formdata',
          accept: 'application/json, application/xml, text/plain, text/html, *.*',
          content: 'multipart/form-data'
        }
      ]

      const customHeaders = () => {
        try {

          if (headers && headers instanceof Object) {
            $headers = Object.entries(headers)
            $headers.map( item => {
              if (item[0] === 'Accept') {
                accept = item[1].split(';')[0]
              }
              if (item[0] === 'Content-Type') {
                content = item[1].split(';')[0]
              }
            })
          } 

        } catch (e) {
          console.warn(e)
        }
      }

      const defaultHeaders = () => {
        try {

          if (types && types instanceof Array) {
            types.map( item => {
              if (type === item.type) {
                if (!accept || accept === undefined || accept === '') {
                  accept = item.accept
                }
                if (!content || content === undefined || content === '') {
                  content = item.content
                }
              }
            })            
          } 

        } catch (e) {
          console.warn(e)
        }
      }

      const main = () => {
	      if (settings && settings instanceof Object) {
	      	const custom = settings.customHeaders
	        if (custom && custom === true ) {
	          defaultHeaders()
	          customHeaders()
	        } else {
	          defaultHeaders()
	        }       
	      } else {
	        defaultHeaders()
	      }			      	
      }

			main()  

      HEADERS.push(["Accept", `${accept}; ${charset}`])

      if (body && body instanceof Object && body.length !== 0) {
				HEADERS.push(["Content-Type", `${content}; ${charset}`])
				if (length !== 0) {
					HEADERS.push(["Content-Length", length.toString()]) 
				}				
			}
			
			return HEADERS

    } catch (e) {
      console.warn(e)
    }
  }
  static body (options, type) {
  	const { body } = options
  	if (body && body instanceof Object && body.length !== 0) {
			type === 'json' ? $body = JSON.stringify(body) : $body = body
		}
  }
	static authorization (options, headers) {
		try {
			
			const auth = options.authorization

			if (auth && auth instanceof Object) {
				if (auth.token && typeof auth.token === 'string') {
					if (auth.type && auth.type === 'jwt') {
						headers.push(["Authorization", `Bearer ${auth.token}`])
					}	else {
						auth.type === 'jwt'
					}					
				}
			}

			return headers

		} catch (e) {
			console.warn(e)
		}
	}
	static options (options, headers, method) {
		try {

			const { details, body } = options			

			let $options = {
				method: method,
				headers: Object.fromEntries(headers),
			}

			if (method !== 'GET' && method !== 'HEAD') {
				$options = Object.assign($options, { body: body })
			}

			if (details) {
				const isObject = details instanceof Object
				const detailsLength = Object.entries(details).length

				if (details && isObject && detailsLength !== 0 ) {
					$options = Object.assign($options, details)						
				}		
			}

			return $options		

		} catch (e) {
			console.warn(e)
		}
	}
}

class Result {

	static ok (res) {
		console.group()
		console.log(`Успешная отправка: ${res.statusText} ${res.status}`)
		console.groupEnd()
	}

	static fail (res) {
		console.group('Не отправлено')
		console.log(res.statusText + ' ' + res.status)
		console.groupEnd()	
	}

	static message (res) {
		try {
			if (res) {
				res.ok === false ? this.fail(res) : this.ok(res)
			}					
		} catch (e) {
			console.warn(e)
		}
	}

}

class Fetch {

	constructor (method, args) {
		this.method = method
		this.args = args
	}

	configuration (url, options, method = 'GET') {
		try {

			let $options,
					$URL,
					$url,
					request, 
					path = Get.path(url, options),
					host = Get.host(options),
					{ type, charset } = Get.configuration(options),
					length = Get.bodyLength(options.body),
					$headers= Get.headers(options, type, length, charset)

			$URL = host + path
			$URL = $URL.replace(/([^:])(\/\/+)/g, '$1/')
			$URL = new URL($URL)

			$url = Get.params($URL, options.params)			
			$headers = Get.authorization(options, $headers)
			$options = Get.options(options, $headers, method)

			return { $url, $options }

		} catch (e) {
			console.warn(e)
		}		
	}

/*	async request (url, options) {
		try {

			await fetch(url, options)
			.then(res => {return res })
			.catch(error => console.warn(error))
			// Result.message(res)
			// return res

		} catch (e) {
			console.warn(e)
		}
	}*/

	main () {
		try {
			let res
			const args = this.args
			const method = this.method
			const { url, options } = Get.arguments(args)

			if (options) {
				const $request = this.configuration(url, options, method)
				const length = Object.entries(options).length
				const { $url, $options } = $request

				if (options instanceof Object && length !== 0) {
					res = fetch($url.href, $options)					
				} else {
					res = fetch(url, {method: method})
				}

			}
			return res

		} catch (e) {
			console.warn(e)
		}
	}

}

class Ajaxer {

	async get (...args) {
		try {
			const res = new Fetch('GET', args).main()
			return res.json()
		} catch (e) {
			console.warn(e)
		}
	}

	async post (...args) {
		try {
			const res = new Fetch('POST', args).main()
			console.log(res)
		} catch (e) {
			console.warn(e)
		}
	}

	async put (...args) {
		try {
			const res = new Fetch('PUT', args).main()
			return res.json()
		} catch (e) {
			console.warn(e)
		}
	}

	async patch (...args) {
		try {
			const res = new Fetch('PATCH', args).main()
			return res.json()
		} catch (e) {
			console.warn(e)
		}
	}

	async delete (...args) {
		try {
			const res = new Fetch('DELETE', args).main()
			return res.json()
		} catch (e) {
			console.warn(e)
		}
	}
}

export default new Ajaxer()


//Полный пример

/*Ajaxer.get('auth/user', {
	params: {
		id: 'id',
		name: 'name',
		age: 'age'
	},
	headers: { //при отсутствии headers заголовки определяются автоматически
		Accept: 'application/json' 
	},
	settings: {
		charset: 'charset=utf-8', //стоит по умолчанию
		type: 'json', //Заголовки определяются автоматически от типа (стоит по умолчанию)
		customHeaders: true //Кастомные заголовки в приоритете (не рекомендуется)
	}
})

Ajaxer.post('auth/login', {
	body: {
		name: 'John',
		age: 23
	},
	settings: {
		type: 'json' //автоматически преобразует body в json 
	},
	authorization: {
		token: 'YWxhZGRpbjpvcGVuc2VzYW1l', //токен
		type: 'jwt' //тип авторизации
	}
})


Ajaxer.get('auth/users', {
	authorization: {
		token: '', //указывать без приставки
		type: 'jwt'
	}
})
*/