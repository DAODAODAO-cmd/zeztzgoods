/* Mobile viewport + cross-device line-icon normalization; isolated from app data/state. */
(function () {
  var root = document.documentElement;
  var updateViewport = function () {
    var height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    root.style.setProperty('--ui-vvh', Math.max(1, height) + 'px');
  };
  updateViewport();
  window.addEventListener('resize', updateViewport, { passive: true });
  window.addEventListener('orientationchange', updateViewport, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateViewport, { passive: true });
    window.visualViewport.addEventListener('scroll', updateViewport, { passive: true });
  }

  var paths = {
    '＋':'M12 5v14M5 12h14','⚙':'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0-5v2m0 13v2M3.5 12h2m13 0h2M6 6l1.5 1.5m9 9L18 18M18 6l-1.5 1.5m-9 9L6 18',
    '📦':'M3 8.5 12 4l9 4.5v7L12 20l-9-4.5zM3 8.5 12 13l9-4.5M12 13v7','🗂':'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    '🆕':'M12 5v14M5 12h14M4 4h16v16H4z','⚠':'M12 4 3.5 19h17zM12 9v4m0 3h.01','⬆':'M12 19V6m-5 5 5-5 5 5','⬇':'M12 5v13m-5-5 5 5 5-5',
    '📑':'M6 3h9l4 4v14H6zM15 3v5h4M9 12h6m-6 4h6','💴':'M4 7h16v10H4zM8 10h8m-8 4h8','🏷':'M4 5h7l9 9-6 6-9-9zM8 9h.01','🔗':'M9 15l6-6m-8.5 9.5-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0m5-1a3.5 3.5 0 0 1 5 0 3.5 3.5 0 0 1 0 5l-4 4a3.5 3.5 0 0 1-5 0',
    '🏡':'M3 11.5 12 4l9 7.5M5.5 10v9h4.5v-6h4v6h4.5v-9','☁':'M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.5a3.5 3.5 0 0 1 .5 8.5z','💸':'M5 17 10 12l3 3 6-8M14 7h5v5',
    '⌂':'M3 11.5 12 4l9 7.5M5.5 10v9h4.5v-6h4v6h4.5v-9','▧':'M3 4h18v16H3zM8 4v16M3 10h5','◎':'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z','▤':'M3 4h18v16H3zM3 9h18M9 9v11',
    '▾':'m7 9 5 5 5-5','▸':'m9 7 5 5-5 5','▼':'m7 9 5 5 5-5','▲':'m7 15 5-5 5 5','↑':'M12 19V5m-5 5 5-5 5 5','↓':'M12 5v14m-5-5 5 5 5-5','↕':'M12 4v16m-4-12 4-4 4 4m-8 8 4 4 4-4','›':'m9 6 6 6-6 6','←':'M19 12H5m6-6-6 6 6 6','✕':'M6 6l12 12M18 6 6 18','×':'M6 6l12 12M18 6 6 18','⋮':'M12 5h.01M12 12h.01M12 19h.01',
    '★':'m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z','✓':'m5 12 4 4L19 6','✅':'m5 12 4 4L19 6','⏳':'M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9','🎉':'m6 18 4-12 8 8zM14 4l1-2m3 5 2-1m-1 5h3',
    '🔴':'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14','🟠':'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14','🟡':'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14','🔵':'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14','🟢':'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14','✿':'M12 8c-1-5-6-4-5 0-5-1-5 4 0 5-1 5 4 6 5 1 5 5 0 5 1 5 6 4 5-1 5 1 5-4 0-5 1-5-4-6-5-1z'
  };
  var tokenPattern = /^(\s*)(＋|⚙|📦|🗂|🆕|⚠️?|⬆|⬇|📑|💴|🏷️?|🔗|🏡|☁️?|💸|⌂|▧|◎|▤|▾|▸|▼|▲|↑|↓|↕|←|✕|×|⋮|★|✓|✅|⏳|🎉|🔴|🟠|🟡|🔵|🟢|✿)(\s*)/u;
  var endPattern = /(\s*)(›|▾|▼|▲|✓)$/u;
  var makeIcon = function (token) {
    token = token.replace('\uFE0F', '');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ui-line-icon'); svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', paths[token] || paths['✓']); svg.appendChild(path); return svg;
  };
  var normalizeIcons = function () {
    var app = document.querySelector('.ui-app'); if (!app) return;
    var walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT); var nodes = [], node;
    while ((node = walker.nextNode())) if (node.nodeValue && !node.parentElement.closest('script,style,svg,textarea,option')) nodes.push(node);
    nodes.forEach(function (textNode) {
      var value = textNode.nodeValue, start = value.match(tokenPattern), end = !start && value.match(endPattern); if (!start && !end) return;
      var fragment = document.createDocumentFragment();
      if (start) { if (start[1]) fragment.appendChild(document.createTextNode(start[1])); fragment.appendChild(makeIcon(start[2])); fragment.appendChild(document.createTextNode(start[3] + value.slice(start[0].length))); }
      else { fragment.appendChild(document.createTextNode(value.slice(0, value.length - end[0].length) + end[1])); fragment.appendChild(makeIcon(end[2])); }
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  };
  var queued = false, queueNormalize = function () { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; normalizeIcons(); }); };
  document.addEventListener('DOMContentLoaded', queueNormalize);
  new MutationObserver(queueNormalize).observe(document.body, { childList: true, subtree: true });
  queueNormalize();
})();
