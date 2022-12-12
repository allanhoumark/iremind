import { Form } from "@remix-run/react";

export type AppointmentType = {
  id?: string;
  customer: string;
  resource: string;
  type: string;
  client: string;
  datetime: Date;
  duration: number;
};

type appointmentProps = {
  appointment: AppointmentType;
};

export default function Appointment({ appointment }: appointmentProps) {
  return (
    <div className="border-solid border-gray-300 border-2 rounded m-5">
      <p>
        {" "}
        <strong>Resource:</strong> {appointment.resource}
      </p>
      <p>
        <strong>Type:</strong> {appointment.type}
      </p>
      <p>
        <strong>Klient:</strong> {appointment.client}
      </p>
      <p>
        <strong>Dato:</strong> {new Date(appointment.datetime).toDateString()}
      </p>
      <p>
        <strong>Aftale længde:</strong> {appointment.duration} min.
      </p>
      <Form method="post" action="/">
        <input type="hidden" name="id" value={appointment.id} />
        <button
          type="submit"
          name="intent"
          value="delete"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
