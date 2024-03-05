export const iterator = (e, node, f) => {
  const nodes = document.querySelectorAll(node),
        _for = () => nodes.forEach( node => f(e, node) )
        
  nodes.length > 0 ? _for() : console.warn('Not found nodes')
}