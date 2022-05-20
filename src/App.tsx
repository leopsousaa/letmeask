import { database } from "./services/firebase";

function App() {
  console.log(database);

  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
