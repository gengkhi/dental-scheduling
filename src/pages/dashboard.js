import { useState, useEffect } from "react";
import API from "../../utils/api";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);  // Track which appointment is being rescheduled
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
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

        const userResponse = await API.post(
          "/api/getUserID",
          { email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const patientId = userResponse.data.userId;
        setPatientId(patientId);

        const response = await API.get(`/api/appointments/${patientId}`, {
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

      await API.delete(`/api/cancel/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appt) => appt._id !== appointmentId)
      );

      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  const handleReschedule = async (appointmentId, newDate, newTime) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }
        const response = await API.put(
        `/api/appointments/reschedule/${appointmentId}`, 
        { newDate, newTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(response.data);
      toast.success("Appointment rescheduled successfully!");
      // Update the appointment in the state if needed
    } catch (error) {
      console.error("Error rescheduling appointment:", error.response ? error.response.data : error);
      toast.error("Failed to reschedule the appointment. Please try again.");
    }
  };
  

  const handleSubmitReschedule = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const updatedAppointment = {
        date: newDate,
        slot: newTime,
      };

      const response = await API.put(`/api/appointments/${rescheduleAppointment}`, updatedAppointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the appointment in the state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === rescheduleAppointment
            ? { ...appt, date: newDate, slot: newTime }
            : appt
        )
      );

      toast.success("Appointment rescheduled successfully!");
      setRescheduleAppointment(null); // Close the reschedule form
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Failed to reschedule appointment. Please try again.");
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

                {/* Reschedule Button */}
                <button
                  onClick={() => handleReschedule(appointment._id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                  Reschedule
                </button>

                {/* Cancel Appointment Button */}
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

      {/* Reschedule Modal/Form */}
      {rescheduleAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>

            <label className="block text-gray-700">New Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="mb-4 w-full p-2 border rounded-md"
            />

            <label className="block text-gray-700">Available Time Slots</label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="mb-4 w-full p-2 border rounded-md"
            >
              <option value="">Select a time</option>
              {availableSlots.map((slot) => (
                <option key={slot.time} value={slot.time}>
                  {slot.time}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmitReschedule}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Submit Reschedule
            </button>
            <button
              onClick={() => setRescheduleAppointment(null)} 
              className="mt-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
