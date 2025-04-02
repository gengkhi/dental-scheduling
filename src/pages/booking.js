import { useState, useEffect } from "react";
import API from "../../utils/api";

export default function Booking() {
  const [dentists, setDentists] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!patientId) {
      const fetchUserDetails = async () => {
        try {
          const response = await API.post(
            "/api/getUserID",
            { email: email },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setPatientId(response.data.userId);
          setPatientEmail(email);
        } catch (err) {
          console.error("Error fetching user details:", err);
          setError("Failed to fetch user details.");
        }
      };
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await API.get("/api/dentists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDentists(response.data);
      } catch (err) {
        console.error("Error fetching dentists:", err);
      }
    };
    fetchDentists();
  }, [token]);

  useEffect(() => {
    if (selectedDentist) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await API.get(`/api/appointments/slots/${selectedDentist}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAvailableSlots(response.data);
        } catch (err) {
          console.error("Error fetching available slots:", err);
        }
      };
      fetchAvailableSlots();
    }
  }, [selectedDentist, token]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedDentist || !selectedSlot || !appointmentDate) {
      setError("Please select all fields.");
      return;
    }
    const payload = {
      patient: patientId,
      email: patientEmail,
      dentist: selectedDentist,
      date: new Date(appointmentDate).toISOString(),
    };
    try {
      const response = await API.post("/api/appointments", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setSuccess("Appointment successfully booked!");
      } else {
        setError(response.data?.message || "Failed to book appointment.");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      setError("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 text-center">Book Your Dental Appointment</h2>
        <p className="text-center text-gray-600 mt-2">Schedule your visit with our professional dentists today.</p>
        <div className="flex justify-center my-4">
          <img src="/images/dental-service.png" alt="Dental Care" className="w-20" />
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-center">{success}</div>}

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="text"
              value={patientEmail}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Dentist</label>
            <select
              className="mt-1 block w-full border border-blue-300 rounded-md p-2 bg-blue-50 text-black"
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
            >
              <option value="">Select a dentist</option>
              {dentists.map((dentist) => (
                <option key={dentist._id} value={dentist._id}>{dentist.name}</option>
              ))}
            </select>
          </div>

          {selectedDentist && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                className="mt-1 block w-full border border-blue-300 rounded-md p-2 bg-blue-50 text-black"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border border-blue-300 rounded-md p-2 bg-blue-50 text-black"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}