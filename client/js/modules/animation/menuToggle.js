import { isMobile } from '../helpers/isMobile.js'

// const menuToggler = (e, target, body) => {

//   e.preventDefault()

//   const icon = document.querySelector(target),
//         menu = icon.parentElement.querySelector(body)
//   if (icon && menu) {
//     document.body.classList.toggle('_lock')
//     icon.classList.toggle('_active')
//     menu.classList.toggle('_active')  
//   }

//        on = () => {
//         document.body.classList.add('_lock')
//         icon.classList.add('_active')
//         menu.classList.add('_active')  
//       },
//       off = () => {
//         document.body.classList.remove('_lock')
//         icon.classList.remove('_active')
//         menu.classList.remove('_active')  
//       },
//       toggle = () => {
//         if (icon && menu) {
//           icon.classList.contains('_active') ? off() : on()   
//         }
//       } 
//       toggle()    
// }    

function menuToggle (e, target, menu) {
  try {
    if (isMobile.any()) {
      if (e.target.closest(target)) {

        e.preventDefault()

        const link = document.querySelector(target),
              body = link.parentElement.querySelector(menu),
              on = () => {
                document.body.classList.add('_lock')
                link.classList.add('_active')
                body.classList.add('_active')  
              },
              off = () => {
                document.body.classList.remove('_lock')
                link.classList.remove('_active')
                body.classList.remove('_active')  
              }

        if (link && body) {
          link.classList.contains('_active') ? 
          off() : 
          on()
        }

      }
    }
    else {
      document.body.classList.add('_pc')
    }    
  } catch (e) {
    console.warn(e)
  }

}

export default menuToggle