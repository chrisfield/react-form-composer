function isElementInViewport (el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const focusOnFirstFieldWithError = (formApi) => {
  const fields = formApi.getFields();
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const element = field.element;
    if (field.error && element) {
      let scrollTimeout;
      const focusAfterScroll = e => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
          window.removeEventListener('scroll', focusAfterScroll);
          if (element.focus) {
            element.focus();
          }
        }, 100);
      };    
      focusAfterScroll();
      if (!isElementInViewport(element)) {
        window.addEventListener('scroll', focusAfterScroll);
        if (element.scrollIntoView) {
          element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
      }
      break;
    }
  }
};

export default focusOnFirstFieldWithError;