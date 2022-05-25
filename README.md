<h1 align="center">
  <img src="https://cdn.awsli.com.br/823/823980/favicon/711b9ffff9.png" height="128" /><br>
  <br>
  Jojo Paper
</h1>

<p align="center">
  🛍 Site da <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">Jojo Paper</a> criado com <a href="https://lojaintegrada.com.br" target="_blank" rel="nofollow noopener">Loja Integrada</a>
</p>

<p align="center">
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://img.shields.io/badge/version-1.2.0-8C64A8.svg">
  </a>
</p>

<p align="center">
  <a href="#instalacao">Instalação</a> •
  <a href="#deploy">Deploy</a>
</p>

<p align="center">
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/screenshot.png" alt="Jojo Paper" width="400">
  </a>
</p>

## Instalação

### Configurar HTTPS

- Instalar [mkcert](https://github.com/FiloSottile/mkcert)
- Executar na raiz do projeto:
  ``` sh
  mkdir -p certs && cd certs && mkcert local.jojopaper.com.br && cd -
  ```

### Realizar o build

- Ainda na raiz, executar o comando:
  ``` sh
  make
  ```
- Abrir o endereço no navegador:  
  https://local.jojopaper.com.br:3000

## Deploy

> **Nota**: caso exista pelo menos um produto no seu carrinho de compras, as alterações de CSS e JS devem ocorrer instantaneamente. Senão elas podem demorar até 15 minutos.

### CSS

- Gerar arquivos de produção com `make release`
- Copiar o conteúdo do arquivo minificado `theme.css` (remover comentários)
- Acessar <a href="https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar</a>
- Sobrescrever o CSS copiado no bloco de texto e clicar em **Salvar alterações**

### JS

- Em seguida, acessar <a href="https://app.lojaintegrada.com.br/painel/configuracao/html/listar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/configuracao/html/listar</a>
- Clicar em **Adicionar código**
- Preencher o formulário com os valores:
  - **Descrição:** JavaScript
  - **Local publicação:** Rodapé
  - **Página publicação:** Todas as páginas
  - **Tipo:** JavaScript
- Em Conteúdo, incluir o conteúdo do arquivo `src/js/scripts.js` e clicar em **Salvar código HTML** (utilizar o minificado em breve)
- Criar também outro arquivo para inserir o conteúdo do `src/js/instagram.js`.

## TODO

- [ ] Minificar arquivo JS localmente e enviar o minificado
- [ ] Seria legal utilizar a API para enviar JS, mas é necessário o plano PRO 1 pelo menos. :moneybag:

## Tools

- Loja Integrada
- Instagram API
- BrowserSync
- Axios
- Sass (Ruby · SCSS)
- Stylus extension
