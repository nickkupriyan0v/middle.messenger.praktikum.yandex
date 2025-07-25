export default `
    <a
        class="my-link"
        href=""
        {{#if id}}
            id="{{id}}"
        {{/if}}
    >
        {{text}}
    </a>
`;
