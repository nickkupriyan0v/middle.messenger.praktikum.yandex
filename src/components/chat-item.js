export default `
    <article class="chat-item">
        {{> Avatar letter="И" }}
        <div class="chat-info">
            <div class="chat-header">
                <h3 class="chat-name">{{chatName}}</h3>
                <time class="chat-time">{{chatTime}}</time>
            </div>
            <div class="chat-preview">
                <p class="last-message">{{chatMessage}}</p>
                <span class="badge">{{unreadCount}}</span>
            </div>
        </div>
    </article>
`;
