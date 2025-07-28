import "../styles/button.scss";

export default `
    <button
        {{#if id}}
            id="{{id}}"
        {{/if}}
        type="{{safeVal type 'button'}}"
        class="my-button"
    >
        {{#if icon}}
            <i class="fas {{icon}}"></i>
        {{/if}}
        {{text}}
    </button>
`;
