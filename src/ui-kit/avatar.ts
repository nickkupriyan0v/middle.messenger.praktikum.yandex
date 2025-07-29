import "../styles/avatar.scss";

export default `
    {{#if editable}}
        <div id="avatar-uploader" class="my-avatar editable">
            <span class="letter">
                {{letter}}
            </span>
            <img class="preview-image" />
            <input type="file" accept="image/*" hidden name="avatar" id="avatar-uploader-input" />
        </div>
    {{else}}
        <div class="my-avatar">
            <span class="letter">
                {{letter}}
            </span>
        </div>
    {{/if}}
`;
