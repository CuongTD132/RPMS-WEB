import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root.tsx";
import Login from "./pages/Login.tsx";
import Accounts from "./pages/accounts/Accounts.tsx";
import Departments from "./pages/Departments.tsx";
import NotFound from "./pages/NotFound.tsx";
import Account from "./pages/accounts/Account.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import { Counter } from "./app/features/Counter.tsx";

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
  // {
  //   path: '/',
  //   element: <Root />,
  //   children: [
  //     {
  //       index: true,
  //       element: <HomePage />,
  //     },
  //     { path: 'sessions', element: <SessionsPage /> },
  //     { path: 'sessions/:id', element: <SessionPage /> },
  //   ],
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
