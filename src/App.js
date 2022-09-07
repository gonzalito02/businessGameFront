import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home';
import AdminControl from './components/Admin/AdminControl';
import Market from './components/Market/Market';
import PlayerControl from "./components/Player/PlayerControl";
import AdminPlayersAndStudents from "./components/Admin/AdminPlayersAndStudents";
import AdminPlayersResults from "./components/Admin/AdminPlayersResults";
import PlayerResults from "./components/Player/PlayerResults/PlayerResults";
import StudentControl from "./components/Student/StudentControl";
import StudentResults from "./components/Student/StudentShopping/StudentResults";
import PlayerSales from "./components/Player/PlayerSales/PlayerSales";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./components/About/About";
import AdminCreate from "./components/Admin/AdminCreate";
import AdminMarketControl from "./components/Admin/AdminMarketControl";
import Memory from "./components/Memory/Memory";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element = {<Home/>}/>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/player" element = {<PlayerControl/>}/>
          <Route path="/student" element = {<StudentControl/>}/>
          <Route path="/playerResults" element = {<PlayerResults/>}/>
          <Route path="/studentResults" element = {<StudentResults/>}/>
          <Route path="/playerSales" element = {<PlayerSales/>}/>
          <Route path="/adminControl" element = {<AdminControl />}/>
          <Route path="/adminPlayerAndStudents" element = {<AdminPlayersAndStudents />}/>
          <Route path="/adminPlayersResults" element = {<AdminPlayersResults />}/>
          <Route path="/adminCreate" element = {<AdminCreate />}/>
          <Route path="/adminMarket" element = {<AdminMarketControl />}/>
          <Route path="/market" element = {<Market />}/>
          <Route path="/about" element = {<About />}/>
          <Route path="/memory" element = {<Memory />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

//"react-router-dom": "^6.3.0" ---> por esta razon se usa Routes and Route
// en vez de component se usa element y se agregan los < />

export default App;
