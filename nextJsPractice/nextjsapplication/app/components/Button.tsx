
"use client";
import React from 'react'

const Button = () => {
  return (
    <div>
        <button id="wallet" type="button" className="px-16 py-2 relative text-md font-medium items-center overflow-hidden justify-end bg-black rounded-2xl text-white bg-gradient-to-br from-black to-blue-500 group-hover:from-blue-600 hover:to-blue-700"> <svg className="object-left" xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 256 417"><path fill="#343434" d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"/><path fill="#8c8c8c" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3c3c3b" d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"/><path fill="#8c8c8c" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="m127.961 287.958l127.96-75.637l-127.96-58.162z"/><path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z"/></svg>
            <span className="">Connect with Wallet</span>
        </button>
      
    </div>
  )
}

export default Button
