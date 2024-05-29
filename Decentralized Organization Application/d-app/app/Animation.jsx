"use client";
import lottie from "lottie-web";
import { useRef, useEffect } from "react";

// My animation from lottie was rendering twice so took the help from stack overflow (link given below) to solve the issue.
export default function Animation(props) {
  console.log(props);

  const lottieContainer = useRef(null);

  //reference from internet : https://medium.com/@surksha8/render-animation-from-json-file-using-lottie-web-libarary-in-nextjs-ab18fb628e82
  // stack overfloat : https://stackoverflow.com/questions/72031767/use-effect-is-repeating-lottie-animation

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      autoplay: true,
      path: props.url,
    });

    return () => instance.destroy();
  }, []);

  return (
    <div>
      <div
        ref={lottieContainer}
        style={{ width: props.width, height: props.height }}
      >
        {" "}
      </div>
    </div>
  );
}

//  <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>

// <dotlottie-player src="https://lottie.host/de1414bb-4f16-4e68-a7a0-083ef4842f74/UgXa0nE1Bh.json" background="transparent" speed="0.5" style="width: 700px; height: 700px;" loop autoplay></dotlottie-player>

// </>
