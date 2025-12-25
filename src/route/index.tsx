import { BrowserRouter, Routes, Route } from "react-router";
import { Home, About, Users } from "./component.ts";

export default function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home children={"Home"} />} />
        <Route path="/about" element={<About children={"About"} />} />
        <Route path="/users" element={<Users children={"Users"} />} />
      </Routes>
    </BrowserRouter>
  );
}
