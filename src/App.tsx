import { Home } from "./pages/Home";
import { database } from "./services/firebase";

function App() {
  console.log(database);

  return <Home />;
}

export default App;
