import FlightCard from '../components/FlightCard'
import Package from "./PackageLink";

const flights = [
  {
    id: 1,
    airline: "Emirates",
    from: "Delhi",
    to: "Dubai",
    duration: "3h 45m",
    price: 18999,
    stops: 0,
    type: "International",
    image: "https://i.pinimg.com/736x/a5/a5/5c/a5a55cb64941cc19262eabd5e35bfdfc.jpg",
  },
  {
    id: 2,
    airline: "Air India",
    from: "Mumbai",
    to: "London",
    duration: "9h 30m",
    price: 45999,
    stops: 1,
    type: "International",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  },
  {
    id: 3,
    airline: "IndiGo",
    from: "Bangalore",
    to: "Delhi",
    duration: "2h 15m",
    price: 5999,
    stops: 0,
    type: "Domestic",
    image: "https://resize.indiatvnews.com/en/resize/oldbucket/355_-/mainnational/IndiGo-plane-ca34334.jpg",
  },
  {
    id: 4,
    airline: "Qatar Airways",
    from: "Delhi",
    to: "Paris",
    duration: "10h 50m",
    price: 51999,
    stops: 1,
    type: "International",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
  },
  {
    id: 5,
    airline: "Vistara",
    from: "Kolkata",
    to: "Mumbai",
    duration: "2h 30m",
    price: 6499,
    stops: 0,
    type: "Domestic",
    image: "https://media.gettyimages.com/id/2170010630/photo/erzurum-turkiye-the-plane-departs-for-frankfurt-germany-after-arriving-in-erzurum-turkiye-to.jpg?s=612x612&w=gi&k=20&c=M0RGTcOF9hWQAv1KxiA7Qzl7kHYfEvSvf4CY2AW8GKE=",
  },
  {
    id: 6,
    airline: "America",
    from: "Delhi",
    to: "USA",
    duration: "19h 50m",
    price: 81999,
    stops: 1,
    type: "International",
    image: "https://images.unsplash.com/photo-1617011302569-ad31a9a5a619?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFtZXJpY2FuJTIwYWlybGluZXN8ZW58MHx8MHx8fDA%3D",
  },
];

const FlightPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Flight Packages
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore the best flight deals for domestic and international destinations.  
          Book your journey with Benevolent World Travel today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight) => (
            <FlightCard key={flight.id} {...flight} />
          ))}
        </div>
      </div>
      <Package />
    </div>
  );
};

export default FlightPage;
