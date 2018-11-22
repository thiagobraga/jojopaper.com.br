$(function () {

  // Remove alguns elementos da página
  $('#barraTopo').remove();
  $('#cabecalho .inferior').remove();

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
    rodape.prepend(`
      <div class="instagram"></div>
    `);
  }

  // Get Instagram photos using Async/Await
  (async () => {
    const instagramImages = [];

    try {
      const userInfoSource = await axios.get('https://www.instagram.com/jojopaper/');
      const jsonObject = userInfoSource.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1);
      const userInfo = JSON.parse(jsonObject);

      // Retrieve only the first 10 results
      const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 10);
      for (let media of mediaArray) {
        const node = media.node;

        // Process only if is an image
        if (node.__typename && node.__typename !== 'GraphImage') {
          continue;
        }

        // Push the 320x320 thumbnail in the array
        // and the link to the post.
        instagramImages.push({
          thumbnail: node.thumbnail_resources[2].src,
          shortcode: node.shortcode
        });
      }
    } catch (e) {
      console.error('Unable to retrieve photos. Reason: ' + e.toString());
    }

    let instagram = $('.instagram');
    if (instagram.length) {
      instagram.html(`
        <div class="conteiner">
          <div class="row-fluid">
            <div class="span12">
              <h4 class="instagram-titulo">Instagram</h4>

              <div class="flexslider carousel">
                <ul class="slides">
                  ${instagramImages.map(item => `
                    <li>
                      <a href="https://www.instagram.com/p/${item.shortcode}" target="_blank" rel="noreferrer noopener">
                        <img src="${item.thumbnail}" />
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `);

      $('.instagram .flexslider').flexslider({
        animation: 'slide',
        animationLoop: false,
        itemWidth: 280,
        itemMargin: 30,
        maxItems: 3,
      });
    }
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
    pagamentoSelos.next('div').remove();

    pagamentoSelos.html(`
      <div class="conteiner">
        <div class="row-fluid footer">
          <div class="span2 footer-links">
            <ul>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Dúvidas</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          <div class="span4 footer-atendimento">
            <p>
              Atendimento: <span>09:00h às 18:00h</span><br>
              (14) 98808-9051<br>
              contato@jojopaper.com.br
            </p>
          </div>

          <div class="span1 footer-social">
            <ul>
              <li><a href="#" target="_blank" rel="noreferrer noopener"><i class="fa fa-instagram"></i></a></li>
              <li><a href="#" target="_blank" rel="noreferrer noopener"><i class="fa fa-facebook"></i></a></li>
            </ul>
          </div>

          <div class="span5 footer-newsletter">
            <p>
              Quer receber novidades<br>
              e dicas por e-mail?<br>
              Coloque seu e-mail aqui :)
            </p>

            <input type="email" class="newsletter" />
          </div>
        </div>

        <div class="row-fluid footer-bottom-links">
          <div class="span12">
            <ul>
              <li><a href="#">Formas de Pagamento</a></li>
              <li><a href="#">Entrega</a></li>
              <li><a href="#">Trocas e Devoluções</a></li>
            </ul>
          </div>
        </div>
      </div>
    `);
  }

});