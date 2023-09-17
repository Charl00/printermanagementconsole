import { Printer, PrinterDataContext, PrinterStatus } from "@/context/printer-data.context";
import { isIpCorrect } from "@/utils/strings";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { toast } from "react-toastify";

interface UpdatePrinterModalProps {
  printerItem: Printer;
  closeModal: () => void;
}

export default function UpdatePrinterModal({ printerItem, closeModal }: UpdatePrinterModalProps) {
  const { updatePrinter } = useContext(PrinterDataContext);

  const [isOpen, setIsOpen] = useState(true);
  const [printerName, setPrinterName] = useState<string>(printerItem.printer_name);
  const [printerIP, setPrinterIP] = useState<string>(printerItem.printer_ip);
  const [printerStatus, setPrinterStatus] = useState<PrinterStatus>(printerItem.status);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrinterName(event.target.value);
  };

  const handleIpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrinterIP(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as PrinterStatus;
    setPrinterStatus(selectedStatus);
  };

  const handleSave = () => {
    if (!printerName || !printerIP) {
      toast.error("Please enter both Printer Name and Printer IP.");
    } else {
      if (!isIpCorrect(printerIP)) {
        toast.error("The IP address entered is incorrect.");
      } else {
        updatePrinter({
          printer_id: printerItem.printer_id,
          printer_name: printerName,
          printer_ip: printerIP,
          status: printerStatus,
        });
        closeModal();
      }
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Update Printer {printerItem.printer_name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Update the settings of your print.</p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Printer Name</label>
                    <div className="mt-1">
                      <input type="text" value={printerName} onChange={handleNameChange} className="w-full text-gray-500" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Printer IP</label>
                    <div className="mt-1">
                      <input type="text" value={printerIP} onChange={handleIpChange} className="w-full text-gray-500" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Printer Status</label>
                    <div className="mt-1">
                      <select value={printerStatus} onChange={handleStatusChange} className="w-full text-gray-500">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSave}>
                      Save Changes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}