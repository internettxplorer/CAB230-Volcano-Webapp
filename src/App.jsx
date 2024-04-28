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
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import FetchError from './pages/FetchError';
import { volcanoLoader } from './helpers/volcanoLoader';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { theme } from "./styles/theme";

/**
 * Declares the header, site routes, Mantine-related functionality for the whole app
 */
export default function App() {
  /**
   * Some code for the browser router derived from the below stackoverflow link. 
   * https://stackoverflow.com/questions/74168742/how-to-template-jsx-with-createbrowserrouter
   */
  const [loggedIn, setLoggedIn] = useState(false);
  
  const Layout = () => (
    <>
      <header>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </header>
      <Outlet />
    </>
  );

  const routes = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          errorElement: <ErrorBoundary />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/volcano/:id",
                element: <Volcano loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>,
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
              {
                path: '/fetch-error',
                element: <FetchError />,
              },
              {
                path: '*',
                element: <NotFound />,
              }
            ],
        }
      ],  
    },  
  ]);

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Notifications />
      <RouterProvider router={routes} />
    </MantineProvider>
  );
}

