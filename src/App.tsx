import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root.tsx";
import Login from "./pages/Login.tsx";
import Accounts from "./pages/accounts/Accounts.tsx";
import Departments from "./pages/Departments.tsx";
import NotFound from "./pages/NotFound.tsx";
import Account from "./pages/accounts/Account.tsx";
import { Toaster } from "react-hot-toast";
import { Counter } from "./pages/Counter.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      { path: "accounts", element: <Accounts /> },
      { path: "accounts/:id", element: <Account /> },
      { path: "departments", element: <Departments /> },
      { path: "counter", element: <Counter /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
