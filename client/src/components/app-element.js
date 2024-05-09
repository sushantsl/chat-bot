import { LitElement, html } from "lit";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import style from "../css/app-element.css.js";
import {
  welcomeMessage,
  questionRepeatedMessage,
  messageTypes,
  defaultUserName,
} from "../utils/staticData.js";
import {
  headerTemplate,
  botMessageTemplate,
  questionTemplate,
} from "./templates.js";
const initialMessages = [
  {
    type: messageTypes.BOT_MESSAGE,
    message: welcomeMessage,
  },
];

export class App extends LitElement {
  static styles = [style];
  static get properties() {
    return {
      username: { type: String },
      question: { type: String },
      _messages: { state: true },
    };
  }

  constructor() {
    super();
    this._messages = initialMessages;
    this.questionCache = {};
    this.username = defaultUserName;
    this.question = "";

    this.addEventListener("answer-sent", (event) => this.onAnswerSent(event));
    this.addEventListener("username-changed", (event) =>
      this.onUsernameChanged(event)
    );
    this.socket = io("http://localhost:3000", {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.socket.on("new connection", () =>
      console.log("Connected to the chat server")
    );

    this.socket.on("questions-index", (data) => {
      console.log("Questions index:", JSON.stringify(data));
      data.forEach((item) => {
        this.questionCache[item.id] = item.question;
      });
    });

    this.socket.on("question-added", (questionRecord) => {
      console.log(
        "Received event question-added: ",
        JSON.stringify(questionRecord)
      );
      const { id, question } = questionRecord;
      this.questionCache[id] = question;
      this.updateMessages(questionRecord);
    });
    this.socket.on("answer-added", (response) => {
      console.log("Received event answer-added: ", JSON.stringify(response));
      if (
        response.question.user === this.username ||
        response.answer.user === this.username
      ) {
        const notif = {
          type: messageTypes.BOT_MESSAGE,
          message: `${response.answer.user} answered a question by ${response.question.user}`,
        };
        const message = { ...response.question, type: messageTypes.QUESTION };
        this._messages = [...this._messages, notif, message];
      }
    });
    this.socket.on("question-by-id", (questionRecord) => {
      this.updateMessages(questionRecord);
    });
  }

  updateMessages(questionRecord) {
    const message = { ...questionRecord, type: "question" };
    this._messages = [...this._messages, message];
  }
  onAnswerSent(event) {
    console.log("Root element received answer-sent event:", event.detail);
    const { qId, answer } = event.detail;
    const answerRecord = {
      qId,
      answer,
      user: this.username,
    };
    this.socket.emit("answer", answerRecord);
  }
  onUsernameChanged(event) {
    console.log("Root element received username-changed event:", event.detail);
    this.username = event.detail;
  }
  onInput(event) {
    this.question = event.target.value;
  }
  onSend() {
    console.log("Send button clicked for input :", this.question);
    for (let id in this.questionCache) {
      if (this.questionCache[id] === this.question) {
        console.log("The Bot knows the answer to Question Id:", id);
        const botMessage = {
          type: messageTypes.BOT_MESSAGE,
          message: questionRepeatedMessage,
        };
        this._messages = [...this._messages, botMessage];

        //This fetches the conversation from the server
        this.socket.emit("get-question-by-id", id);
        return;
      }
    }
    const question = {
      username: this.username,
      question: this.question,
    };
    this.socket.emit("question", question);
    this.question = "";
  }

  renderMessage(msg) {
    switch (msg.type) {
      case messageTypes.BOT_MESSAGE:
        return botMessageTemplate(msg.message);
      case messageTypes.QUESTION:
        return questionTemplate(msg, this.username);
      default:
        return;
    }
  }
  render() {
    return html`
      <div class="container">
        ${headerTemplate(this.username)}
        <div class="message-container">
          <div>${this._messages.map((item) => this.renderMessage(item))}</div>
        </div>
        <div id="bottom"></div>
        <div class="footer">
          <input
            class="user-input"
            @input="${this.onInput}"
            placeholder="Type your question here..."
            .value=${this.question}
          />
          <button type="submit" @click="${() => this.onSend()}">Send</button>
        </div>
      </div>
    `;
  }
}

window.customElements.define("app-element", App);
