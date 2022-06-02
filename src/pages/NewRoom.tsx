import { Link } from "react-router-dom";

import { useAuth } from "../hook/useAuth";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>

          <form>
            <input type="text" placeholder="Digite o código da sala" />

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
