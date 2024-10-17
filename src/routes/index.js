import LayoutDefault from "../Layout/LayoutDefault";
import Answer from "../pages/Answer";
import Excercise from "../pages/Excercise";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShowResult from "../pages/ShowResult";
import Topic from "../pages/Topic";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "answer/:id", // Đường dẫn động
        element: <ShowResult />,
      },
      {
        path: "answer",
        element: <Answer />,
      },
      {
        path: "topic",
        element: <Topic />,
      },
      {
        path: "excercise",
        element: <Excercise />,
      },
    ],
  },
];
