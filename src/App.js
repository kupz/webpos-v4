import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import IsLoggedIn from "./validations/IsLoggedIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Inventory from "./pages/Inventory";
import { Provider } from "react-redux";
import store from "./redux/store";
import History from "./pages/History";
import Webpos from "./pages/Webpos";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: IsLoggedIn(Home),
      errorElement: <h1>Error : 404 , Page Not Found!</h1>,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "webpos",
          element: <Webpos />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
