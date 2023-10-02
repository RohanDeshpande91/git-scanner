import { useState } from "react";
import "./App.css";
import RepoList from "./RepoList";
import RepoSummary from "./RepoSummary";

function App() {
  const [repoName, setRepoName] = useState("");
  return (
    <div className="App">
      <RepoList setRepoName={setRepoName} />
      {!!repoName && <RepoSummary repoName={repoName} />}
    </div>
  );
}

export default App;
