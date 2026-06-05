/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import PopupForm from "./PopupForm";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openPopup = () => setOpen(true);
  const closePopup = () => setOpen(false);

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}

      {/* GLOBAL POPUP (ONLY ONCE) */}
      <PopupForm open={open} onClose={closePopup} />
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);