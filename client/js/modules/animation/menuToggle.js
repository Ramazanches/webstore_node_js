import {isMobile} from '../utils/isMobile.js'

const menuToggler = (e, target, body) => {

  e.preventDefault()

  const icon = document.querySelector(target),
        menu = document.querySelector(body),
        on = () => {
          document.body.classList.add('_lock')
          icon.classList.add('_active')
          menu.classList.add('_active')  
        },
        off = () => {
          document.body.classList.remove('_lock')
          icon.classList.remove('_active')
          menu.classList.remove('_active')  
        },
        toggle = () => {
          if (icon && menu) {
            icon.classList.contains('_active') ? off() : on()   
          }
        } 
        toggle()    
}    

function menuToggle (e) {
  const t = e.target,
        icon = '.menu__icon',
        menu = '.menu__body',
        sub = '.menu__sublink'

  if (isMobile.any()) {
    if (icon && t.closest(icon)) {
      menuToggler(e, icon, menu)        
    }
  }
  else document.body.classList.add('_pc')
}

export default menuToggle