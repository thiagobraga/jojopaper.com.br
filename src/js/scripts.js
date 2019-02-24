$(function () {
  // Remove alguns elementos da página que não são necessários
  $('#barraTopo').remove();
  $('#delimitadorBarra').remove();

  // Cancelando bloqueio de contextmenu em imagens
  $('body').off('contextmenu', 'img');

  // Customiza a seção de banners
  let secaoBanners = $('.secao-banners');
  if (secaoBanners.length) {
    secaoBanners.html(`
      <div class="header-background">
        <div class="conteiner">
          <p>
            Papelaria para<br>
            planejar, organizar<br>
            decorar e inspirar
          </p>
        </div>
      </div>
    `);
  }

  let rodape = $('#rodape');
  if (rodape.length) {
    let bottom, footerBottom, footerBottomText, footerLogoContainer;

    // Cria um container para a seção do Instagram
    rodape.prepend(`
      <div class="instagram"></div>
    `);

    // Customiza o final do rodapé com informações de direitos reservados
    bottom = rodape.children().last();
    bottom.removeAttr('style').addClass('footer-bottom');

    footerBottom = $('.footer-bottom');

    footerBottom.find('.span9.span12')
      .removeClass('span9 span12')
      .addClass('footer-bottom-copyright')
      .after('<div class="footer-bottom-text"></div>');

    footerBottomText = $('.footer-bottom-text');
    footerBottomText.next('div')
      .removeAttr('style')
      .addClass('footer-logo-container');

    footerBottom.find('img')
      .removeAttr('style')
      .addClass('logo-loja-integrada');

    footerBottomText = $('.footer-bottom-text');

    footerBottomText.append(`
      Desenvolvido por
      <a href="http://thiagobraga.org" target="_blank" rel="noreferrer noopener">
        <span>Thiago <span>Braga</span>
      </span>
    `);

    footerLogoContainer = $('.footer-logo-container');
    footerLogoContainer.prepend(`Criado com`);
  }

  // Get Instagram photos using Async/Await
  (async () => {
    const instagramImages = [],
      token = '2310460119.b6b2f43.41f8dfdace95418abb9cba109ffa2e28',
      userID = '2310460119',
      apiURL = 'https://api.instagram.com/v1/users/self/media/recent';

    try {
      const userInfoSource = await axios.get(apiURL + '?access_token=' + token);
      console.log(userInfoSource);

  //     // Retrieve only the first 10 results
  //     const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 10);
  //     for (let media of mediaArray) {
  //       const node = media.node;

  //       // Process only if is an image
  //       if (node.__typename && node.__typename !== 'GraphImage') {
  //         continue;
  //       }

  //       // Push the 480x480 thumbnail in the array
  //       // and the link to the post.
  //       instagramImages.push({
  //         thumbnail: node.thumbnail_resources[3].src,
  //         shortcode: node.shortcode
  //       });
  //     }
    } catch (e) {
      console.error('Unable to retrieve photos. Reason: ' + e.toString());
    }

  //   let instagram = $('.instagram');
  //   if (instagram.length) {
  //     instagram.html(`
  //       <div class="conteiner">
  //         <div class="row-fluid">
  //           <div class="span12">
  //             <h4 class="instagram-titulo">Instagram</h4>

  //             <div class="flexslider carousel">
  //               <ul class="slides">
  //                 ${instagramImages.map(item => `
  //                   <li>
  //                     <a href="https://www.instagram.com/p/${item.shortcode}" target="_blank" rel="noreferrer noopener">
  //                       <img class="instagram-photo" src="${item.thumbnail}" width="480" height="480" />
  //                     </a>
  //                   </li>
  //                 `).join('')}
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `);

  //     $('.instagram .flexslider').flexslider({
  //       animation: 'slide',
  //       animationLoop: false,
  //       controlNav: false,
  //       itemWidth: 280,
  //       maxItems: 3,
  //     });


  //   //   var o = Number($(this).data("produtos-linha"));
  //   //   if (window.innerWidth < 770) {
  //   //     o = 1
  //   //   }
  //   //   var n = $(this).width() / o - 10;
  //   //   $(this).find(".listagem-linha").flexslider({
  //   //     animation: "slide",
  //   //     slideshow: false,
  //   //     selector: "ul > li",
  //   //     animationLoop: true,
  //   //     controlNav: false,
  //   //     smoothHeight: false,
  //   //     useCSS: false,
  //   //     touch: false,
  //   //     prevText: "",
  //   //     nextText: "",
  //   //     itemWidth: n,
  //   //     itemMargin: 0,
  //   //     minItems: 1,
  //   //     maxItems: o,
  //   //     start: function (p) {
  //   //       if (p.pagingCount === 1) {
  //   //         p.directionNav.hide()
  //   //       }
  //   //     }
  //   //   })
    // }
  })();

  // Customiza a seção institucional
  let institucional = $('.institucional');
  if (institucional.length) {
    institucional.html(`
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
    pagamentoSelos.html(`
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

  $('.acoes-flutuante').remove();

  let destaque = $('.listagem .listagem-linha');
  if (destaque.length) {
    destaque.find('.acoes-produto')
      .removeClass('hidden-phone')
      .find('a')
      .html('Quero');
  }

  // Categoria
  $('.pagina-categoria .secao-principal')
    .find('.coluna').addClass('hide').end()
    .find('.conteudo').removeClass('span9').addClass('span12');


});
