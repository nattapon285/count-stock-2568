import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Routers from "./Index";

export default function ManageRoutes() {
  const route = Routers();

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {route?.map((route, index) => (
            <Route key={index} path="/" element={route.layout}>
              <Route
                path={"/"}
                element={
                  route.children.filter((a) => a.menuId !== 0).length > 0 ? (
                    <Navigate to={route.children.filter((a) => a.menuId !== 0).length > 0 ? route.children.filter((a) => a.menuId !== 0)[0].path : "#"} />
                  ) : (
                    <Fragment></Fragment>
                  )
                }
              />
              <Route path="*" element={<Navigate to="/count-stock" />} />
              {route.children.map((child) => (
                <Route key={child.path} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}
