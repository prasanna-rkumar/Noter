import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import Register from "./components/Register";
import { noterAuth } from "./firebase";

const App: FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <WhichRouter />
    </Router>
  );
};

export default App;

const WhichRouter = () => {
  const [user, loading, error] = useAuthState(noterAuth);
  console.log(user, loading, error);
  if (error) return null;
  if (loading) return <div>Loading...</div>;
  if (user === null) {
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }
  if (user) {
    return (
      <Switch>
        <Route path="/login">
          <Redirect to="/" />
        </Route>
        <Route path="/register">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <div className="App mt-16 max-w-7xl mx-auto">
            <Navbar />
            <Notes />
          </div>
        </Route>
      </Switch>
    );
  }
  return <Login />;
};
