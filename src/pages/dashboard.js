import { useState, useEffect } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (!token || !email) {
          router.push("/");
          return;
        }

        // Fetch patientId first
        const userResponse = await API.post(
          "/api/getUserID",
          { email },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const patientId = userResponse.data.userId;
        setPatientId(patientId);

        // Fetch appointments with patientId
        const response = await API.post(
          "/api/appointments",
          { patientId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      await API.delete(`/api/appointments/cancel/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appt) => appt._id !== appointmentId)
      );

      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Your Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="mb-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  {appointment.dentist.name}
                </h2>
                <p className="text-gray-700">Date: {appointment.date}</p>
                <p className="text-gray-700">Time: {appointment.slot}</p>
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Cancel Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
