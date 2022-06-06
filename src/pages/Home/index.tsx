import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { useAuth } from "../../hook/useAuth";

import illustration from "../../assets/images/illustration.svg";
import logo from "../../assets/images/logo.svg";
import googleIcon from "../../assets/images/google-icon.svg";

import "./styles.scss";

import { Button } from "../../components/Button";

import { ref, get } from "firebase/database";
import { database } from "../../services/firebase";

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = ref(database, `rooms/${roomCode}`);

    const existsRoom = await get(roomRef);

    if (!existsRoom.exists()) {
      alert("Room does not exists");
      return;
    }

    navigate(`/rooms/${roomCode}`);
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

          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
