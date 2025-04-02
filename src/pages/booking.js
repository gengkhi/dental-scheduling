import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";



export default function Booking() {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    const fetchDentists = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await API.get("/api/dentists");
        setDentists(response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
        toast.error("Failed to fetch dentists. Please try again."); // Custom error toast
      } finally {
        setLoading(false); // Set loading to false after request finishes
      }
    };

    fetchDentists();
  }, [router]);

  // Fetch available slots based on selected dentist
  const fetchAvailableSlots = async (dentistId) => {
    setLoading(true);
    try {
      const response = await API.get(`/api/appointments/slots/${dentistId}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      toast.error("Failed to fetch available slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle dentist selection
  const handleDentistChange = (e) => {
    const dentistId = e.target.value;
    setSelectedDentist(dentistId);
    setAvailableSlots([]); // Reset available slots when dentist changes
    setSelectedSlot(null); // Reset selected slot
    fetchAvailableSlots(dentistId);
  };

  // Handle slot selection
  const handleSlotSelection = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Handle appointment booking
  const handleBookAppointment = async () => {
    if (!selectedDentist || !selectedSlot) {
      toast.warning("Please select a dentist and a time slot."); 
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      // Decode token to get userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const dateString = `${selectedSlot} 2025`;
      const formattedDate = moment(dateString, "hh:mm A YYYY").toISOString();
      const API_URL = "http://localhost:5000";

      if (!userId) {
        toast.error("Failed to retrieve user information. Please log in again.");
        router.push("/");
        return;
      }

      const response = await axios.post(`${API_URL}/api/appointments`, {
        patient: userId,
        dentist: selectedDentist,
        date: formattedDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Appointment booked successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-[#F0F4F8] p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Book an Appointment</h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>} {/* Loading indicator */}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Dentist:</label>
          <select
            className="w-full p-2 border rounded-md text-black"
            onChange={handleDentistChange}
            value={selectedDentist}
            disabled={loading} // Disable select while loading
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
              disabled={loading} // Disable select while loading
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
