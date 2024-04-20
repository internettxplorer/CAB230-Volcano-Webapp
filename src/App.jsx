import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import Nav from './components/Nav';
import Home from "./pages/Home";
import Volcano from './pages/Volcano';
import { volcanoLoader } from './components/volcanoLoader';
import VolcanoList from "./pages/VolcanoList";
import Register from "./pages/Register";
import Login from "./pages/Login";

import '@mantine/core/styles.css';
import './App.css';
import { theme } from "./styles/theme";

function App() {
  /**
   * Some code for the browser router derived from the below stackoverflow link. 
   * https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
   */
  const Header = () => (
    <>
      <header>
        <Nav />
      </header>
      <Outlet />
    </>
  );

  const routes = createBrowserRouter([
    {
      element: <Header />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/volcano/:id",
          element: <Volcano />,
          loader: ({ params }) => {
            return volcanoLoader(params.id); // fetches volcano info at the given ID
          },
        },
        {
          path: "/list",
          element: <VolcanoList />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider router={routes} />
    </MantineProvider>
    // <div className="App">
    //   <RouterProvider router={routes} />
    // </div>
  );
}

export default App
