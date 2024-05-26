import React from 'react'

type Props = {}

function ButtonSytle({}: Props) {
  return (
    <button  type="button" className="relative inline-flex items-center justify-end px-0.5 py-1 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-900 group-hover:from-cyan-500 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="3em" viewBox="0 0 256 417"><path fill="#343434" d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"/><path fill="#8c8c8c" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3c3c3b" d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"/><path fill="#8c8c8c" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="m127.961 287.958l127.96-75.637l-127.96-58.162z"/><path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z"/></svg>
    <span className="relative px-3 py-6 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0 "> Connect to Ethereum Wallet </span>
</button>
  )
}

export default ButtonSytle