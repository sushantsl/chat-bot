import express from "express";
import httpServer from "http";
import { Server } from "socket.io";
import cors from "cors";

//This is the main in-memory database of questions and corresponding answers
const questions = {};

const app = express();
app.use(cors());
const http = httpServer.createServer(app);

http.listen(3000, () => {
  console.log("listening on *:3000");
});

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("New Chat client connected");
  io.emit("new connection", "new connection");

  const questionsIndex = [];
  for (let q in questions) {
    const data = {
      id: questions[q].id,
      question: questions[q].question,
    };
    questionsIndex.push(data);
  }
  //Send an index of all asked and answered questions so far to the chat bot for fast lookup
  io.emit("questions-index", questionsIndex);

  socket.on("question", (data) => {
    console.log("Received question:", data);
    const date = Date.now();
    const qId = date;
    const questionRecord = {
      id: qId,
      user: data.username,
      timestamp: new Date(date).toISOString(),
      question: data.question,
      answers: [],
    };
    questions[qId] = questionRecord;
    io.emit("question-added", questionRecord);
  });

  socket.on("answer", (data) => {
    console.log("Received answer:", JSON.stringify(data));
    const date = Date.now();
    const { qId, answer, user } = data;
    const answerRecord = {
      qId,
      answer,
      user,
      timestamp: new Date(date).toISOString(),
    };
    //Insert the latest answer at the front of the list as it is most likely to be relevant
    questions[qId]?.answers.unshift(answerRecord);

    const updatedQuestionRecord = questions[qId];
    const response = {
      answer: answerRecord,
      question: updatedQuestionRecord,
    };
    io.emit("answer-added", response);
  });

  socket.on("get-question-by-id", (id) => {
    if (questions[id]) {
      const questionRecord = questions[id];
      socket.emit("question-by-id", questionRecord);
    }
  });
});
