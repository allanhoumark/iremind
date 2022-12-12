import { prisma } from "./database.server.js";

export async function getAppointments() {
  const appointments = await prisma.appointments.findMany();
  return appointments;
}

// save appointment to primary database
export async function saveAppointment(appointment) {
  const newAppointment = await prisma.appointments.create({
    data: appointment,
  });
  console.log("newAppointment: ", newAppointment);
  return newAppointment;
}

// delete a appointment from primary database
export async function deleteAppointment(id) {
  const deletedAppointment = await prisma.appointments.delete({
    where: {
      id: id,
    },
  });
  return deletedAppointment;
}
