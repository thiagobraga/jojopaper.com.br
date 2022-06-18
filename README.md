<h1 align="center">
  <img src="https://cdn.awsli.com.br/823/823980/favicon/711b9ffff9.png" height="128" /><br>
  <br>
  Jojo Paper
</h1>

<p align="center">
  🛍 Loja virtual da <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener"><b>Jojo Paper</b></a><br>
  🛒 Criado com <a href="https://lojaintegrada.com.br" target="_blank" rel="nofollow noopener">Loja Integrada</a><br>
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://img.shields.io/badge/version-1.3.0-8C64A8.svg">
  </a>
</p>

<br>

<p align="center">
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/screenshot.png" alt="Jojo Paper" width="400">
  </a>
</p>

<br>

## Instalação

<br>

### Configurar HTTPS

- Instalar [mkcert](https://github.com/FiloSottile/mkcert)
- Executar na raiz do projeto:
  ```sh
  mkdir -p certs \
    && cd certs \
    && mkcert local.jojopaper.com.br \
    && cd -
  ```
- Inserir o domínio no `/etc/hosts`
  > No Windows, `C:\Windows\System32\drivers\etc\hosts`
  ```
  127.0.0.1  local.jojopaper.com.br
  ```

<br>

### Iniciar o desenvolvimento

- Ainda na raiz, executar o comando:
  ``` sh
  make
  ```
- Abrir o endereço no navegador:  
  https://local.jojopaper.com.br:3000

<br>

## Deploy

> **Nota**: caso exista pelo menos um produto no seu carrinho de compras, as alterações de CSS e JS devem ocorrer instantaneamente. Senão elas podem demorar até 15 minutos.

### CSS

- Gerar arquivos de produção com `make release`
- Copiar o conteúdo do arquivo minificado `theme.css` (remover comentários)
- Acessar <a href="https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar</a>
- Sobrescrever o CSS copiado no bloco de texto e clicar em **Salvar alterações**

### JS

- Minificar os arquivos `src/js/scripts.js` e `src/js/instagram.js`
  - Recomendo https://www.digitalocean.com/community/tools/minify
- Em seguida, acessar <a href="https://app.lojaintegrada.com.br/painel/configuracao/html/listar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/configuracao/html/listar</a>
- Clicar em **Adicionar código**
- Preencher o formulário com os valores:
  - **Descrição:** JavaScript
  - **Local publicação:** Rodapé
  - **Página publicação:** Todas as páginas
  - **Tipo:** JavaScript
- Em Conteúdo, incluir o conteúdo do arquivo minificado gerado no primeiro passo e clicar em **Salvar código HTML**

## TODO

- [ ] Minificar arquivo JS localmente e enviar o minificado
- [ ] Seria legal utilizar a API para enviar JS, mas é necessário o plano PRO 1 pelo menos. :moneybag:
- [ ] Remover versão `v=4.7.0` das chamadas ao FontAwesome no `theme.css`

## Tools

- [Loja Integrada](https://lojaintegrada.com.br)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [BrowserSync](https://browsersync.io)
- [Axios](https://axios-http.com/ptbr)
- [Sass (Ruby · SCSS)](https://sass-lang.com/ruby-sass)
- [Stylus extension](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
