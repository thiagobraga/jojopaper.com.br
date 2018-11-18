module.exports = {
  proxy: 'https://thiagobraga.lojaintegrada.com.br',
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
      fn: function (snippet) {
        return `
          <script src="/footer.user.js"></script>
          ${snippet}
        `;
      }
    }
  }
};
