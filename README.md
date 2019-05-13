<p align="center">
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/screenshot.png" alt="Jojo Paper" width="400">
  </a>
</p>

<h1 align="center">Jojo Paper</h1>

<p align="center">
  🛍 Site da <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">Jojo Paper</a> criado com <a href="https://lojaintegrada.com.br" target="_blank" rel="nofollow noopener">Loja Integrada</a>
</p>

<p align="center">
  <a href="https://jojopaper.com.br" target="_blank" rel="nofollow noopener">
    <img src="https://img.shields.io/badge/version-0.3.6-pink.svg" alt="Version 0.3.6">
  </a>
  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=thibraga06%40gmail.com&item_name=Contribuir+para+o+desenvolvimento+de+projetos+open+source&currency_code=BRL&source=url" target="_blank" rel="nofollow noopener">
    <img src="https://img.shields.io/badge/donate-PayPal-green.svg">
  </a>
</p>

<p align="center">
  <a href="#instalacao">Instalação</a> •
  <a href="#deploy">Deploy</a>
</p>

## Instalação

- Executar os comandos:
``` sh
make install
make
```
- Abrir o endereço no navegador:  
  https://local.jojopaper.com.br:3000

## Deploy

- Gerar arquivos de produção com `make release`
- Copiar o conteúdo do arquivo minificado `dist/release/theme.css`
- Acessar <a href="https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar</a>
- Sobrescrever o CSS copiado no bloco de texto e clicar em **Salvar alterações**
- Em seguida, acessar <a href="https://app.lojaintegrada.com.br/painel/configuracao/html/listar" target="_blank" rel="nofollow noopener">https://app.lojaintegrada.com.br/painel/configuracao/html/listar</a>
- Clicar em **Adicionar código**
- Preencher o formulário com os valores:
  - **Descrição:** Alterações JavaScript
  - **Local publicação:** Rodapé
  - **Página publicação:** Todas as páginas
  - **Tipo:** JavaScript
- Em Conteúdo, incluir o conteúdo do arquivo `src/js/scripts.js` e clicar em **Salvar código HTML**
- Após esses passos, aguardar 15 minutos para as alterações entrarem em vigor.

## TODO

- [ ] Utilizar a API da Loja Integrada para realizar upload de alterações de CSS, JS e HTML.
