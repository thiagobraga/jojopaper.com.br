module.exports = {
  proxy: 'https://thiagobraga.lojaintegrada.com.br',
  host: 'local.jojopaper.com.br',
  https: {
    key: './certs/local.jojopaper.com.br-key.pem',
    cert: './certs/local.jojopaper.com.br.pem'
  },
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
          <script src="/scripts.js"></script>
          <script async src="/browser-sync/browser-sync-client.js?v=2.26.3"></script>
        `;
      }
    }
  }
};
