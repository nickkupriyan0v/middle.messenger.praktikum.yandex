import "../styles/message-item.scss";

export default `
  <div class="message-item {{#if isIncoming}} incoming {{else}} outgoing {{/if}}">
    <p>{{text}}</p>
    <time class="message-time">{{time}}</time>
  </div>
`;
