# Jojo Paper

Site da Jojo Paper criado com o Loja Integrada, com diversas modificações de CSS
e JavaScript.

## Instalação

``` sh
yarn

# Para desenvolviment
yarn watch

# Para produção
yarn release
```

## Processo de deploy

- Gerar arquivos de produção com `yarn release`
- Copiar o conteúdo do arquivo `dist/release/theme.css`
- Acessar https://app.lojaintegrada.com.br/painel/plataforma/conta/tema/css/editar
- Sobrescrever o CSS copiado no bloco de texto
- Clicar em "Salvar alterações" e aguardar 15 minutos
