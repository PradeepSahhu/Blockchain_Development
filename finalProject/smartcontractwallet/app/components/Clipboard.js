// components/ClipboardButton.js

"use client";
import { useEffect, useRef, useState } from "react";
import Clipboard from "clipboard";

function ClipButton(value) {
  const buttonRef = useRef(null);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    console.log(value);
    const clipboard = new Clipboard(buttonRef.current, {
      text: value.text,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <>
      <input type="hidden" id="hs-clipboard-tooltip" value={value.text} />

      <button
        ref={buttonRef}
        type="button"
        className="js-clipboard-example [--trigger:focus] hs-tooltip relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono font-extrabold  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        data-clipboard-target="#hs-clipboard-tooltip"
        data-clipboard-action="copy"
        data-clipboard-success-text="Copied"
        onClick={() => setCopy(true)}
      >
        {value.text}
        <span className="border-s ps-3.5 dark:border-neutral-700">
          {!copy && (
            <svg
              className="js-clipboard-default size-4 group-hover:rotate-6 transition"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            </svg>
          )}
          {copy && (
            <svg
              className="js-clipboard-success size-4 text-blue-600 rotate-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>

        <span
          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-neutral-700"
          role="tooltip"
        >
          Copied
        </span>
      </button>
    </>
  );
}

export default ClipButton;
