import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { type LoaderArgs, redirect } from "@remix-run/node";

import { type AppointmentType } from "~/components/appointment";
import Modal from "~/components/modal";
import { saveAppointment } from "~/data/appointments.server";

export async function loader({ request }: LoaderArgs) {
  // giver de params der er sendt med mening?
  // er ressource tilknyttet denne kunde?
  // er tiden ledig?
  // hvilket aftaletype er der mulighed for (for ressourcen) og er der plads til i kalenderen?

  // forudfyld formen med data fra params
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  console.log("params", params);

  return { resource: params.r, date: params.d };
}

export default function Add({ request }: { request: Request }) {
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate("/");
  };

  return (
    <Modal onClose={handleModalClose}>
      <Form action="" method="post">
        {JSON.stringify(data)}
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Type
          </label>
          <input
            type="text"
            name="type"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Client
          </label>
          <input
            type="text"
            name="client"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ressource
          </label>
          <input
            type="text"
            name="resource"
            defaultValue={data.resource}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Date
          </label>
          <input
            type="date"
            name="datetime"
            defaultValue={data.date}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Duration
          </label>
          <input
            type="text"
            name="duration"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Opret
        </button>
      </Form>
    </Modal>
  );
}

// a function

export async function action({ request }: { request: Request }) {
  // mangler data validering
  // både om data er korrekt og om det er gyldig i forhold til ressourcen, kunden og kalenderen

  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const appointment: AppointmentType = {
    client: formData.get("client")?.toString() || "",
    resource: formData.get("resource")?.toString() || "",
    type: formData.get("type")?.toString() || "",
    duration: parseInt(formData.get("duration")?.toString() || "0"),
    customer: "cust123",
    datetime: new Date(),
  };

  await saveAppointment(appointment);
  return redirect("/");
}
