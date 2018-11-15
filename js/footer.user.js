// ==UserScript==
// @name          Loja Integrada | Thiago Braga
// @description   Live reloading styles for Loja Integrada
// @version       0.0.1
// @author        Thiago Braga <contato@thiagobraga.org>
// @license       MIT
// @namespace     https://github.com/thiagobraga
// @homepageURL   https://github.com/thiagobraga/loja-integrada-boilerplate
// @supportURL    https://github.com/thiagobraga/loja-integrada-boilerplate/issues
// @updateURL     file:///home/thiago/projetos/thiago/loja-integrada-userstyles/js/footer.user.js
// @downloadURL   file:///home/thiago/projetos/thiago/loja-integrada-userstyles/js/footer.user.js
// @run-at        document-end
// @include       http://thiagobraga.lojaintegrada.com.br/*
// @include       https://thiagobraga.lojaintegrada.com.br/*
// @include       http://*.thiagobraga.lojaintegrada.com.br/*
// @include       https://*.thiagobraga.lojaintegrada.com.br/*
// ==/UserScript==

$(function () {
  let institucional = $('.institucional');
  if (institucional.length) {
    institucional
      .html(`
        <div class="conteiner">
          <div class="row-fluid">
            <div class="span3 institucional-lead">
              Sonhar<br>
              Planejar<br>
              Realizar
            </div>

            <div class="span3 institucional-photo">
              <img src="https://raw.githubusercontent.com/thiagobraga/jojopaper.com.br/master/images/photo-patricia-bonini.png" />
            </div>

            <div class="span6 institucional-text">
              Acredito no poder dos sonhos, e da forma em que nossos hábitos se moldam para um objetivo.
              Foi com as experiências pessoais e profissionais que me fizeram criar a Jojo, todo amor e paixão
              por papelaria e pela busca por uma qualidade de vida incrível que me dediquei a este projeto,
              para ajudar a fazer nossos dias leves e produtivos.
            </div>
          </div>
        </div>
      `)
  }
});
