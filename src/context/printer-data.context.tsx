import { Printer, PrinterDataContextProps } from "@/interfaces/Printer.interface";
import { changePrinter, createPrinter, deletePrinter, getAllPrinters } from "@/utils/firebase";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const PrinterDataContext = createContext<{
  printerItems: Printer[];
  addPrinter: (printer: Printer) => void;
  removePrinter: (printer: Printer) => void;
  updatePrinter: (printer: Printer) => void;
}>({
  printerItems: [],
  addPrinter: () => {},
  removePrinter: () => {},
  updatePrinter: () => {},
});

export const PrinterDataProvider = ({ children }: PrinterDataContextProps) => {
  const [printerItems, setPrinterItems] = useState<Printer[]>([]);

  useEffect(() => {
    const getAsyncPrinters = async () => {
      const printers = await getAllPrinters();
      setPrinterItems(printers);
    };
    getAsyncPrinters();
  }, []);

  const addPrinter = async (printerToAdd: Printer) => {
    const existingIp = printerItems.find((printer) => printer.printer_ip === printerToAdd.printer_ip);

    if (existingIp) {
      toast.warning("It seems this IP already exists. Select a new IP.");
    } else {
      await createPrinter(printerToAdd);
      setPrinterItems([...printerItems, printerToAdd]);
      toast.success("Printer added successfully!");
    }
  };

  const removePrinter = async (printerToRemove: Printer) => {
    const printerExists = printerItems.some((printer) => printer.printer_id === printerToRemove.printer_id);

    if (printerExists) {
      await deletePrinter(printerToRemove.printer_id);
      setPrinterItems(printerItems.filter((printer) => printer.printer_id !== printerToRemove.printer_id));
      toast.success("Printer deleted successfully!");
    }
  };

  const updatePrinter = async (printerToUpdate: Printer) => {
    const updatedPrinterItems = printerItems.map((printer) => {
      if (printer.printer_id === printerToUpdate.printer_id) {
        return printerToUpdate;
      } else {
        return printer;
      }
    });

    const printerExists = printerItems.some((printer) => printer.printer_id === printerToUpdate.printer_id);

    if (printerExists) {
      await changePrinter(printerToUpdate.printer_id.toString(), printerToUpdate);
      setPrinterItems(updatedPrinterItems);
      toast.success("Printer updated successfully!");
    } else {
      toast.warning("Printer does not exist");
    }
  };

  const value = {
    printerItems,
    addPrinter,
    removePrinter,
    updatePrinter,
  };

  return <PrinterDataContext.Provider value={value}>{children}</PrinterDataContext.Provider>;
};
