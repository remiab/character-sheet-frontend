import "./App.css";
// import ManageSpellsSB from "./components/ManageSpellsSideBar/ManageSpellsSB";
import BaseStatBlock from "./components/BaseStatBlock/BaseStatBlock";
export const character_name = "ithen";

function App() {
  return (
    <div className="App">
      {/* <div className="ManageSpellsSB"><ManageSpellsSB /></div> */}
      <div>
        <BaseStatBlock />
      </div>
    </div>
  );
}

export default App;
