"use client";

import React from "react";

// Types
interface InvoiceItem {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  paymentMethod: string;
  paymentStatus: "PAID" | "PENDING" | "COD";
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email: string;
  };
  sellerInfo: {
    name: string;
    address: string;
    cityStateZip: string;
    phone: string;
    email: string;
    gstin: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

// Sample Order Data
const invoiceData: InvoiceData = {
  invoiceNumber: "INV-2026-0892",
  date: "August 23, 2026",
  paymentMethod: "Prepaid (UPI / WhatsApp Pay)",
  paymentStatus: "PAID",
  sellerInfo: {
    name: "Your Brand Name Pvt. Ltd.",
    address: "Building No. 45, Commercial Complex, MG Road",
    cityStateZip: "Gurugram, Haryana - 122002",
    phone: "+91 87577 26925",
    email: "support@yourbrand.com",
    gstin: "07AAAAA0000A1Z5",
  },
  shippingAddress: {
    name: "Rahul Sharma",
    street: "Flat No. 302, Green Valley Apartments, Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
  },
  items: [
    {
      id: "1",
      name: "Gourmet Roasted Makhana Pack (150g)",
      variant: "Flavor: Peri Peri Crunch",
      price: 249,
      quantity: 2,
    },
    {
      id: "2",
      name: "Assorted Dry Fruit Festive Gift Box",
      variant: "Includes Almonds, Cashews, Pistachios (500g)",
      price: 899,
      quantity: 1,
    },
    {
      id: "3",
      name: "Healthy Snacking Combo Pack",
      variant: "Bundle Builder Custom Pack",
      price: 399,
      quantity: 1,
    },
  ],
  subtotal: 1796,
  discount: 100,
  tax: 84.8,
  shipping: 0,
  grandTotal: 1780.8,
};

export default function InvoicePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      {/* Print Action Header */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <h1 className="text-xl font-bold text-slate-800">Order Invoice</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print / Download PDF
        </button>
      </div>

      {/* Printable Invoice Container */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-lg print:shadow-none print:rounded-none border border-slate-200 print:border-none">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              {invoiceData.sellerInfo.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Premium Quality Snack & Gourmet Products
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-wider">
              INVOICE
            </h1>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Invoice No:{" "}
              <span className="text-slate-900">
                {invoiceData.invoiceNumber}
              </span>
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Date: {invoiceData.date}
            </p>
          </div>
        </div>

        {/* Info Grid (Billed From & Shipped To) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-blue-600 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Billed & Shipped From
            </h3>
            <p className="font-semibold text-slate-900">
              {invoiceData.sellerInfo.name}
            </p>
            <p>{invoiceData.sellerInfo.address}</p>
            <p>{invoiceData.sellerInfo.cityStateZip}</p>
            <p className="mt-2">
              <strong className="text-slate-800">Phone:</strong>{" "}
              {invoiceData.sellerInfo.phone}
            </p>
            <p>
              <strong className="text-slate-800">Email:</strong>{" "}
              {invoiceData.sellerInfo.email}
            </p>
            <p>
              <strong className="text-slate-800">GSTIN:</strong>{" "}
              {invoiceData.sellerInfo.gstin}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-blue-600 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
              Customer Shipping Address
            </h3>
            <p className="font-semibold text-slate-900">
              {invoiceData.shippingAddress.name}
            </p>
            <p>{invoiceData.shippingAddress.street}</p>
            <p>
              {invoiceData.shippingAddress.city},{" "}
              {invoiceData.shippingAddress.state} -{" "}
              {invoiceData.shippingAddress.pincode}
            </p>
            <p className="mt-2">
              <strong className="text-slate-800">Phone:</strong>{" "}
              {invoiceData.shippingAddress.phone}
            </p>
            <p>
              <strong className="text-slate-800">Email:</strong>{" "}
              {invoiceData.shippingAddress.email}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="overflow-hidden border border-slate-200 rounded-lg mb-8">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Item Description</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="even:bg-slate-50">
                  <td className="py-3 px-4 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    {item.variant && (
                      <p className="text-[10px] text-slate-500">{item.variant}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">₹{item.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center font-medium">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Details & Calculations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-8">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900">
            <h4 className="font-bold uppercase tracking-wider mb-1 text-[11px]">
              Payment & Order Details
            </h4>
            <p>
              <strong>Payment Method:</strong> {invoiceData.paymentMethod}
            </p>
            <p className="mt-1">
              <strong>Status:</strong>{" "}
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                {invoiceData.paymentStatus}
              </span>
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs text-slate-600 bg-white">
            <div className="flex justify-between py-2 px-4 border-b border-slate-100">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">
                ₹{invoiceData.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2 px-4 border-b border-slate-100 text-green-600">
              <span>Discount</span>
              <span>- ₹{invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 px-4 border-b border-slate-100">
              <span>Estimated GST (5%)</span>
              <span>₹{invoiceData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 px-4 border-b border-slate-100 text-green-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between py-3 px-4 bg-slate-100 font-bold text-sm text-slate-900">
              <span>Grand Total</span>
              <span>₹{invoiceData.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          <p className="font-bold text-slate-800 text-sm mb-1">
            Thank you for your order!
          </p>
          <p>
            If you have questions regarding this invoice, please contact us at:
          </p>
          <p className="mt-1">
            <strong className="text-slate-800">WhatsApp / Call:</strong>{" "}
            {invoiceData.sellerInfo.phone} |{" "}
            <strong className="text-slate-800">Email:</strong>{" "}
            {invoiceData.sellerInfo.email}
          </p>
        </div>
      </div>
    </div>
  );
}