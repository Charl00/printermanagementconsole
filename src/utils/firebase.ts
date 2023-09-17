import { Printer } from "@/interfaces/Printer.interface";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, doc, setDoc, collection, updateDoc, query, getDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const createPrinter = async (printerData: Printer) => {
  try {
    const docRef = doc(db, "printers", printerData.printer_id);
    await setDoc(docRef, { ...printerData });
  } catch (error) {
    console.error("Error adding printer:", error);
    throw error;
  }
};

export const getPrinters = async (printerId: string) => {
  try {
    const docRef = doc(db, "printers", printerId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching printer:", error);
    throw error;
  }
};

export const changePrinter = async (printerId: string, updatedData: Printer) => {
  try {
    const docRef = doc(db, "printers", printerId);
    await updateDoc(docRef, { ...updatedData });
  } catch (error) {
    console.error("Error updating printer:", error);
    throw error;
  }
};

export const deletePrinter = async (printerId: string) => {
  try {
    const docRef = doc(db, "printers", printerId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting printer:", error);
    throw error;
  }
};

export const getAllPrinters = async (): Promise<Printer[]> => {
  try {
    const collectionReference = collection(db, "printers");
    const queryResponse = query(collectionReference);
    const querySnapshot = await getDocs(queryResponse);

    const printers: Printer[] = [];

    querySnapshot.forEach((doc) => {
      const printerData = doc.data() as Printer;
      printers.push(printerData);
    });
    return printers;
  } catch (error) {
    console.error("Error retrieving printers:", error);
    throw error;
  }
};
