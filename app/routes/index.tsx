import Appointment, { AppointmentType } from "~/components/appointment";
import { Link, useLoaderData } from "@remix-run/react";
import {
  deleteAppointment,
  getAppointments,
} from "./../data/appointments.server";

import { redirect } from "@remix-run/server-runtime";

// create a remix loader function that return dummy data
export async function loader({ request }: { request: Request }) {
  return getAppointments();
}

export default function Index() {
  const appointments = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Kalender side</h1>
      {appointments.map((appointment: AppointmentType) => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
      <Link
        to="/appointment/add?r=1&d=2022-12-24"
        type="button"
        className="mt-3 w-full inline-flex justify-center
      rounded-md border border-gray-300 shadow-sm px-4 py-2
       bg-white text-base font-medium text-gray-700
        hover:bg-gray-50 focus:outline-none focus:ring-2
         focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
          sm:ml-3 sm:w-auto sm:text-sm"
      >
        Ny tid
      </Link>
    </div>
  );
}
