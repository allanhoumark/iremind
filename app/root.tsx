import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction, MetaFunction, redirect } from "@remix-run/node";

import Navbar from "./components/navbar";
import { deleteAppointment } from "./data/appointments.server";
import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

//remix action method delete
export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const formData = await request.formData();
  console.log("formData", formData.get("intent"), formData.get("id"));

  if (formData.get("intent") === "delete") {
    await deleteAppointment(formData.get("id"));
  }
  return redirect("/");
}
