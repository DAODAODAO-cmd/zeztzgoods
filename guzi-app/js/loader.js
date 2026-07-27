/* GitHub Pages loader: load editable source files before starting the original DC runtime. */
(function () {
  'use strict';
  var templateNode = document.querySelector('x-dc');
  var logicNode = document.querySelector('script[data-dc-script]');

  function loadText(url) {
    return fetch(url, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error(url + ' (' + response.status + ')');
      return response.text();
    });
  }

  function ensureGlobal(test, fallbackUrl, label) {
    if (test()) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = fallbackUrl;
      script.onload = function () {
        if (test()) resolve();
        else reject(new Error(label + ' 加载后不可用'));
      };
      script.onerror = function () { reject(new Error(label + ' 加载失败')); };
      document.head.appendChild(script);
    });
  }

  function showError(error) {
    console.error('[谷子收纳] 页面资源加载失败：', error);
    document.body.innerHTML =
      '<main style="max-width:680px;margin:48px auto;padding:24px;font-family:sans-serif;line-height:1.7">' +
      '<h1 style="font-size:22px">页面资源加载失败</h1>' +
      '<p>请确认已把 GitHub 文件夹里的全部文件一起上传，并通过 GitHub Pages 或本地 HTTP 服务打开。</p>' +
      '<pre style="white-space:pre-wrap;background:#f5f3fa;padding:12px;border-radius:10px"></pre></main>';
    var pre = document.querySelector('pre');
    if (pre) pre.textContent = error && error.message ? error.message : String(error);
  }

  Promise.all([
    loadText('./guzi-app/templates/template.html?v=20260727-cloud-ready-3'),
    loadText('./guzi-app/js/app.js?v=20260727-cloud-ready-3'),
    ensureGlobal(function () { return !!(window.supabase && window.supabase.createClient); }, 'https://unpkg.com/@supabase/supabase-js@2', 'Supabase 云端组件'),
    ensureGlobal(function () { return !!window.XLSX; }, 'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js', 'Excel 导入组件'),
    ensureGlobal(function () { return !!window.ExcelJS; }, 'https://unpkg.com/exceljs@4.4.0/dist/exceljs.min.js', 'Excel 导出组件')
  ])
    .then(function (parts) {
      templateNode.innerHTML = parts[0];
      logicNode.textContent = parts[1];
      var support = document.createElement('script');
      support.src = './guzi-app/js/support.js?v=20260727-cloud-ready-3';
      support.onerror = function () { showError(new Error('support.js 加载失败')); };
      document.head.appendChild(support);
    })
    .catch(showError);
})();
