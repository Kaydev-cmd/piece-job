import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  const thisYear = new Date().getFullYear();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <footer className="bg-gradient-to-b from-[#F1F5F94D]/30 to-[#1118270D]/5  ">
        <div
          className="container mx-auto px-4 py-16 "
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            // paddingLeft: "4px",
            // paddingRight: "4px",
          }}
        >
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            style={{ marginBottom: "12px" }}
          >
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-2 mb-6"
                style={{ marginBottom: "6px" }}
              >
                <div className="w-10 h-10 bg-[linear-gradient(135deg,#1D4ED8,#10B981)] rounded-lg flex items-center justify-center ">
                  <span className="text-[#F8FAFC80] text-xl font-900">P</span>
                </div>
                <span className="text-2xl font-bold text-[#111827FF]">
                  PieceJob
                </span>
              </div>
              <p
                className="text-[#6B7280FF] text-start text-xl font-semibold mb-6 leading"
                style={{ marginBottom: "6px" }}
              >
                Where skills meet opportunity. Connect with flexible work
                opportunities and turn your skills into income with instant
                payments.
              </p>
              <div className="flex gap-3  items-center">
                <button className="hover:border ">
                  <FaFacebookF size={20} />
                </button>
                <button className="hover:border items-center">
                  <FaTwitter size={20} />
                </button>
                <button className="hover:border ">
                  <FaInstagramSquare size={20} />
                </button>
                <button className="hover:border ">
                  <FaLinkedin size={20} />
                </button>
              </div>
            </div>
            {/* Links */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4
                  className="text-xl font-bold text-[#111827] mb-6"
                  style={{ marginBottom: "6px" }}
                >
                  For Job Seekers
                </h4>
                <ul className=" flex flex-col gap-2 space-y-6">
                  <li>
                    <Link
                      href={"/jobs"}
                      className=" text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/signup"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Create Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#how"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/reviews"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Success Stories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Download App
                    </Link>
                  </li>
                </ul>
              </div>
              {/* For Employer Links */}
              <div>
                <h4
                  className="text-xl font-bold text-[#111827] "
                  style={{ marginBottom: "6px" }}
                >
                  For Job Posters
                </h4>
                <ul className="flex flex-col gap-2 space-y-3">
                  <li>
                    <Link
                      href={"/jobaplicants"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/jobaplicants"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Find Workers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/jobaplicants"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/jobaplicants"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Business Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/job-applicants"}
                      className="text-[#6B7280FF] text-lg font-bold hover:text-[#1D4ED8] transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4
                className="text-xl font-bold text-[#111827] mb-6"
                style={{ marginBottom: "6px" }}
              >
                Get in Touch
              </h4>
              <div className="flex flex-col gap-2 space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-[#1D4ED8FF]" />
                  <span className="text-[#6B7280FF] text-lg font-bold">
                    titan@piecejob.co.za
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-[#1D4ED8FF]" />
                  <span className="text-[#6B7280FF] text-lg font-bold">
                    +27 01 123 4789
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-[#1D4ED8FF]" />
                  <span className="text-[#6B7280FF] text-lg font-bold">
                    Pretoria, South Africa
                  </span>
                </div>
              </div>
              {/* letter */}
              <div className="mt-8" style={{ marginTop: "8px" }}>
                <h5
                  className="text-xl font-semibold text-[#111827] mb-8"
                  style={{ marginBottom: "8px" }}
                >
                  Stay Updated
                </h5>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 text-lg px-3 py-2 text-[#111827FF] bg-[#ffffff] border-2 border-gray-300 rounded-lg "
                    style={{ padding: "8px" }}
                  />
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-bold  text-white bg-[#1D4ED8] hover:bg-[#1D4ED8FF]/90 shadow-medium hover:shadow-strong">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr
            className="mb-28 h-[1px] w-full"
            style={{ marginBottom: "8px" }}
          />

          {/* Bottom Footer  */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-md text-[#6B7280FF]">
              © {thisYear} PieceJob. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6">
              <Link
                href={"#"}
                className="text-md text-[#6B7280FF] hover:text-[#1D4ED8] transition-colors "
              >
                Privacy Policy
              </Link>
              <Link
                href={"#"}
                className="text-md text-[#6B7280FF] hover:text-[#1D4ED8] transition-colors "
              >
                Terms of Service
              </Link>
              <Link
                href={"#"}
                className="text-md text-[#6B7280FF] hover:text-[#1D4ED8] transition-colors "
              >
                Cookie Policy
              </Link>
              <Link
                href={"#"}
                className="text-md text-[#6B7280FF] hover:text-[#1D4ED8] transition-colors "
              >
                Help Center
              </Link>
            </div>
          </div>
          {/* fnb */}
          <div className="mt-8 text-center" style={{ marginTop: "10px" }}>
            <div className="inline-flex flex-col gap-4">
              <div
                className="bg-slate-500/80 rounded-lg text-[#ffffff] inline-flex flex-row-reverse items-center justify-center gap-4 lg:text-lg"
                style={{ padding: "16px" }}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-blue-700 font-bold text-xl">FNB</h3>
                </div>
                Secure Payments Powered by
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
