import Handlebars from "handlebars";

export default (value, safeValue) =>
  new Handlebars.SafeString(value || safeValue);
