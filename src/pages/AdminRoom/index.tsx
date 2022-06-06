import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";

import "./styles.scss";

// import { useAuth } from "../../hook/useAuth";
import { Question } from "../../components/Question";
import { useRoom } from "../../hook/useRoom";
import { ref, remove, update } from "firebase/database";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, question } = useRoom(roomId);

  async function handleEndRoom() {
    const endRoomRef = ref(database, `rooms/${roomId}`);

    await update(endRoomRef, {
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja remover essa pergunta?")) {
      const deleteQuestionRef = ref(
        database,
        `rooms/${roomId}/questions/${questionId}`
      );

      await remove(deleteQuestionRef);
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
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
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
