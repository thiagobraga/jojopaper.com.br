/**
 * Jojo Paper
 *
 * Este arquivo concentra os scripts necessários para executar
 * o site da Jojo Paper, criado sobre a Loja Integrada. Como esta
 * ferramenta não fornece muita customização na estrutura do HTML
 * do site, foi necessária a utilização de JavaScript para
 * conseguir modificar o layout como esperado.
 *
 * @author  Thiago Braga <contato@thiagobraga.org>
 */

$(function () {
  let barraTopo = $('#barraTopo');
  let acoesFlutuante = $('.acoes-flutuante');
  let delimitadorBarra = $('#delimitadorBarra');
  let cabecalhoCarrinho = $('#cabecalho .carrinho');
  let rodape = $('#rodape');
  let linkFont = $('link[href^="//fonts.googleapis.com"]');

  // Remove fontes não utilizadas
  linkFont.remove();

  // Remove alguns elementos da página que não são necessários
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

    // Cria um container para a seção do Instagram
    rodape.prepend(/*html*/`<div class="instagram"></div>`);

    // Customiza o final do rodapé com informações de direitos reservados
    bottom = rodape.children().last();
    bottom.removeAttr('style').addClass('footer-bottom');

    footerBottom = $('.footer-bottom');

    footerBottom
      .find('.span9.span12')
      .removeClass('span9 span12')
      .addClass('footer-bottom-copyright')
      .after(/*html*/`<div class="footer-bottom-text"></div>`);

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
      <a href="https://thiagobraga.org" target="_blank" rel="noreferrer noopener">
        <span>Thiago <span>Braga</span>
      </span>
    `);
  }

  /**
   * Get instagram photos with Instagram API.
   *
   * The Instagram API has a limit of 240 requests per hour. With that,
   * it was necessary to save the responses in jsonbox.io free service to serve
   * the contents within that 1 hour. LocalStorage is also used to store the
   * response in user browser, making access to the website faster.
   */
  (async () => {
    let photos;

    const JSONBOX       = 'https://jsonbox.io/box_<BOX-ID>'; // prettier-ignore
    const INSTAGRAM_API = 'https://graph.instagram.com'; // prettier-ignore
    const TOKEN         = '<YOUR-ACCESS-TOKEN>'; // prettier-ignore
    const REFRESH_TOKEN = `${INSTAGRAM_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`; // prettier-ignore
    const USER_ID       = '<YOUR-USER-ID>'; // prettier-ignore
    const fields        = 'media_url,permalink,media_type,caption'; // prettier-ignore

    // Check LocalStorage for item 'instagram-photos'
    const localPhotos = localStorage.getItem('instagram-photos');

    /**
     * Render the HTML in the site with obtained photos.
     */
    const render = (photos) => {
      let instagram = $('.instagram');
      if (instagram.length) {
        const html = /*html*/ `
          <div class="conteiner">
            <div class="row-fluid">
              <div class="span12">
                <h4 class="instagram-titulo">Instagram</h4>

                <div class="flexslider carousel">
                  <ul class="slides">
                    ${photos
                      .filter((media) => media.media_url.indexOf('video') === -1)
                      .map((item) => /*html*/ `
                        <li>
                          <a href="${item.permalink}" target="_blank" rel="noreferrer noopener">
                            <img src="${item.media_url}"
                              class="instagram-photo"
                              width="480"
                              height="480" />
                          </a>
                        </li>
                      `).join('')
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;

        instagram.html(html.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2'));

        let itemWidth, maxItems;
        let containerWidth = $('.instagram .conteiner').width();

        if (containerWidth < 768) {
          itemWidth = containerWidth - 40;
          maxItems = 1;
        } else {
          itemWidth = containerWidth / 3 - 40 * 2;
          maxItems = 3;
        }

        $('.instagram .flexslider').flexslider({
          animation:     'slide',
          animationLoop: false,
          controlNav:    false,
          itemMargin:    40,
          itemWidth:     itemWidth,
          maxItems:      maxItems,
          move:          1,
        });
      }
    };

    /**
     * Check LocalStorage for previous downloaded media.
     * Also the 'last-request' is used to compare the time.
     */
    const checkLocalStorage = () => {
      let photos;

      const currentTime = new Date().getTime();
      const lastRequest = localStorage.getItem('last-request');
      const timeCalc    = (currentTime - lastRequest) / 36e5;

      // If time expired, a new request should be made.
      // In other words, if the difference is higher than 1 hours.
      photos = timeCalc > 1 ? [] : JSON.parse(localPhotos);

      return photos;
    };

    /**
     * Make a request to the jsonbox.io service endpoint
     * to obtain the stored photos in JSON format.
     * If JSON is empty, a new request to Instagram API should be made.
     */
    const checkJsonBox = async () => {
      const { data: [ result ] } = await axios.get(JSONBOX);
      let { photos, _createdOn } = result;

      const createdOn   = new Date(_createdOn).getTime();
      const currentTime = new Date().getTime();
      const timeCalc    = (currentTime - createdOn) / 36e5;

      // If time expired, a new request should be made.
      // In other words, if the difference is higher than 1 hours.
      if (timeCalc > 1) {
        // But we need to empty the array from jsonbox.io
        await axios.post('https://jsonbox.io/box_49a3a85469bb93ab961b', { photos: [] });

        // And reset photos array, so the script will call the Instagram method.
        photos = [];
      }

      return photos;
    };

    /**
     * Refresh Instagram token after each request.
     */
    const refreshToken = async () => await axios.get(REFRESH_TOKEN);

    /**
     * Get photos from Instagram API after all tests failed.
     */
    const getInstagramPhotos = async () => {
      let photos = [];

      try {
        const currentTime = new Date().getTime();
        const { data } = await axios.get(`${INSTAGRAM_API}/${USER_ID}?fields=media&access_token=${TOKEN}`);
        const { data: response } = data.media;

        const promises = response.map(async (item) => {
          const { data } = await axios.get(`${INSTAGRAM_API}/${item.id}?fields=${fields}&access_token=${TOKEN}`); // prettier-ignore
          const { media_url, permalink } = data;
          return { media_url, permalink };
        });

        // Wait until all promises resolve.
        photos = await Promise.all(promises);

        // Save results in localStorage avoiding the limitation
        // of Instagram Graph API.
        localStorage.setItem('instagram-photos', JSON.stringify(photos));
        localStorage.setItem('last-request', currentTime);

        // Save in jsonbox.io too
        await axios.post('https://jsonbox.io/box_49a3a85469bb93ab961b', { photos });

        // Refresh token
        refreshToken();
      } catch (e) {
        console.error('Unable to retrieve photos. Reason: ' + e.toString());
      } finally {
        return photos;
      }
    };

    // If the key does not exist, the remaining steps must be checked
    // before making a new request to the Instagram API.
    if (localPhotos) photos = checkLocalStorage();
    if (!localPhotos || photos.length === 0) photos = await checkJsonBox();
    if (photos && photos.length === 0) photos = await getInstagramPhotos();

    // Finally we call the render function.
    render(photos);
  })();

  // Customiza a seção institucional
  let institucional = $('.institucional');
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
            <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/photo-patricia-bonini.png" />
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
  let pagamentoSelos = $('.pagamento-selos');
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
              <a href="mailto:contato@jojopaper.com.br" target="_blank" rel="noreferrer noopener">contato@jojopaper.com.br</a>
            </p>

            <p>
              Jojo Paper<br>
              CNPJ 31.273.425/0001-06<br>
              Bauru-SP
            </p>
          </div>

          <div class="footer-social">
            <ul>
              <li><a href="https://www.instagram.com/jojopaper/" target="_blank" rel="noreferrer noopener"><i class="fa fa-instagram"></i></a></li>
              <li><a href="https://www.facebook.com/jojopaperbr/" target="_blank" rel="noreferrer noopener"><i class="fa fa-facebook"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    `);
  }

  let descricao = $('#descricao');
  if (descricao.length) {
    descricao.detach().insertBefore('.codigo-produto');
  }

  let destaque = $('.listagem .listagem-linha');
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
        ? menuSuperior.addClass('no-height')
        : menuSuperior.removeClass('no-height');
    });
  }
});
