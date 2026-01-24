// About.jsx
import LogoImg from "../assets/real_logo.jpeg";
import SanaImg from "../assets/sana.png";
import RuksharImg from "../assets/rukshars.jpeg";
import DanishImg from "../assets/danish.jpeg"; // replace with correct filename if needed

const teamMembers = [
  {
    id: 1,
    name: "Sana Siddiqui",
    image: SanaImg,
  },
  {
    id: 2,
    name: "Rukshar Khan",
    image: RuksharImg,
  },
  {
    id: 3,
    name: "Md Danish",
    image: DanishImg,
  },
];


const AboutPage = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            About Benevolent World Travel
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We craft unforgettable travel experiences tailored to your passions, interests, and schedule.
          </p>
        </div>

        {/* Our Story */}
        <div className="md:flex md:items-center md:gap-12">
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Founded in 2025, Benevolent World Travel has helped thousands of travelers explore the world with ease. 
              Our mission is to make travel planning simple, safe, and enjoyable for everyone.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From curated packages to personalized itineraries, we ensure every trip is a seamless and memorable adventure.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <img
              src={LogoImg}
              alt="Travel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">Integrity</h3>
              <p className="mt-2 text-gray-600">
                We maintain transparency and honesty in all our services and interactions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
              <p className="mt-2 text-gray-600">
                We aim for the highest standards in travel planning and customer service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">Adventure</h3>
              <p className="mt-2 text-gray-600">
                We encourage exploration and creating unforgettable experiences for every traveler.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{member.name}</h3>
                {/* <p className="mt-1 text-gray-600">{member.role}</p> */}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Start Your Journey With Us</h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Contact us today and let’s plan your next unforgettable adventure.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-md font-medium shadow"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
