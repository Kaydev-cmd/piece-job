import Link from "next/link";
import React from "react";
import {
  FOOTER_LINKS,
  FOR_JOB_POSTERS_LINKS,
  FOR_JOB_SEEKERS_LINKS,
} from "@/constants";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Mail, MapPin, Phone } from "lucide-react";
import Button from "../common/Button";

const Footer = () => {
  return (
    <footer className="container flex flex-col items-center">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex flex-col items-center gap-4 lg:w-[20%] lg:items-start">
          <div className="flex items-center gap-2">
            {/* Icon here... */}
            <p
              className="text-white font-bold text-center bg-[linear-gradient(135deg,#1D4ED8,#10B981)] rounded-xl w-10"
              style={{ padding: "8px" }}
            >
              P
            </p>
            <Link href={"/"} className="font-bold text-xl">
              PieceJob
            </Link>
          </div>

          {/* Description here... */}
          <p className="text-slate-500 text-center lg:text-start">
            Where skills meet opportunity. Connect with flexible work
            opportunities and turn your skills into income with instant payments
          </p>

          {/* Icons here... */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <div
              className="bg-white border-1 border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              style={{ padding: "12px" }}
            >
              <FiFacebook size={20} />
            </div>

            {/* Twitter */}
            <div
              className="bg-white border-1 border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              style={{ padding: "12px" }}
            >
              <FiTwitter size={20} />
            </div>

            {/* Instagram */}
            <div
              className="bg-white border-1 border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              style={{ padding: "12px" }}
            >
              <FiInstagram size={20} />
            </div>

            {/* LinkedIn */}
            <div
              className="bg-white border-1 border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              style={{ padding: "12px" }}
            >
              <FiLinkedin size={20} />
            </div>
          </div>
        </div>

        {/* For Job Seekers */}
        <div className="flex flex-col gap-2 text-center lg:w-[20%]">
          <h2 className="text-lg text-slate-800 font-bold">For Job Seekers</h2>
          <div className="flex flex-col gap-2">
            {FOR_JOB_SEEKERS_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="text-slate-500 hover:text-blue-500"
              >
                {link.linkName}
              </Link>
            ))}
          </div>
        </div>

        {/* For Job Posters */}
        <div className="flex flex-col gap-2 text-center lg:w-[20%]">
          <h2 className="text-lg text-slate-800 font-bold">For Job Posters</h2>
          <div className="flex flex-col gap-2">
            {FOR_JOB_POSTERS_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className="text-slate-500 hover:text-blue-500"
              >
                {link.linkName}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-start">
          {/* Get In Touch */}
          <div className="flex flex-col gap-2 text-center lg:text-start">
            <h2 className="text-lg text-slate-800 font-bold">Get In Touch</h2>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="text-blue-500" />
                <p className="text-slate-500">hello@piecejob.co.za</p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="text-blue-500" />
                <p className="text-slate-500">+27 11 123 4567</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500" />
                <p className="text-slate-500">Johannesburg, South Africa</p>
              </div>
            </div>
          </div>

          {/* Stay Updated */}
          <div className="flex flex-col gap-2 text-center lg:text-start">
            <h2 className="text-lg text-slate-800 font-bold">Stay Updated</h2>
            <div className="flex flex-col flex-wrap gap-3 lg:flex-row lg:gap-1">
              <input
                type="text"
                placeholder="Enter your email..."
                className="w-full"
              />
              <Button
                title="Subscribe"
                variant="subscribe"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <hr
        className="text-slate-300 h-2 w-full"
        style={{ marginTop: "16px", marginBottom: "16px" }}
      />

      <div className="flex flex-col gap-2 text-center text-slate-500 lg:flex-row">
        {/* Links */}
        {FOOTER_LINKS.map((link) => (
          <Link key={link.id} href={link.path} className="hover:text-blue-500">
            {link.linkName}
          </Link>
        ))}
      </div>

      <div
        className="bg-white rounded-4xl"
        style={{ padding: "16px", marginTop: "16px" }}
      >
        <p>
          Secure payments powered by{" "}
          <span className="text-blue-500 font-bold">FNB</span>
        </p>
      </div>

      <p className="text-slate-500" style={{ marginTop: "16px" }}>
        &copy; 2025 PieceJob. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
