import './App.css';

function App() {
  return (
    <div className="App">
      <form action="POST">
        <label>Put poetry.lock file to see the list of packages!</label>
        <input type="file" name="poetry" id="poetry" accept=".lock" />
        <button type="submit">Show list</button>
      </form>
    </div>
  );
}

export default App;
