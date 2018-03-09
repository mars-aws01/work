const removeAngularTag = (el: HTMLElement): void => {
  const parentEl = el.parentElement;
  if (!parentEl || !parentEl.insertBefore) {
    return;
  }
  while (el.firstChild) {
    parentEl.insertBefore(el.firstChild, el);
  }
  parentEl.removeChild(el);
};

export {
  removeAngularTag
};
