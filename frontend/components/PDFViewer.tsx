"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PDFViewerProps {
  url: string;
  onClose: () => void;
}

export const PDFViewer = ({ url, onClose }: PDFViewerProps) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed left-0 top-0 h-screen bg-white z-50 w-full max-w-3xl shadow-2xl"
    >
      <div className="absolute top-4 -right-14 z-10">
        <Button variant="secondary" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <iframe src={url} className="w-full h-full" />
    </motion.div>
  );
};
