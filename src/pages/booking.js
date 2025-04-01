import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api";

export default function Booking() {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await API.get("/api/dentists");
        setDentists(response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    fetchDentists();
  }, []);

  const fetchAvailableSlots = async (dentistId) => {
    try {
      const response = await API.get(`/api/appointments/slots/${dentistId}`);
      console.log(response.data);  
      setAvailableSlots(response.data);  
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const handleDentistChange = (e) => {
    const dentistId = e.target.value;
    setSelectedDentist(dentistId);
    fetchAvailableSlots(dentistId);
  };

  const handleSlotSelection = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleBookAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const response = await API.post(
        "/api/appointments",
        {
          dentistId: selectedDentist,
          slot: selectedSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Appointment Response:", response.data); // Debugging

      alert("Appointment booked successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-[#F0F4F8] p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Book an Appointment</h1>

        {/* Dentist Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Dentist:</label>
          <select
            className="w-full p-2 border rounded-md text-black"
            onChange={handleDentistChange}
            value={selectedDentist}
          >
            <option value="">Select a Dentist</option>
            {dentists.map((dentist) => (
              <option key={dentist._id} value={dentist._id}>
                {dentist.name} - {dentist.specialty}
              </option>
            ))}
          </select>
        </div>

        {availableSlots.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Slot:</label>
            <select
              className="w-full p-2 border rounded-md"
              onChange={handleSlotSelection}
              value={selectedSlot}
            >
              <option value="">Select a Slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Book Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="w-full bg-sky-500 text-white py-2 rounded-md font-bold"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
