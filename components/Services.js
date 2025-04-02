import { motion } from "framer-motion";

export default function Services() {
  const services = [
    { title: "Teeth Cleaning", description: "Professional cleaning to keep your teeth healthy and fresh." },
    { title: "Dental Fillings", description: "Restore decayed or damaged teeth with high-quality fillings." },
    { title: "Teeth Whitening", description: "Brighten your smile with our safe and effective whitening treatment." },
    { title: "Braces & Invisalign", description: "Align your teeth for a perfect smile with our orthodontic solutions." },
    { title: "Root Canal Treatment", description: "Save infected teeth and relieve pain with expert care." },
    { title: "Dental Implants", description: "Replace missing teeth with durable and natural-looking implants." },
  ];

  return (
    <div className="w-full py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-sky-600">Our Services</h2>
      <p className="text-lg text-gray-700 mt-4 mb-6">We offer a range of dental services to keep your smile healthy.</p>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold text-sky-600">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <button 
        className="mt-8 px-6 py-3 bg-sky-500 text-white rounded-full shadow-md text-lg font-semibold hover:bg-sky-600 transition duration-300"
      >
        Learn More
      </button>
    </div>
  );
}
