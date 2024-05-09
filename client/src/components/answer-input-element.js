import { LitElement, html } from "lit";
import style from "../css/app-element.css.js";

export class AnswerInputElement extends LitElement {
  static styles = [style];
  static get properties() {
    return {
      qid: { type: Number },
      active: { state: true },
      input: { state: true },
    };
  }
  constructor() {
    super();
    this.active = false;
    this.input = "";
  }
  onSend() {
    console.log(`Sending answer:${this.input} for qid:${this.qid}`);
    this.active = !this.active;
    const answer = {
      qId: String(this.qid),
      answer: this.input,
    };
    const eventOptions = { detail: answer, bubbles: true, composed: true };
    const event = new CustomEvent("answer-sent", eventOptions);
    this.dispatchEvent(event);
    this.input = "";
  }
  onClick() {
    this.active = !this.active;
    this.input = "";
  }
  onAnswerInput(event) {
    this.input = event.target.value;
  }
  render() {
    if (this.active) {
      return html`
        <div class="answerTextArea">
          <textarea
            id="answerInput"
            rows="3"
            placeholder="Type your answer here..."
            @input="${this.onAnswerInput}"
          ></textarea>
        </div>
        <div class="button-grid">
          <div class="addAnswerButton">
            <a @click="${() => this.onClick()}">Clear</a>
          </div>
          <div class="addAnswerButton">
            <a @click="${() => this.onSend()}">Send</a>
          </div>
        </div>
      `;
    } else {
      return html` <div class="addAnswerButton">
        <a @click="${() => this.onClick()}">+ Answer</a>
      </div>`;
    }
  }
}

window.customElements.define("answer-input-element", AnswerInputElement);
