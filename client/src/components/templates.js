import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { getMessageTimestamp } from "../utils/dateTime.js";
import { EditUsernameElement } from "./edit-username-element.js";
import { AnswerInputElement } from "./answer-input-element.js";

export const botMessageTemplate = (msg) => {
  return html`<div class="botMessage">${msg}</div>`;
};

export const answerTemplate = (answer) => {
  return html`<div class="answer">
    <div class="user-name dark">${answer.user}</div>
    ${answer.answer}
    <div class="timestamp">${getMessageTimestamp(answer.timestamp)}</div>
  </div>`;
};

export const questionTemplate = (question, username) => {
  const classes = {
    self: username === question.user,
    conversation: true,
  };
  const answers = question.answers.map((a) => answerTemplate(a));
  return html` <div class=${classMap(classes)}>
    <div class="question">
      <div class="user-name light">${question.user}</div>
      ${question.question}
      <div class="timestamp light">
        ${getMessageTimestamp(question.timestamp)}
      </div>
      <answer-input-element qid=${question.id}></answer-input-element>
    </div>
    ${answers}
  </div>`;
};

export const headerTemplate = (username) => {
  return html`
    <div class="header dark">
      <h1 id="app-name">Sushant's Chat Bot</h1>
      <edit-username-element username=${username}></edit-username-element>
    </div>
  `;
};
