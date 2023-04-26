import "./App.css";
import ManageSpellsSB from "./components/ManageSpellsSideBar/ManageSpellsSB";
import BaseStatBlock from "./components/BaseStatBlock/BaseStatBlock";
export const character_name = "ithen";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex pt-4">
          <div className="col-md-7 d-flex">
            <BaseStatBlock />
          </div>
          <div className="col-md-5 d-flex">
            <div className="ManageSpellsSB">
              <ManageSpellsSB />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
