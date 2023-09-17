import { ReactNode } from "react";

export interface Printer {
  printer_id: string;
  printer_name: string;
  printer_ip: string;
  status: PrinterStatus;
}

export type PrinterStatus = "active" | "inactive";

export interface PrinterDataContextProps {
  children: ReactNode;
}
