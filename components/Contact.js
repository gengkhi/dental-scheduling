export default function Contact() {
    return (
      <div className="w-full py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-sky-600">Contact Us</h2>
        <p className="text-lg text-gray-700 mt-4 mb-6">
          Get in touch with our dental experts for inquiries and appointments.
        </p>
        
        <div className="max-w-xl mx-auto space-y-4">
          <p className="text-gray-600">
            📍 Address: 123 Dental Street, Smile City, USA
          </p>
          <p className="text-gray-600">
            📞 Phone: (123) 456-7890
          </p>
          <p className="text-gray-600">
            📧 Email: contact@dentalclinic.com
          </p>
        </div>
  
        <button 
          className="mt-6 px-6 py-3 bg-sky-500 text-white rounded-full shadow-md text-lg font-semibold hover:bg-sky-600 transition duration-300"
        >
          Book an Appointment
        </button>
      </div>
    );
  }
  