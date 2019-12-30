const MarkdownIt = require('markdown-it')
const ImagePlugin = require('../src')

class Md2Html {
  constructor() {
    const md = new MarkdownIt({
      html: true,
      linkify: true
    })
    this.md = md.use(ImagePlugin, {
      className: 'ct-image',
      replaceLink: function(link) {
        console.log('====> link, env', link)
        return 'www.baidu.com?c=' + link
      }
    })
  }

  parse(md) {
    return this.md.render(md)
  }
}

module.exports = new Md2Html()
