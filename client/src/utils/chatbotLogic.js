// ---------------------------------------------
// CHATBOT LOGIC (No API Key Required)
// ---------------------------------------------
export const generateResponse = (question) => {
  const q = question.toLowerCase();

  if (q.match(/\b(hi|hello|hey|namaste)\b/)) {
    return "👋 Hello! Welcome to Benevolent World Travel. How can I assist you today?";
  }

  if (q.includes("thank")) {
    return "You're most welcome 😊 Let me know if you need anything else!";
  }

  if (q.match(/\b(bye|goodbye|exit)\b/)) {
    return "👋 Safe travels! Hope to see you again soon.";
  }

  if (q.includes("visa")) {
    if (q.includes("documents")) {
      return "📄 Visa documents usually include passport, photos, bank statement, itinerary & hotel details. Exact requirements depend on the country.";
    }
    if (q.includes("processing")) {
      return "⏳ Visa processing time depends on the country. On average it takes 7–15 working days.";
    }
    return "🛂 We provide visa assistance for multiple countries. Please visit the Visa section or contact our team for exact requirements.";
  }

  if (q.includes("package") || q.includes("tour")) {
    if (q.includes("honeymoon")) {
      return "💑 Yes! We offer special honeymoon packages with romantic stays, candlelight dinners & sightseeing.";
    }
    if (q.includes("family")) {
      return "👨‍👩‍👧‍👦 We have family-friendly packages with comfortable hotels and kid-friendly activities.";
    }
    if (q.includes("group")) {
      return "🧳 Group tour packages are available with special discounts. Ideal for friends & corporate trips.";
    }
    return "🌍 We offer domestic & international holiday packages. Explore the Packages page to find the perfect trip.";
  }

  if (q.includes("dubai")) {
    return "🇦🇪 Dubai packages include city tour, desert safari, Burj Khalifa & shopping experiences.";
  }
  if (q.includes("thailand")) {
    return "🇹🇭 Thailand packages include Phuket, Krabi & Bangkok with island tours and nightlife.";
  }
  if (q.includes("georgia")) {
    return "🇬🇪 Georgia tours include Tbilisi, Kazbegi & wine regions with stunning mountain views.";
  }

  if (q.includes("flight") || q.includes("ticket")) {
    if (q.includes("cheap")) {
      return "✈️ We always try to find the best and cheapest flight fares based on your travel dates.";
    }
    return "✈️ Yes, we assist with domestic & international flight bookings. Visit the Flights section.";
  }

  if (q.includes("price") || q.includes("cost") || q.includes("budget")) {
    return "💰 Package prices depend on destination, hotel category & season. Please check package details for exact pricing.";
  }
  if (q.includes("best time")) {
    return "📅 The best time to travel depends on the destination. Tell me which country you’re planning to visit.";
  }

  if (q.includes("days") || q.includes("duration")) {
    return "⏱️ Most international tours range from 5 to 10 days. Custom durations are also available.";
  }

  if (q.includes("hotel")) {
    return "🏨 We provide 3★, 4★ & 5★ hotel options depending on your package and budget.";
  }

  if (q.includes("car") || q.includes("cab")) {
    return "🚗 Yes, car rental & sightseeing cabs are available in most destinations.";
  }

  if (q.includes("book") || q.includes("booking")) {
    return "📝 You can book directly from our website or contact our team for assisted booking.";
  }

  if (q.includes("payment") || q.includes("pay")) {
    return "💳 We accept UPI, bank transfer & other secure payment methods.";
  }

  if (q.includes("cancel") || q.includes("refund")) {
    return "❗ Cancellation & refund policies vary by package and airline. Please contact support for exact terms.";
  }

  if (q.includes("offer") || q.includes("discount")) {
    return "🎉 Seasonal offers are available! Check our homepage or contact us for current deals.";
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("email")) {
    return "📞 Call us at +91 9871047857 or email support@benevolentworld.com for quick assistance.";
  }
   
  if (q.includes("contact") || q.includes("phone") || q.includes("whatsapp")) {
  return {
    type: "contact",
    text: "📞 You can reach us instantly using WhatsApp or call us directly.",
    phone: "9871047857",
    mapLink: "https://maps.google.com/?q=Benevolent+World+Travel+Dwarka+Delhi"
  };
}

  return "🤔 I’m not sure about that yet. Please rephrase your question or contact our support team for help.";
};
