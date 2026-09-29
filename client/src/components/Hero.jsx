// https://prod.spline.design/ryNp1KL7is7MgGAR/scene.splinecode


import Spline from "@splinetool/react-spline";
import { assets } from "../assets/assets.js";

export default function Hero() {
  return (
    <div className="bg-gray-100 p-2">

      <div
        className="
          relative
          w-full

          /* Mobile */
          h-[500px]

          /* Tablet */
          sm:h-[600px]

          /* Laptop */
          lg:h-[80vh]

          rounded-2xl
          lg:rounded-3xl
          overflow-hidden
        "
      >

        {/* Background Image */}
        <div
          className="
            absolute
            inset-0
            bg-no-repeat

            /* MOBILE */
            bg-[length:100%_100%]
            bg-center

            /* TABLET */
            sm:bg-[length:100%_100%]

            /* DESKTOP */
            lg:bg-cover
            lg:bg-center
          "
          style={{
            backgroundImage: `url(${assets.banner})`,
          }}
        />

        {/* Spline */}
        <div
          className="
            absolute
            z-10

            /* ================= MOBILE ================= */

            w-[65%]
            h-[250px]

            right-[-5%]
            bottom-[-10px]

            scale-[0.8]


            /* ================= TABLET ================= */

            sm:w-[60%]
            sm:h-[350px]

            sm:right-[-2%]
            sm:bottom-[-10px]

            sm:scale-[0.9]


            /* ================= DESKTOP ================= */

            lg:top-24
            lg:left-1/2

            lg:right-auto
            lg:bottom-auto

            lg:w-[50%]
            lg:h-[74vh]

            lg:scale-[1.2]
          "
        >
          <Spline
            scene="https://prod.spline.design/50pUCy5UE2uGEY-H/scene.splinecode"
          />
        </div>

      </div>
    </div>
  );
}