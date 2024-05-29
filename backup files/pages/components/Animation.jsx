"use client";

import lottie from "lottie-web";

import { useRef, useEffect } from "react";
export default function Animation(props) {
  // link : <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

  const animationPlayer = useRef(null);

  useEffect(() => {
    const tempAnimation = lottie.loadAnimation({
      container: animationPlayer.current,
      renderer: "svg",
      autoplay: true,
      path: props.url,
    });

    return () => tempAnimation.destroy();
  }, []);

  return (
    <div className="flex justify-center col-start-1 col-end-3 col-span-2">
      <div ref={animationPlayer} style={{ height: 400, width: 400 }}></div>
    </div>
  );
}

// <dotlottie-player
//     src="https://lottie.host/18a00a90-01c1-49c9-befd-2fae3df6eed8/mz7po5R0pC.json"
//     background="transparent"
//     speed="1"
//     style="width: 300px; height: 300px;"
//     loop
//     autoplay
//   ></dotlottie-player>;
