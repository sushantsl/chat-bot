import { css } from "lit";

export default css`
  * {
    font-family: sans-serif;
    font-size: 12pt;
    line-height: 1.5;
  }

  textarea {
    width: 98%;
  }
  button {
    background-color: #003060;
    color: #68bbe3;
    border-radius: 15px;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    background: #e9ecef;
    border-radius: 10px;
  }
  .message-container {
    display: grid;
    margin-top: 50px;
    margin-bottom: 40px;
    min-height: calc(100vh - 100px);
  }
  a {
    color: #003060;
    font-size: 10pt;
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
    cursor: pointer;
  }
  .message {
    border-radius: 15px;
    padding: 10px;
    width: fit-content;
    max-width: 70%;
  }
  .botMessage {
    background-color: #003060;
    color: #68bbe3;
    border: solid 1px #68bbe3;
    border-radius: 15px;
    margin: 10px auto;
    padding: 10px;
    width: fit-content;
    max-width: 70%;
    text-align: center;
  }
  .conversation {
    display: grid;
    width: 100%;
  }
  .question {
    background-color: #055c9d;
    color: white;
    border: solid 1px white;
    border-radius: 15px;
    margin: 2px;
    padding: 10px;
    width: fit-content;
    min-width: 45%;
    max-width: 80%;
  }
  .answer {
    background-color: #68bbe3;
    color: #003060;
    border: solid 1px white;
    border-radius: 15px;
    margin: 2px;
    padding: 10px;
    width: fit-content;
    min-width: 40%;
    max-width: 75%;
  }
  .self {
    justify-items: flex-end;
  }
  .user-name {
    padding-bottom: 5px;
    text-align: left;
    font-size: 10pt;
    font-weight: bold;
  }
  .dark {
    color: #003060;
    text-shadow: 1px 1px #68bbe3;
  }
  .light {
    color: #68bbe3;
    text-shadow: 1px 1px #003060;
  }
  .timestamp {
    padding-top: 5px;
    text-align: right;
    font-size: 8pt;
  }
  .addAnswerButton {
    border: solid 1px white;
    border-radius: 15px;
    margin-top: 2px;
    text-align: center;
    background-color: white;
    color: #0460bd;
  }
  .button-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5px;
  }
  .user-input {
    height: 40px;
    border: 1px solid #e9ecef;
    border-radius: 15px;
    margin: 2px;
    padding-left: 5px;
  }
  .header {
    display: grid;
    grid-template-columns: 4fr 3fr;
    align-items: stretch;
    background-color: white;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 800px;
  }
  #app-name {
    text-align: left;
  }
  #user-name {
    text-align: right;
    margin-right: 10px;
  }
  #edit {
    margin-left: 5px;
  }
  .vertically-centered {
    padding-top: 10px;
  }
  .footer {
    display: grid;
    position: fixed;
    width: 96%;
    max-width: 800px;
    margin: 0 auto;
    grid-template-columns: 90% auto;
    bottom: 0;
  }
`;
