import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-container">
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
