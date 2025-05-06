import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});
import animation from "../../assets/Limi/animationbubletwo.json";

export default function LimiBotAnimation({
  height = "200px",
  width = "200px",
}) {
  return (
    <Lottie
      onClick={() => console.log("Animation clicked!")}
      className="lottie"
      animationData={animation}
      loop={true}
      style={{
        width,
        height,
      }}
    />
  );
}
