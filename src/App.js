import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import {useState} from "react";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebaseconfig";
import Dashboard from "./Dashboard";
function App() {
  const [authuser, setauthuser] = useState(null);
  auth.onAuthStateChanged((user) => {
    setauthuser(user);
  });

  const [{user}] = useStateValue();

  return (
    <div className=" bg-black text-white bg-opacity-80 min-h-screen">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          >
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
