import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact eTutor BD</h1>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Have questions or need help? Reach out to us and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-base-100 rounded-2xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-base-content/70">support@etutorbd.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-base-content/70">+880 1XXX-XXXXXX</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-base-content/70">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows="4"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
