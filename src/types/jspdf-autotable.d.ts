// src/types/jspdf-autotable.d.ts

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (columns: string[], rows: string[][], options?: object) => void;
    }
}