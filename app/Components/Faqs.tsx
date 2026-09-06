
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What are freeze-dried fruits?",
    answer:
      "Freeze-dried fruits are fresh fruits that go through a low-temperature drying process that removes moisture while helping preserve their natural taste, aroma, and crispy texture.",
  },
  {
    question: "Are ORZINO freeze-dried fruits made from real fruits?",
    answer:
      "Yes. ORZINO products are made using real fruits and are prepared to retain their natural fruity flavor and crunch.",
  },
  {
    question: "What products are currently available?",
    answer:
      "Currently, Mango Slices and Pineapple Slices are available for purchase. More delicious freeze-dried fruit products will be introduced soon.",
  },
  {
    question: 'Why do some products show "Coming Soon"?',
    answer:
      "Some ORZINO products are currently under preparation and will be available soon. Keep checking our website for new product launches.",
  },
  {
    question: "How should I store freeze-dried fruits?",
    answer:
      "Keep the package tightly sealed and store it in a cool, dry place away from direct sunlight and moisture. After opening, reseal the package properly to maintain its crunch.",
  },
  {
    question: "How long do freeze-dried fruits stay fresh?",
    answer:
      "The shelf life depends on the specific product and packaging. Please check the expiry or best-before date printed on the product package.",
  },
  {
    question: "Do you offer different pack sizes?",
    answer:
      "Pack sizes may vary depending on the product. Available weight options are displayed on the respective product page.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Select an available product, choose your preferred quantity, add it to your cart, and proceed with checkout.",
  },
  {
    question: "Will new products be added?",
    answer:
      "Yes! ORZINO is continuously working on bringing more freeze-dried fruits and exciting products. Stay tuned for upcoming launches.",
  },
  {
    question: "How can I contact ORZINO?",
    answer:
      "For questions about products, orders, or availability, you can contact the ORZINO team through the contact details provided on our website.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-12 text-center">

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="text-[#E8115B]">Questions</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Everything you need to know about ORZINO freeze-dried fruits,
            products, orders, and storage.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#E8115B]/30 bg-[#fff7fa] shadow-md"
                    : "border-gray-200 bg-white hover:border-[#E8115B]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8115B]/50"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold sm:text-base ${
                      isOpen ? "text-[#E8115B]" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isOpen
                        ? "bg-[#E8115B] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="border-t border-[#E8115B]/10 px-5 pb-5 pt-4 sm:px-6">
                        <p className="text-sm leading-7 text-gray-600 sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}