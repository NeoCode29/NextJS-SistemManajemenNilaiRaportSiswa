import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Student {
    id: string;
    name: string;
    class: string;
    gender: string;
    address: string;
}

interface DialogContextType {
  isOpen: boolean;
  dialogData: Student | null;
  openDialog: (data: Student) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState<Student | null>(null);

  const openDialog = (data: Student) => {
    setDialogData(data);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogData(null);
  };

  return (
    <DialogContext.Provider value={{ isOpen, dialogData, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};