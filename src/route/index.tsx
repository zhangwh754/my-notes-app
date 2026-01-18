import { createBrowserRouter } from "react-router";
import { Login, Register, Home, Setting, Article } from "./component.ts";
import { NotesLayout } from "../layout/Notes.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <NotesLayout />,
    children: [
      {
        index: true,
        element: <Home children={"首页"} />,
      },
      {
        path: "detail/:id",
        element: <Article />,
      },
    ],
  },
  {
    path: "/setting",
    element: <Setting children={"设置页面"} />,
  },
]);

export default router;
