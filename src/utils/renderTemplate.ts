import Handlebars from "handlebars";

export const renderTemplate = (element: HTMLElement | null, rawTemplate: string, options = {}) => {
  if (!element) {
    return
  }
  const template = Handlebars.compile(rawTemplate);
  element.innerHTML = template(options);
};
