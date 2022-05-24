// Not built for Safari, but add Webkit alias for Orion support
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// Title
document.title = handleText(document.title);

// Document Body
daddify(document.body);

// Post-render Mutations
const observer = new MutationObserver((mutations, observer) => {
  mutations.forEach(({ target }) => daddify(target));
});

observer.observe(document.documentElement, { childList: true, subtree: true });

function daddify(node) {
  Array.from(node.getElementsByTagName("*"))
    .forEach((element) => {
      const textNodes = [];
      const stack = [element];
      let topEl;

      while (topEl = stack.pop()) {
        topEl.childNodes.forEach((node) => {
          const { nodeType } = node;
          if (node.nodeType === 1) stack.push(node);
          else if (nodeType === 3) textNodes.push(node);
        });
      }

      textNodes.forEach((node) => {
        const { parentNode, nodeValue } = node;
        if (shouldReplace(parentNode, nodeValue)) {
          const nextText = handleText(nodeValue);
          parentNode.replaceChild(document.createTextNode(nextText), node);
        }
      });
    });
}

function handleText(text) {
  return text.replace(/data/g, "daddy").replace(/Data/g, "Daddy");
}

function shouldReplace(parent, nodeValue) {
  if (/input|textarea|script|style/i.test(parent.tagName)) return false;
  return /data/gi.test(nodeValue);
}
