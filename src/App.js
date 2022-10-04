import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Route, Routes, Navigate } from "react-router-dom";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { useEffect } from "react";
import { autoLogin } from "./store/actions/auth";

const App = (props) => {
  // componentDidMount() {
  //   props.autoLogin();
  //

  useEffect(() => {
    props.autoLogin();
  }, []);

  return (
    <Layout>
      {props.isAuthenticated ? (
        <Routes>
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" exact element={<QuizList />} />
          <Route path={"*"} render={() => <Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/" exact element={<QuizList />} />
          <Route path={"*"} render={() => <Navigate to="/" />} />
        </Routes>
      )}
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
