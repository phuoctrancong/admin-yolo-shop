import {
  InsertRowBelowOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  NodeIndexOutlined,
  CoffeeOutlined,
  DollarOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  BRANCH: "/branch",
  SETTING: "/setting",
  CATEGORY: "/categories",
  COLOR: "/colors",
  COUPON: "/coupon",
  SPECIFICATION: "/specification",
  PRODUCT: "/products",
  USER: "/user",
  ORDER: "/orders",
  SIZE: "/sizes",
};

export const routers = [
  {
    endpoint: Endpoint.DASHBOARD,
    text: "Dashboard",
    icon: <AreaChartOutlined />,
  },
  {
    endpoint: Endpoint.CATEGORY,
    text: "Quản lý danh mục",
    icon: <InsertRowBelowOutlined />,
  },
  {
    endpoint: Endpoint.PRODUCT,
    text: "Quản lý sản phẩm",
    icon: <DollarOutlined />,
  },
  {
    endpoint: Endpoint.COLOR,
    text: "Quản lý màu sắc",
    icon: <CoffeeOutlined />,
  },
  {
    endpoint: Endpoint.SIZE,
    text: "Quản lý kích cỡ",
    icon: <NodeIndexOutlined />,
  },
  // {
  //   endpoint: Endpoint.COUPON,
  //   text: "Quản lý mã giảm giá",
  // },
  {
    endpoint: Endpoint.USER,
    text: "Quản lý người dùng",
    icon: <TeamOutlined />,
  },

  {
    endpoint: Endpoint.ORDER,
    text: "Quản lý đơn hàng",
    icon: <ShoppingCartOutlined />,
  },
  // {
  //   endpoint: Endpoint.SETTING,
  //   text: "Cài đặt website",
  // },
];
