const MarkdownIt = require("markdown-it");
const CheckboxPlugin = require("../src");

class Md2Html {
  constructor() {
    const md = new MarkdownIt({
      html: true,
      linkify: true
    });
    this.md = md.use(CheckboxPlugin, {
      wrapClassName: "ct-task-list",
      checkedClassName: "ct-task-li-checked",
      uncheckedClassName: "ct-task-li",
      idPrefix: "_task_list_item_"
    });
  }

  parse(md) {
    return this.md.render(md);
  }
}

module.exports = new Md2Html();
