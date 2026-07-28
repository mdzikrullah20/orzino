"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const whatsappNumber = "919572193272";

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

    // Optional: Clear form after sending
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          Contact Us
        </h1>
        <p className="mt-3 text-gray-600">
          Have questions? We are happy to help you.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-2xl bg-[#1B4332] p-8 text-white">
          <h2 className="mb-6 text-2xl font-bold">
            Get In Touch
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Phone />
              <p>+91 95721 93272</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail />
              <p>support@freshfruit.com</p>
            </div>

            <div className="flex items-center gap-4">
              <MapPin />
              <p>Noida, Uttar Pradesh, India</p>
            </div>

            <div className="flex items-center gap-4">
              <Clock />
              <p>Mon - Sun: 8:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
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
              className="w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              required
              className="w-full rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#40916C] py-3 font-semibold text-white transition hover:bg-[#1B4332]"
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