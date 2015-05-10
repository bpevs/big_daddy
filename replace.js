var elements = (document.getElementsByTagName("*"));

for(var i = 0; i < elements.length; i++){
  replaceNode(elements[i]);
}

function replaceNode(element) {
  var textNodes = [], stack = [element], c;
  while(c = stack.pop()) {
      for(var i = 0; i < c.childNodes.length; i++) {
          var n = c.childNodes[i];
          if(n.nodeType === 1) {
              stack.push(n);
          } else if(n.nodeType === 3) {
              textNodes.push(n);
          }
      }
  }

  for(var j = 0; j < textNodes.length; j++) {
    textNodes[j].parentNode.replaceChild(
      document.createTextNode(
        textNodes[j].nodeValue.replace(/data/g, 'daddy').replace(/Data/g, 'Daddy')
      ), textNodes[j]
    );
  }
}
