import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustration from "../../assets/images/illustration.svg";
import logo from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { database } from "../../services/firebase";
import { ref, push } from "firebase/database";

import { useAuth } from "../../hook/useAuth";

import "./styles.scss";

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = ref(database, "rooms");

    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp; A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">Criar na sala</Button>
          </form>

          <p>
            Quer entrar em uma nova sala existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
