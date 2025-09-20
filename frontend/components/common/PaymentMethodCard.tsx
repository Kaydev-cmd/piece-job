import React from "react";
import { IoCardOutline } from "react-icons/io5";
import Pill from "./Pill";
import { useForm } from "react-hook-form";
import { PaymentMethodFormProps } from "@/interfaces";

const PaymentMethodCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentMethodFormProps>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  return (
    <div
      className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
      style={{ marginTop: "32px" }}
    >
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <IoCardOutline size={30} color="#3B82F6" />
        <h1 className="text-2xl font-bold">Payment Method</h1>
      </div>
      <p className="text-slate-500">Choose your FNB payment option</p>

      {/* Payment Form here... */}
      <form style={{ marginTop: "16px" }}>
        <div className="flex flex-col gap-3 w-full">
          {/* FNB eWallet */}
          <label className="w-full cursor-pointer">
            <input type="radio" name="payment" className="peer hidden" />
            <div
              className="flex items-center justify-between gap-3 w-full rounded-lg border-2 border-gray-300
                 peer-checked:bg-blue-300/20 peer-checked:border-blue-500
                 transition"
              style={{ padding: "8px" }}
            >
              <div className="flex items-center gap-3">
                {/* Radio Icon */}
                <div className="flex items-center">
                  <div
                    className="h-5 w-5 rounded-full border-2 border-gray-400
                  peer-checked:border-blue-500 flex items-center justify-center"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500 peer-checked:block hidden"></div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h1 className="font-semibold text-lg text-gray-800">
                    FNB eWallet
                  </h1>
                  <p className="text-sm text-gray-500">
                    Instant mobile payment
                  </p>
                </div>
              </div>

              {/* Pill */}
              <div>
                <Pill title="Recommended" variant="recommended" />
              </div>
            </div>
          </label>

          {/* FNB Banking App */}
          <label className="w-full cursor-pointer">
            <input type="radio" name="payment" className="peer hidden" />
            <div
              className="flex items-center gap-3 w-full rounded-lg border-2 border-gray-300
                 peer-checked:bg-blue-300/20 peer-checked:border-blue-500
                 transition"
              style={{ padding: "8px" }}
            >
              <div className="flex items-center">
                <div
                  className="h-5 w-5 rounded-full border-2 border-gray-400
                        peer-checked:border-blue-500 flex items-center justify-center"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500 peer-checked:block hidden"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg text-gray-800">
                  FNB Banking App
                </h1>
                <p className="text-sm text-gray-500">
                  Pay via your banking app
                </p>
              </div>
            </div>
          </label>

          {/* PayShap */}
          <label className="w-full cursor-pointer">
            <input type="radio" name="payment" className="peer hidden" />
            <div
              className="flex items-center gap-3 w-full rounded-lg border-2 border-gray-300
                 peer-checked:bg-blue-300/20 peer-checked:border-blue-500
                 transition"
              style={{ padding: "8px" }}
            >
              <div className="flex items-center">
                <div
                  className="h-5 w-5 rounded-full border-2 border-gray-400
                        peer-checked:border-blue-500 flex items-center justify-center"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500 peer-checked:block hidden"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg text-gray-800">PayShap</h1>
                <p className="text-sm text-gray-500">Quick QR code payment</p>
              </div>
            </div>
          </label>
        </div>

        <hr className="text-gray-300" style={{ margin: "32px 0" }} />

        {/* Phone Number here... */}
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="phoneNumber" className="font-semibold">
            Your Phone Number
          </label>
          <input
            type="text"
            placeholder="081 234 5678"
            {...register("phoneNumber", {
              required: "Phone number is required.",
              pattern: {
                value: /^(?:\+27|0)\d{9}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          <p className="text-center text-red-500">
            {errors.phoneNumber?.message}
          </p>
        </div>

        {/* Secure Payment here... */}
        <div
          className="border-2 border-orange-300 bg-orange-400/10 rounded-lg"
          style={{ padding: "16px", marginTop: "32px" }}
        >
          <p>
            <span className="font-bold">Secure Payment: </span>Payment will be
            held securely until job completion is confirmed by both parties.
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodCard;
