export default `
  <div class="input-group">
    {{#if label}}
      <label for="{{name}}">{{label}}</label>
    {{/if}}
    <input
      {{#if placeholder}}
        placeholder="{{placeholder}}"
      {{/if}}
      id="{{name}}"
      name="{{name}}"
      type="{{safeVal type 'text'}}"
      class="my-input" />
  </div>
`;
