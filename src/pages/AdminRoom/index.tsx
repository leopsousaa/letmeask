import React, { FormEvent, useState } from "react";

import { useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import logoImg from "../../assets/images/logo.svg";

import "./styles.scss";

import { useAuth } from "../../hook/useAuth";
import { database } from "../../services/firebase";
import { push, ref } from "firebase/database";
import { Question } from "../../components/Question";
import { useRoom } from "../../hook/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const { title, question } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    const questionsRef = ref(database, `rooms/${roomId}/questions/`);

    await push(questionsRef, question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar a sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {question.length > 0 && <span>{question.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {question.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
