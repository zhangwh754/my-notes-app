import { BrowserRouter, Routes, Route } from "react-router";
import { Login, Home, Setting, Detail } from "./component.ts";
import { NotesLayout } from "../layout/Notes.tsx";

export default function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login children={"登录页面"} />} />

        <Route path="/" element={<NotesLayout />}>
          <Route index element={<Home children={"首页"} />} />
          <Route path="detail/:id" element={<Detail children={"详情页"} />} />
        </Route>

        <Route path="/setting" element={<Setting children={"设置页面"} />} />
      </Routes>
    </BrowserRouter>
  );
}
