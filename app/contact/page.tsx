'use client'
import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "917360886960";

    const text = `
*New Contact Request*

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}

📝 Message:
${form.message}
`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3">
          Have questions? We are happy to help you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-green-700 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Get In Touch
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Phone />
              <p>+91 7360886960</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail />
              <p>support@freshfruit.com</p>
            </div>

            <div className="flex items-center gap-4">
              <MapPin />
              <p>Delhi, India</p>
            </div>

            <div className="flex items-center gap-4">
              <Clock />
              <p>Mon - Sun: 8:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className=" cursor-pointer w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;