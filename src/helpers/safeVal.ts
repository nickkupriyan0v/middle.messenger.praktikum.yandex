import Handlebars from "handlebars";

export default (value: string, safeValue: string) =>
  new Handlebars.SafeString(value || safeValue);
