/**
 * Get instagram photos with Instagram API.
 *
 * The Instagram API has a limit of 240 requests per hour. With that,
 * it was necessary to save the responses in JSONbin.io free service to serve
 * the contents within that 1 hour. LocalStorage is also used to store the
 * response in user browser, making access to the website faster.
 */
(async () => {
  let photos = [];
  const axios = window.axios;
  const fields = 'media_url,permalink,media_type,caption';
  const lastRequest = localStorage.getItem('last-request');
  const localPhotos = localStorage.getItem('instagram-photos');
  const localCreatedAt = localStorage.getItem('jsonbin-created-at');
  const INSTAGRAM_TOKEN = '<INSTAGRAM_TOKEN>';
  const INSTAGRAM_USER_ID = 'me';
  const INSTAGRAM_GRAPH_API = 'https://graph.instagram.com';
  const JSONBIN_API = 'https://api.jsonbin.io/v3/b';
  const JSONBIN_ID = '<JSONBIN_ID>';
  const JSONBIN_TOKEN = '<JSONBIN_TOKEN>';

  /**
   * Compares now in UNIX format with the date passed by parameter,
   * to validate if the difference is less than a specific period.
   * @param {int} time The time reference to compare.
   * @param {int} period Default 1 for one hour.
   * @returns {bool} True/false depending if difference is lower/higher than period in hours.
   */
  const isValidTime = (time, period = 1) => (new Date().getTime() - time) / 360000 <= period;

  /**
   * Check LocalStorage for previous downloaded media.
   *
   * Also the 'last-request' is used to compare the time.
   * If time expired, a new request should be made.
   * In other words, if the difference is higher than 1 hours.
   *
   * @param {string} photos The photos from LocalStorage.
   * @param {string} lastRequest Time of the last request on Instagram API.
   * @return {array} Parsed photos or an empty array.
   */
  const parseStorage = (photos, lastRequest) => isValidTime(lastRequest) ? JSON.parse(photos) : [];

  /**
   * Update photos in LocalStorage from last Instagram API request
   * @param {object} photos Instagram photos from API
   */
  const updateStorage = (photos) => {
    const currentTime = new Date().getTime();
    localStorage.setItem('instagram-photos', JSON.stringify(photos));
    localStorage.setItem('last-request', currentTime);
  };

  /**
   * Get photos in JSON format store at JSONbin.io
   * @returns Promise
   */
  const getJsonBin = async () => await axios.get(`${JSONBIN_API}/${JSONBIN_ID}`, {
    headers: {
      'X-Master-Key': JSONBIN_TOKEN,
      'X-Access-Key': JSONBIN_TOKEN
    }
  });

  /**
   * Stores JSON of photos from API in JSONbin.io to avoid API interruption.
   * @returns Promise
   */
  const storeJsonBin = async (photos) => await axios.put(`${JSONBIN_API}/${JSONBIN_ID}`, photos, {
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': JSONBIN_TOKEN
    }
  });

  /**
   * Wrapper for Instagram Graph API requests.
   * @param {string} url
   * @returns Promise
   */
  const getInstagram = async (url) => await axios.get(`${INSTAGRAM_GRAPH_API}/${url}&access_token=${INSTAGRAM_TOKEN}`);

  /**
   * Refresh Instagram token after each request to user endpoint.
   * @returns Promise
   */
  const refreshToken = async () => await axios.get(`${INSTAGRAM_GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_TOKEN}`);

  /**
   * Get photos from Instagram API
   * @returns {array} Photos from Instagram API
   */
  const getInstagramPhotos = async () => {
    let photos = [];

    try {
      const { data: { media: { data } } } = await getInstagram(`${INSTAGRAM_USER_ID}?fields=media`);

      const promises = data.map(async (item) => {
        const { data: { media_url, permalink } } = await getInstagram(`${item.id}?fields=${fields}`);
        return { media_url, permalink };
      });

      // Wait until all promises resolve.
      photos = await Promise.all(promises);

      // Save results in localStorage avoiding the limitation
      // of Instagram Graph API.
      updateStorage(photos);

      // Refresh Instagram token after the requests.
      refreshToken();
    } catch (e) {
      console.error('Unable to retrieve photos. Reason: ' + e.toString());
    }

    return photos;
  };

  /**
   * Render the HTML in the site with obtained photos.
   * @param {array} photos The photos that will be rendered on screen
   */
  const render = (photos) => {
    // Cria um container para a seção do Instagram
    $('#rodape').prepend(/*html*/ `<div class="instagram"></div>`);

    const html = /*html*/ `
      <div class="conteiner">
        <div class="row-fluid">
          <div class="span12">
            <h4 class="instagram-titulo">Instagram</h4>
            <p>@jojopaper</p>

            <div class="flexslider carousel">
              <ul class="slides">
                ${photos.filter((media) => media.media_url.indexOf('video') === -1).map((item) => /*html*/ `
                  <li>
                    <a href="${item.permalink}" target="_blank" rel="noreferrer noopener">
                      <img src="${item.media_url}"
                        class="instagram-photo"
                        width="480"
                        height="480" />
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    $('.instagram').html(html.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2'));

    let itemWidth, maxItems;
    let containerWidth = $('.instagram .conteiner').width();

    containerWidth < 768
      ? (itemWidth = containerWidth - 40, maxItems = 1)
      : (itemWidth = containerWidth / 3 - 40 * 2, maxItems = 3);

    $('.instagram .flexslider').flexslider({
      animation: 'slide',
      animationLoop: false,
      controlNav: false,
      itemMargin: 40,
      itemWidth: itemWidth,
      maxItems: maxItems,
      move: 1,
    });
  };

  // Verify if exists photo key on local storage and if it's valid.
  if (localPhotos && lastRequest) photos = parseStorage(localPhotos, lastRequest);

  // If there's no photos on LocalStorage, request photos in JSONbin.io
  // Images are refreshed after 12 hours.
  if (photos.length === 0) {
    if (!localCreatedAt || !isValidTime(+localCreatedAt, 12)) {
      const { data } = await getJsonBin();
      const { metadata: { createdAt }, record: { photos } } = data;
      localStorage.setItem('jsonbin-created-at', createdAt);
      updateStorage(photos);
    }
  }

  // And finally, on Instagram API
  if (photos.length === 0) {
    photos = await getInstagramPhotos();
    updateStorage(photos);
    storeJsonBin(photos);
  }

  // Finally we render the photos on the screen if it exists.
  if (photos.length !== 0) {
    render(photos);
  }
})();
