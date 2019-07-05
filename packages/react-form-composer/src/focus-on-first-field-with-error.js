const focusOnFirstFieldWithError = (formApi) => {
  for (const field of formApi.getFields()) {
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
      window.addEventListener('scroll', focusAfterScroll);
      if (element.scrollIntoView) {
        element.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
      }
      break;
    }
  }
};

export default focusOnFirstFieldWithError;