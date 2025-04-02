import { useState, useEffect } from "react";
import API from "../../utils/api"; 
import { useRouter } from "next/router";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/"); 
          return;
        }

        const response = await API.get("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

      await API.put(`/appointments/cancel/${appointmentId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appt) => appt._id !== appointmentId)
      ); // Remove cancelled appointment from state

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
        <p>No upcoming appointments</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="mb-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold">{appointment.dentist.name}</h2>
                <p className="text-gray-700">Date: {appointment.slot.time}</p>
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md"
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
