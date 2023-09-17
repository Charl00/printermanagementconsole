import { PrinterDataContext } from "@/context/printer-data.context";
import React, { useContext, useState } from "react";
import { FaTrashAlt, FaScrewdriver } from "react-icons/fa";
import UpdatePrinterModal from "../Modals/UpdatePrinterModal.component";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Printer } from "@/interfaces/Printer.interface";

export const List = () => {
  const { printerItems, removePrinter } = useContext(PrinterDataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);

  const handleDelete = (itemToRemove: Printer) => {
    removePrinter(itemToRemove);
  };

  const handleUpdateClick = (item: Printer) => {
    setSelectedPrinter(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto container mx-auto mt-5 w-full p-1.5  my-4 rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
      {isModalOpen && selectedPrinter && <UpdatePrinterModal printerItem={selectedPrinter} closeModal={closeModal} />}{" "}
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-black text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Printer Name</th>
            <th className="px-6 py-3 bg-black text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 bg-black text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {printerItems.map((item, index) => (
            <tr key={index} className="hover:bg-blue-950">
              <td className="px-6 md:py-4 md:whitespace-no-wrap md:text-sm md:text-left md:leading-5 md:font-medium text-gray-900">
                <div className="md:flex md:flex-col text-left">
                  <div className="text-gray-300">{item.printer_name}</div>
                  <div className="text-gray-300">{item.printer_ip}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm text-left leading-5 text-gray-300">{item.status}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm text-right leading-5 text-gray-300">
                <button
                  className="mr-2 text-customGreen hover:text-white text-2xl"
                  onClick={() => handleUpdateClick(item)}
                  data-tip="Update Printer"
                  data-tooltip-id={`update-tooltip-${index}`}
                  data-tooltip-content="Update Printer">
                  <FaScrewdriver />
                </button>
                <button
                  className="text-red-500 hover:text-white text-2xl"
                  onClick={() => handleDelete(item)}
                  data-tip="Delete Printer"
                  data-tooltip-id={`delete-tooltip-${index}`}
                  data-tooltip-content="Delete Printer">
                  <FaTrashAlt />
                </button>

                <ReactTooltip id={`update-tooltip-${index}`} place="bottom" />
                <ReactTooltip id={`delete-tooltip-${index}`} place="bottom" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
