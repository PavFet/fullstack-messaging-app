
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import Toolbar from './components/Toolbar';
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ChatHistoryPage from "./pages/ChatHistoryPage"
import ChatPage from "./pages/ChatPage"
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar/>
          <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/allUsers" element={<IndexPage/>}/>
            <Route path="/chatHistory" element={<ChatHistoryPage/>}/>
            <Route path="/chat/:id" element={<ChatPage/>}/>
            <Route path="/profile/:id" element={<ProfilePage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
