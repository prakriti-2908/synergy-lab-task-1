import Fetch from "./components/Fetch";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* UseProvider for providing context access to components*/}
        <UserProvider>
          <Routes>
            <Route path="/" element={<Fetch />} />
            <Route path="/user-form" element={<UserForm />} />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
