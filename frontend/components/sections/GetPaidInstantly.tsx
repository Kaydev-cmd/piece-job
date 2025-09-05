import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import { TiTick } from "react-icons/ti";
import { GET_PAID_INSTANTLY_DATA } from "@/constants";
import { motion } from "framer-motion";

const GetPaidInstantly = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <section className="container" style={{ paddingTop: "0" }}>
        <div className="flex flex-col-reverse items-center gap-6 xl:flex-row">
          <Image
            src="/assets/instant_payments/instantPayments.jpg"
            alt="Instant payments"
            width={500}
            height={500}
            className="w-full rounded-xl lg:w-1/2 xl:w-[1100px]"
          />
          <div className="flex flex-col items-center text-center lg:text-start lg:items-start">
            <div
              className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-full"
              style={{ padding: "12px" }}
            >
              ⚡ Powered by FNB
            </div>
            <h1
              className="text-6xl font-semibold lg:text-7xl"
              style={{ margin: "16px 0" }}
            >
              Get Paid{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                Instantly
              </span>{" "}
              Every Time
            </h1>
            <p
              className="text-slate-500 font-semibold lg:text-lg"
              style={{ marginBottom: "16px" }}
            >
              No more waiting weeks for payments. With FNB&apos;s secure payment
              solutions, your earnings hit your account the moment you complete
              a job.
            </p>
            <div className="flex flex-col gap-2">
              {GET_PAID_INSTANTLY_DATA.map((data) => (
                <div key={data.id} className="flex items-center gap-2">
                  <div
                    className="bg-green-500 rounded-full"
                    style={{ padding: "6px" }}
                  >
                    <TiTick size={20} color="#fff" />
                  </div>
                  <p className="text-slate-500 font-semibold">
                    {data.description}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "32px" }}>
              <Button title="Start Earning Now" variant="green" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default GetPaidInstantly;
