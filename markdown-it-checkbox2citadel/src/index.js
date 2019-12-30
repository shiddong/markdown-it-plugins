const checkboxReplace = function(md, options, Token) {
  "use strict";
  var arrayReplaceAt, createTokens, defaults, lastId, pattern, splitTextToken;
  arrayReplaceAt = md.utils.arrayReplaceAt;
  lastId = 0;

  defaults = {
    wrapClassName: "checkbox", // ct-task-list
    checkedClassName: "checkbox-checked-item", // ct-task-li-checked
    uncheckedClassName: "checkbox-item", // ct-task-li
    idPrefix: "checkbox-item" // _task_list_item_
  };

  options = Object.assign({}, defaults, options);
  pattern = /\[(X|\s|\_|\-)\]\s(.*)/i;
  createTokens = function(checked, label, Token) {
    var id, nodes, token;
    nodes = [];

    /**
     * <ul class="checkbox">
     */
    token = new Token("checkbox_open", "ul", 1);
    token.attrs = [["class", options.wrapClassName]];
    nodes.push(token);

    /**
     * <input type="checkbox" id="checkbox{n}" checked="true">
     */
    id = options.idPrefix + lastId;
    lastId += 1;
    token = new Token("checkbox_item", "li", 0);
    token.attrs = [
      ["data-type", "task-item"],
      ["id", id]
    ];
    if (checked === true) {
      token.attrs.push(["class", options.checkedClassName]);
    } else {
      token.attrs.push(["class", options.uncheckedClassName]);
    }
    nodes.push(token);

    /**
     * content of label tag
     */
    token = new Token("text", "", 0);
    token.content = label;
    nodes.push(token);

    /**
     * closing tags
     */
    nodes.push(new Token("checkbox_item_close", "li", -1));
    nodes.push(new Token("checkbox_close", "ul", -1));
    return nodes;
  };
  splitTextToken = function(original, Token) {
    var checked, label, matches, text, value;
    text = original.content;
    matches = text.match(pattern);
    if (matches === null) {
      return original;
    }
    checked = false;
    value = matches[1];
    label = matches[2];
    if (value === "X" || value === "x") {
      checked = true;
    }
    return createTokens(checked, label, Token);
  };
  return function(state) {
    var blockTokens, i, j, l, token, tokens;
    blockTokens = state.tokens;
    j = 0;
    l = blockTokens.length;
    while (j < l) {
      if (blockTokens[j].type !== "inline") {
        j++;
        continue;
      }
      tokens = blockTokens[j].children;
      i = tokens.length - 1;
      while (i >= 0) {
        token = tokens[i];
        blockTokens[j].children = tokens = arrayReplaceAt(
          tokens,
          i,
          splitTextToken(token, state.Token)
        );
        i--;
      }
      j++;
    }
  };
};

/*global module */
module.exports = function(md, options) {
  "use strict";
  md.core.ruler.push("checkbox", checkboxReplace(md, options));
};
