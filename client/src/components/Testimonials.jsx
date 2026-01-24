
const Testimonials = () => {
  // Array of testimonial data, including image URLs and names
  const testimonialsData = [
    {
      text: "TrueTravels made my dream vacation a reality! Every detail was perfect, from the flights to the luxurious resort. Highly recommend!",
      name: "Jane Doe",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" // Realistic image for Jane Doe
    },
    {
      text: "The customer service was exceptional. They helped us plan an unforgettable honeymoon. We'll definitely use TrueTravels again.",
      name: "John Smith",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" // Realistic image for John Smith
    },
    {
      text: "I've traveled all over the world, and TrueTravels consistently provides the best experiences. Their curated destinations are top-notch.",
      name: "Emily White",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" // Realistic image for Emily White
    }
  ];

  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Testimonials</h1>
      <p className="py-4 text-lg text-gray-600">What our clients are saying about TrueTravels.</p>
      
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center border border-blue-200">
            {/* Person's Image */}
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-500" 
            />
            {/* Testimonial Text */}
            <p className="text-gray-700 italic mb-4">
              "{testimonial.text}"
            </p>
            {/* Person's Name */}
            <p className="font-bold text-blue-600">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
