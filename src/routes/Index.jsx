import routeCountStock from "./RouteCountStock";
import MainLayout from "../layouts/MainLayout";

const allRoles = [
  //----- ALL
  ...routeCountStock.map((route) => ({ subSystemId: 0, ...route })),
];

export default function Routers() {
  return [
    {
      role: [],
      layout: <MainLayout />,
      children: allRoles,
    },
  ];
}
