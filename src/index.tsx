/**
 * The application's index file.
 *
 * @module
 */
import "@fontsource-variable/montserrat";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "@liga/routes";
import AppInfo from "package.json";
import { Api } from "@liga/lib";
import { Header } from "@liga/partials";
import {
  createHashRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";

/** @constant */
const routes = createHashRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Routes.Home.Component />,
        loader: Routes.Home.loader,
      },
      {
        path: "changelog",
        element: <Routes.Changelog />,
        loader: Routes.Home.loader,
      },
      {
        path: "blog",
        element: <Routes.Blog />,
        loader: Routes.Home.loader,
      },
      {
        path: "features",
        element: <Routes.Features />,
      },
    ],
  },
]);

/**
 * The root component.
 *
 * @function
 */
function Root() {
  // restore smooth scrolling on anchor links
  const location = useLocation();

  React.useEffect(() => {
    const [, id] = window.location.hash.match(/\/#(.+)$/) || [];
    const el = document.getElementById(id);
    el?.scrollIntoView();
  }, [location.hash]);

  return (
    <div className="w-full md:mx-auto md:grid md:w-1/2 md:grid-cols-4">
      <ScrollRestoration />
      <Header />
      <Outlet />
    </div>
  );
}

/**
 * The index component
 *
 * @function
 */
function Index() {
  return (
    <React.StrictMode>
      <meta name="description" content={AppInfo.description} />
      <title>{AppInfo.displayName}</title>
      <Api.Provider client={Api.client}>
        <RouterProvider router={routes} />
      </Api.Provider>
    </React.StrictMode>
  );
}

/**
 * React bootstrapping logic.
 *
 * @name anonymous
 * @function
 */
(() => {
  // grab the root container
  const container = document.getElementById("root");

  if (!container) {
    throw new Error("Failed to find the root element.");
  }

  // render the react application
  ReactDOM.createRoot(container).render(<Index />);
})();
