import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import Nav from './components/Nav';
import Home from "./pages/Home";
import Volcano from './pages/Volcano';
import VolcanoList from "./pages/VolcanoList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { volcanoLoader } from './helpers/volcanoLoader';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { theme } from "./styles/theme";
// import './App.css';

function App() {
  /**
   * Some code for the browser router derived from the below stackoverflow link. 
   * https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
   */
  const [loggedIn, setLoggedIn] = useState(false);
  
  const Header = () => (
    <>
      <header>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          element: <Volcano loggedIn={loggedIn} />,
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
          element: <Login setLoggedIn={setLoggedIn} />,
        },
      ],
    },
  ]);

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Notifications />
      <RouterProvider router={routes} />
    </MantineProvider>
    // <div className="App">
    //   <RouterProvider router={routes} />
    // </div>
  );
}

export default App
