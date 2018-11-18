// ==UserScript==
// @name          Jojo Paper
// @description   Live reloading styles for Loja Integrada
// @author        Thiago Braga <contato@thiagobraga.org>
// @license       MIT
// @namespace     https://github.com/thiagobraga
// @homepageURL   https://github.com/thiagobraga/jojopaper.com.br
// @supportURL    https://github.com/thiagobraga/jojopaper.com.br/issues
// @include       http://thiagobraga.lojaintegrada.com.br/*
// @include       https://thiagobraga.lojaintegrada.com.br/*
// @include       http://*.thiagobraga.lojaintegrada.com.br/*
// @include       https://*.thiagobraga.lojaintegrada.com.br/*
// @run-at        document-end
// @noframes
// ==/UserScript==

$(function () {
  let secaoBanners = $('.secao-banners');
  let institucional = $('.institucional');
  let pagamentoSelos = $('.pagamento-selos');

  // Customiza a seção de banners
  if (secaoBanners.length) {
    secaoBanners.find('.conteiner').html(`
      <div class="header-background">
        <p>
          Papelaria para<br>
          planejar, organizar<br>
          decorar e inspirar
        </p>
      </div>
    `);
  }

  // Customiza a seção institucional
  if (institucional.length) {
    institucional.html(`
      <div class="conteiner">
        <div class="row-fluid">
          <div class="span3 institucional-lead">
            Sonhar<br>
            Planejar<br>
            Realizar
          </div>

          <div class="span3 institucional-photo">
            <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/src/images/photo-patricia-bonini.png" />
          </div>

          <div class="span6 institucional-text">
            "Acredito no poder dos sonhos, e da forma em que nossos hábitos se moldam para um objetivo.
            Foi com as experiências pessoais e profissionais que me fizeram criar a Jojo, todo amor e paixão
            por papelaria e pela busca por uma qualidade de vida incrível que me dediquei a este projeto,
            para ajudar a fazer nossos dias leves e produtivos."
          </div>
        </div>
      </div>
    `);
  }

  if (pagamentoSelos.length) {
    // Customiza a seção de pagamentos
    pagamentoSelos.find('.span9.selos').remove();
    pagamentoSelos.find('.row-fluid').addClass('footer').html(`
      <div class="span2 footer-links">
        <ul>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Dúvidas</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>

      <div class="span4 footer-atendimento">
        <p>
          Atendimento: 09:00h às 18:00h<br>
          (14) 98808-9051<br>
          contato@jojopaper.com.br
        </p>
      </div>

      <div class="span2 footer-social">
        <ul>
          <li><a href="#" target="_blank" rel="noreferrer noopener"><i class="fa fa-instagram"></i></a></li>
          <li><a href="#" target="_blank" rel="noreferrer noopener"><i class="fa fa-facebook"></i></a></li>
        </ul>
      </div>

      <div class="span4 footer-newsletter">
        <p>
          Quer receber novidades<br>
          e dicas por e-mail?<br>
          Coloque seu e-mail aqui :)
        </p>

        <input type="email" class="newsletter" />
      </div>
    `);

    // Adiciona linha de links no final do rodapé
    pagamentoSelos.find('.conteiner').append(`
      <div class="row-fluid footer-bottom-links">
        <div class="span12">
          <ul>
            <li><a href="#">Formas de Pagamento</a></li>
            <li><a href="#">Entrega</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
          </ul>
        </div>
      </div>
    `);

    // Remove a última div do rodapé
    pagamentoSelos.next('div').remove();
  }
});
