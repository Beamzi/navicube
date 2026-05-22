"use client";

import React, { useState } from "react";
import { LiaGithub } from "react-icons/lia";
import { LuMail, LuPhone } from "react-icons/lu";
import ContactModal from "./ContactModal";

export default function HeaderTopBar() {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <header className="h-8 w-full fixed items-center align-middle top-0 left-0 bg-neutral-900 text-neutral-200 border-b-1 border-neutral-600 z-300  flex justify-between ">
      <div className="flex justify-center items-center px-5">
        <img
          src="/logo/2.svg"
          className="w-7 h-7 mx-1 mr-2 "
          alt="Manaboard logo"
        ></img>
        <p className="sm:hidden h-5">James Day</p>
        <p className="invisible sm:visible absolute sm:relative h-5">
          Navicube
        </p>
      </div>
      <div className="h-7 flex [&>*]:px-5  ">
        <button
          onClick={() => setShowContactModal(true)}
          className="group w-full h-full flex align-middle text-center content-center items-center"
        >
          <LuMail className="cursor-pointer group-hover:scale-120  transition-all group-hover:text-amber-500 duration-300 w-5 h-5" />
        </button>
        <button
          onClick={() => setShowContactModal(true)}
          className="cursor-pointer group w-full h-full flex align-middle text-center content-center items-center"
        >
          <LuPhone className="group-hover:scale-120  transition-all group-hover:text-amber-500 duration-300 w-5 h-5" />
        </button>

        <a
          href="https://github.com/Beamzi/"
          rel="nooopener noreferrer"
          target="ublank"
          className="group flex content-center items-center align-middle  w-full h-full"
        >
          <LiaGithub className="cursor-pointer group-hover:scale-120  transition-all group-hover:text-amber-500 duration-300 w-6 h-6" />
        </a>
      </div>
      <ContactModal
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
      />
    </header>
  );
}
