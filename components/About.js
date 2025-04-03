export default function About() {
    return (
      <div className="w-full py-16 bg-white text-center">
        <h2 className="text-4xl font-bold text-sky-600">About Us</h2>

        {/* Mission Section */}
        <p className="text-lg text-gray-700 mt-4 mb-2 font-bold">Mission</p>
        <div className="max-w-xl mx-auto space-y-4">
          <p className="text-gray-600">
            At <strong>Dental Clinic</strong>, our mission is to provide 
            <strong> exceptional dental care</strong> with a focus on <strong>patient comfort, cutting-edge technology, 
            and personalized treatment plans</strong>. We are committed to improving <strong>oral health</strong> and 
            enhancing smiles through high-quality, compassionate, and affordable dental services.
          </p>
        </div>

        {/* Vision Section */}
        <p className="text-lg text-gray-700 mt-6 mb-2 font-bold">Vision</p>
        <div className="max-w-xl mx-auto space-y-4">
          <p className="text-gray-600">
            Our vision is to be a <strong>trusted leader in dental care</strong>, recognized for our commitment to 
            <strong> innovation, patient education, and excellence</strong>. We aspire to transform lives 
            <strong> one smile at a time</strong>, making quality dental services accessible to all.
          </p>
        </div>

        {/* Call to Action */}
        <button 
          className="mt-8 px-6 py-3 bg-sky-500 text-white rounded-full shadow-md text-lg font-semibold 
                     hover:bg-sky-600 transition duration-300"
        >
          Schedule Your Appointment Today
        </button>
      </div>
    );
}
