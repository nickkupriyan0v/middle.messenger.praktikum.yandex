import Handlebars from "handlebars";

export default (value: string, safeValue: string): Handlebars.SafeString =>
  new Handlebars.SafeString(value || safeValue);
