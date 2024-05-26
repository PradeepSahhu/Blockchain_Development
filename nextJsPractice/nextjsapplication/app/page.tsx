import Image from 'next/image'
import Delottie from "./Delottie";
import Button from './components/Button';
import ButtonSytle from './components/ButtonSytle';

export default function Home() {
  return (
    <>
    <div className="bg-blue-950 grid grid-cols-5">
    <nav  className="px-5 py-6 space-x-4 bg-black col-start-1 col-end-6">
        <svg className="absolute m-0 top-1"  xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 512 512"><path fill="navy" d="M126.12 315.1A47.06 47.06 0 1 1 79.06 268h47.06Zm23.72 0a47.06 47.06 0 0 1 94.12 0v117.84a47.06 47.06 0 1 1-94.12 0Zm47.06-188.98A47.06 47.06 0 1 1 244 79.06v47.06Zm0 23.72a47.06 47.06 0 0 1 0 94.12H79.06a47.06 47.06 0 0 1 0-94.12Zm188.98 47.06a47.06 47.06 0 1 1 47.06 47.1h-47.06Zm-23.72 0a47.06 47.06 0 0 1-94.12 0V79.06a47.06 47.06 0 1 1 94.12 0ZM315.1 385.88a47.06 47.06 0 1 1-47.1 47.06v-47.06Zm0-23.72a47.06 47.06 0 0 1 0-94.12h117.84a47.06 47.06 0 1 1 0 94.12Z"/></svg><p className="text-white absolute">Pradeep Sahu</p>
        <ul className="flex space-x-10 text-white  justify-end">
            <li className="cursor-pointer hover:text-red-500" >Home</li>
            <li className="cursor-pointer hover:text-red-500"> <a href="https://etherscan.io/" target="_blank">Etherscan</a> </li>
            <li className="cursor-pointer hover:text-red-500">Gallery</li>
            <li className="cursor-pointer hover:text-red-500">Github</li>
        </ul>
    </nav>
    <main className="text-white flex justify-center col-start-4 col-end-6 space-x-8 row-span-2 items-center">

      <Button/>
      <ButtonSytle/>
 
        
        
    </main>
    <div className="col-start-1 col-end-4 auto-cols-auto">
      <Delottie url={"https://lottie.host/de1414bb-4f16-4e68-a7a0-083ef4842f74/UgXa0nE1Bh.json"} height={727} width={800}/>
    </div>
    </div>

    </>
   
  )
}
