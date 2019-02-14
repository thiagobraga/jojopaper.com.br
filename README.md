# Jojo Paper

![](https://img.shields.io/badge/version-0.2.0-green.svg)

Site da [Jojo Paper](https://jojopaper.com.br) criado com [Loja Integrada](https://lojaintegrada.com.br), com diversas modificações de CSS e JavaScript.

<p align="center">
  <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/screenshot.png" width="500" />
</p>

## Instalação

``` sh
# Instala os pacotes do projeto
yarn

# Executa o build e escuta alterações em arquivos SCSS e JS
# É possível abrir https://localhost:3000 que é um proxy do site em produção.
yarn watch

# Para deploy em produção
yarn release
```

## Desenvolvimento

- https://local.jojopaper.com.br:3000

## Processo de deploy

- Gerar arquivos de produção com `yarn release`
- Copiar o conteúdo do arquivo minificado `dist/release/theme.css`
- Acessar https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar
- Sobrescrever o CSS copiado no bloco de texto e clicar em **Salvar alterações**
- Em seguida, acessar https://app.lojaintegrada.com.br/painel/configuracao/html/listar
- Clicar em **Adicionar código**
- Preencher o formulário com os valores:

  - **Descrição:** Alterações JavaScript
  - **Local publicação:** Rodapé
  - **Página publicação:** Todas as páginas
  - **Tipo:** HTML

- Em Conteúdo, incluir:
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script></script>
```

- Logo após essa linha, incluir o conteúdo do arquivo `src/js/scripts.js` no conteúdo da tag script vazia e clicar em **Salvar código HTML**
- Após esses passos, aguardar 15 minutos para as alterações entrarem em vigor.
