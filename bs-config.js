module.exports = {
  proxy: 'https://jojo-paper.lojaintegrada.com.br',
  reloadDebounce: 200,
  logSnippet: false,
  ghostMode: false,
  notify: false,
  open: false,
  port: 3000,
  ui: false,
  files: 'src/js/*.js',
  serveStatic: ['src/js'],
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function () {
        return `
          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script src="/scripts.js"></script>
          <script async src="/browser-sync/browser-sync-client.js?v=2.24.7"></script>
        `;
      }
    }
  }
};
