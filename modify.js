/** @typedef {import("./common")} */

const css = {
    "normal": "/* Nothing to do */",
    "hidden": `
  ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image {
    display: none !important;
  }
  ytm-reel-shelf-renderer .reel-shelf-items>* {
    height: auto !important;
    align-items: flex-start !important;
  }
  ytm-reel-item-renderer ytm-text-badge-renderer ytm-badge.text-badge[data-type=BADGE_STYLE_TYPE_SIMPLE] {
    visibility: hidden !important;
  }
  .video-thumbnail-container-compact  {
     display: none !important;
  }
  .fullscreen-watch-next-entrypoint-wrapper {
    display: none !important;
  }
  ytm-reel-item-renderer.rounded-reel-item .reel-item-metadata {
    height: 80px;
    width: 100px;
    position: static !important;
    overflow: hidden;
  }
  .detail, .compact-media-item{
    padding : 20px 12px 20px 12px !important;
  }
  .ytp-videowall-still-info-content {
    opacity: 1 !important;
  }`,
  };
  
  const elem = document.createElement("style");
  document.documentElement.appendChild(elem);
  
  const updateElem = async () => {
    const options = await loadOptions()
  
    const isDisabled = options.disabledOnPages.everywhere
      || (options.disabledOnPages.results && window.location.pathname === '/results')
      || (options.disabledOnPages.channel && window.location.pathname.startsWith('/@'))
      || (options.disabledOnPages.playlist && window.location.pathname === '/playlist')
      || (options.disabledOnPages.watch && window.location.pathname === '/watch')
      || (options.disabledOnPages.subscriptions && window.location.pathname === '/feed/subscriptions');
  
    elem.innerHTML = `/* Modified by UserDesign */
    ${css[isDisabled ? 'normal' : options.thumbnailMode]}`
  }
  
  // Update when settings are changed
  browser.storage.onChanged.addListener(updateElem)
  
  // Update when moving page
  let lastPathname = window.location.pathname;
  setInterval(() => {
    if (lastPathname !== window.location.pathname) {
      lastPathname = window.location.pathname
      updateElem();
    }
  }, 200);
  
  // Initialize on load
  updateElem()