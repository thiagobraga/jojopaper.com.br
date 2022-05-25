/* eslint-disable no-empty-pattern */
/**
 * Jojo Paper
 *
 * This file contains the scripts needed to run the Jojo Paper website,
 * built on the Loja Integrada e-commerce platform. As this tool does
 * not provide much customization in the site's HTML structure, it was
 * necessary to use JavaScript to be able to modify the layout as expected.
 *
 * @author  Thiago Braga <thi@thiagobraga.dev>
 */
(async () => {
  const acoesFlutuante = $('.acoes-flutuante');
  const barraTopo = $('#barraTopo');
  const cabecalho = $('#cabecalho');
  const cabecalhoCarrinho = cabecalho.find('.carrinho');
  const delimitadorBarra = $('#delimitadorBarra');
  const descricao = $('#descricao');
  const destaque = $('.listagem .listagem-linha');
  const images = $('img[alt^="jojo banner"]');
  const institucional = $('.institucional');
  const linkFont = $('link[href^="//fonts.googleapis.com"]');
  const pagamentoSelos = $('.pagamento-selos');
  const rodape = $('#rodape');

  /**
   * Verifica se já foi carregado o banner, para alterar as dimensões,
   * pois a Loja Integrada carrega a imagem em 1140x1140, distorcendo
   * a imagem. Esta alteração obtém as fotos em 1425x1000 como exportado.
   */
  images.each(({ }, img) => img.src = img.src.replace('1140x1140', '1920x1347'));

  /**
   * Remove fontes e alguns elementos da página que não são necessários
   */
  linkFont.remove();
  barraTopo.remove();
  acoesFlutuante.remove();
  delimitadorBarra.remove();

  // Desfaz o bloqueio de contextmenu em imagens
  $('body').off('contextmenu', 'img');

  // Insere ícone de login na navbar
  cabecalhoCarrinho.prepend(/*html*/ `
    <a class="user-login" href="/conta/index">
      <i class="icon-user fundo-principal"></i>
      <span>
        <b class="titulo cor-secundaria"><span>Minha Conta</span></b>
        <span class="cor-secundaria">Produto adicionado</span>
      </span>
      <span class="titulo cor-secundaria vazio-text">Carrinho vazio</span>
    </a>
  `);

  // Cria o rodapé do site
  if (rodape.length) {
    let bottom, footerBottom, footerBottomText;

    // Customiza o final do rodapé com informações de direitos reservados
    bottom = rodape.children().last();
    bottom.removeAttr('style').addClass('footer-bottom');

    footerBottom = $('.footer-bottom');
    footerBottom
      .find('.span9.span12')
      .removeClass('span9 span12')
      .addClass('footer-bottom-copyright')
      .after(/*html*/ `<div class="footer-bottom-text"></div>`);

    footerBottomText = $('.footer-bottom-text');
    footerBottomText
      .next('div')
      .removeAttr('style')
      .addClass('footer-logo-container');

    footerBottom
      .find('img')
      .removeAttr('style')
      .addClass('logo-loja-integrada');

    footerBottomText = $('.footer-bottom-text');

    footerBottomText.append(/*html*/ `
      Desenvolvido por
      <a href="https://thiagobraga.dev" target="_blank" rel="noreferrer noopener">
        <span>Thiago <span>Braga</span>
      </span>
    `);
  }

  // Customiza a seção institucional
  if (institucional.length) {
    institucional.html(/*html*/ `
      <div class="conteiner">
        <div class="row-fluid">
          <div class="institucional-lead">
            Sonhar<br>
            Planejar<br>
            Realizar
          </div>

          <div class="institucional-photo">
            <img src="https://cdn.awsli.com.br/843/843617/arquivos/patricia-bonini-web.png" />
          </div>

          <div class="institucional-text">
            "Acredito no poder dos sonhos, e da forma em que nossos hábitos se moldam para um objetivo.
            Foi com as experiências pessoais e profissionais que me fizeram criar a Jojo, todo amor e paixão
            por papelaria e pela busca por uma qualidade de vida incrível que me dediquei a este projeto,
            para ajudar a fazer nossos dias leves e produtivos."
          </div>
        </div>
      </div>
    `);
  }

  // Customiza a seção de pagamentos
  if (pagamentoSelos.length) {
    pagamentoSelos.html(/*html*/ `
      <div class="conteiner">
        <div class="footer">
          <div class="footer-links">
            <ul>
              <li><a href="/pagina/sobre.html">Sobre</a></li>
              <li><a href="/pagina/pagamento-e-envio.html">Pagamento e Envio</a></li>
              <li><a href="/pagina/duvidas-e-trocas.html">Dúvidas e Trocas</a></li>
              <li><a href="#modalContato" data-toggle="modal" data-target="#modalContato">Contato</a></li>
            </ul>
          </div>

          <div class="footer-atendimento">
            <p>
              Atendimento: <span>09:00h às 18:00h</span><br>
              (14) 98808-9051<br>
              <a href="mailto:jojopaperbr@gmail.com" target="_blank" rel="noreferrer noopener">jojopaperbr@gmail.com</a>
            </p>

            <p>
              Jojo Paper<br>
              CNPJ 31.273.425/0001-06<br>
              Bauru-SP
            </p>
          </div>

          <div class="footer-social">
            <ul>
              <li><a href="https://www.instagram.com/jojopaper/" target="_blank" rel="noreferrer noopener"><i class="fa fa-instagram"></i> <span>/ jojopaper</span></a></li>
              <li><a href="https://www.facebook.com/jojopaperbr/" target="_blank" rel="noreferrer noopener"><i class="fa fa-facebook"></i> <span>/ jojopaperbr</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    `);
  }

  if (descricao.length) {
    descricao.detach().insertBefore('.codigo-produto');
  }

  if (destaque.length) {
    destaque
      .find('.acoes-produto')
      .removeClass('hidden-phone')
      .find('a')
      .html('Quero');
  }

  // Categoria
  $('.pagina-categoria .secao-principal')
    .find('.conteudo')
    .removeClass('span9')
    .addClass('span12')
    .find('.coluna')
    .addClass('hide')
    .end();

  // Move o botão de menu para mobile dentro da barra principal
  if (window.innerWidth < 768) {
    let menu = $('.atalho-menu');
    let menuSuperior = $('.menu.superior');
    let nivelUm = menuSuperior.children('.nivel-um');

    menuSuperior.addClass('no-height');

    $('.atalhos-mobile ul')
      .append('<li></li>')
      .find('li:last-child')
      .append(menu.detach());

    nivelUm.append(/*html*/ `
      <li class="divider"></li>
      <li class="borda-principal"><a href="/conta/index"><strong class="titulo cor-secundaria">Login</strong></a></li>
      <li class="borda-principal"><a href="/carrinho/index"><strong class="titulo cor-secundaria">Carrinho</strong></a></li>
    `);

    menu.on('click', () => {
      nivelUm.attr('class').indexOf('active') === -1
        ? menuSuperior.removeClass('no-height')
        : menuSuperior.addClass('no-height');
    });
  }
})();
