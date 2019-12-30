'use strict'

function replaceAttr(token, attrName, replace, env) {
  token.attrs.forEach(function(attr) {
    if (attr[0] === attrName) {
      attr[1] = replace(attr[1], env, token)
    }
  })
}

module.exports = function(md, options) {
  md.core.ruler.after('inline', 'replace-link', function(state) {
    state.tokens.forEach(function(blockToken) {
      if (blockToken.type === 'inline' && blockToken.children) {
        blockToken.children.forEach(function(token) {
          var type = token.type
          if (type === 'image') {
            if (typeof options.replaceLink === 'function') {
              replaceAttr(token, 'src', options.replaceLink, state.env)
            }
            if (options.className) {
              token.attrs.push(['class', options.className])
            }
          }
        })
      }
    })
    return false
  })
}
