import FormCountStock from "../views/count-stock/form/FormCountStock";
import MainCountStock from "../views/count-stock/MainCountStock";

const routeCountStock = [
  { menuId: 1, path: "/count-stock", name: "ข้อมูลเสื้อใน", element: <MainCountStock /> },
  { menuId: 2, path: "/count-stock/create", name: "ข้อมูลเสื้อใน/เพิ่มข้อมูล", element: <FormCountStock /> },
];

export default routeCountStock;
