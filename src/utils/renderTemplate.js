import Handlebars from "handlebars";

export const renderTemplate = (element, rawTemplate, options = {}) => {
  const template = Handlebars.compile(rawTemplate);
  element.innerHTML = template(options);
};
