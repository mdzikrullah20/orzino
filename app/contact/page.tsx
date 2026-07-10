import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
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
              <p>
                +91 98765 43210
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Mail />
              <p>
                support@freshfruit.com
              </p>
            </div>

            <div className="flex items-center gap-4">
              <MapPin />
              <p>
                Your City, India
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Clock />
              <p>
                Mon - Sun: 8:00 AM - 9:00 PM
              </p>
            </div>

          </div>

        </div>


        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;