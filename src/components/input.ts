import "../styles/input.scss";

export default `
  <label class="input-group">
    {{#if label}}
      <span>{{label}}</span>
    {{/if}}
    <input
      {{#if placeholder}}
        placeholder="{{placeholder}}"
      {{/if}}
      id="{{name}}"
      name="{{name}}"
      type="{{safeVal type 'text'}}"
      class="my-input" />
  </label>
`;
