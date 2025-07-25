export default `
    <button
        {{#if id}}
            id="{{id}}"
        {{/if}}
        class="my-button"
    >
        {{#if icon}}
            <i class="fas {{icon}}"></i>
        {{/if}}
        {{text}}
    </button>
`;
