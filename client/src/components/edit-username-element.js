import { LitElement, html } from "lit";
import style from "../css/app-element.css.js";

export class EditUsernameElement extends LitElement {
  static styles = [style];
  static get properties() {
    return {
      username: { type: String },
      active: { state: true },
    };
  }
  constructor() {
    super();
    this.active = false;
  }
  onEdit() {
    this.active = !this.active;
  }
  onSave() {
    const eventOptions = {
      detail: this.username,
      bubbles: true,
      composed: true,
    };
    const event = new CustomEvent("username-changed", eventOptions);
    this.dispatchEvent(event);
    this.active = !this.active;
  }
  onInput(event) {
    this.username = event.target.value;
  }
  render() {
    if (this.active) {
      return html`
        <div class="vertically-centered">
          <input @input="${this.onInput}" />
          <button @click="${() => this.onSave()}" id="edit">Save</button>
          <button @click="${() => this.onEdit()}" id="edit">Cancel</button>
        </div>
      `;
    }
    return html`
      <h1 id="user-name">
        ${this.username}
        <button @click="${() => this.onEdit()}" id="edit">Edit</button>
      </h1>
    `;
  }
}

window.customElements.define("edit-username-element", EditUsernameElement);
