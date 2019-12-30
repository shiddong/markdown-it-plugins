# markdown-it-checkbox2citadel

markdown-it 插件，便于将 checkbox 转换为学城格式

## Options

```js
{
    wrapClassName: "checkbox", // ct-task-list
    checkedClassName: "checkbox-checked-item", // ct-task-li-checked
    uncheckedClassName: "checkbox-item", // ct-task-li
    idPrefix: "checkbox-item" // _task_list_item_
}
```

## Install

```shell
yarn add markdown-it-checkbox2citadel
```

## Usage

```js
const MarkdownIt = require("markdown-it");
const Checkbox2CitadelPlugin = require("markdown-it-checkbox2citadel");

class Md2Html {
  constructor() {
    const md = new MarkdownIt({
      html: true,
      linkify: true
    });
    this.md = md.use(Checkbox2CitadelPlugin, {
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
```
