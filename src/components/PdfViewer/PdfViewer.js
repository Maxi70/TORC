import React, { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";

import { ReactComponent as ArrowUp } from "images/new/gray-arrow-up.svg";
import { ReactComponent as ArrowDown } from "images/new/gray-arrow-down.svg";
import { ReactComponent as Print } from "images/new/print.svg";
import { ReactComponent as Download } from "images/new/download.svg";
import { ReactComponent as Expand } from "images/new/expand.svg";
import "./PdfViewer.css";

// Enable PDF.js worker from an external cdn
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= numPages) setPageNumber(value);
  };

  return (
    <div className="flex flex-col">
      <nav className="flex bg-gray-100 p-4 items-center">
        <ArrowUp className="cursor-pointer" onClick={goToPrevPage} />
        <ArrowDown className="cursor-pointer" onClick={goToNextPage} />
        <p className="ml-4">
          Page{" "}
          <input
            type="number"
            value={pageNumber}
            onChange={handleInputChange}
            className="focus:border-gray-300 appearance-none w-10 h-8 p-2 border border-gray-300 rounded-md"
          />{" "}
          of {numPages}
        </p>

        <div className="ml-auto flex gap-6 cursor-pointer">
          <Print onClick={() => window.open(pdfUrl)} />
          <Download onClick={() => window.open(pdfUrl)} />
          <Expand onClick={() => window.open(pdfUrl)} />
        </div>
      </nav>

      <div className="mx-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="canvas"
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
