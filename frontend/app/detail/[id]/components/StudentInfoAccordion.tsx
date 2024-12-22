"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { StudentInfo } from "../types";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { STUDENT_FIELDS, GROUP_LABELS } from "../constants";
import parse from "html-react-parser";

interface StudentInfoAccordionProps {
  student: StudentInfo;
  title: string;
  subtitle?: string;
  variant?: "current" | "snapshot";
  loading?: boolean;
}

export function StudentInfoAccordion({
  student,
  title,
  subtitle,
  variant = "current",
  loading = false,
}: StudentInfoAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const gradientStyle =
    variant === "current"
      ? "from-blue-400/90 via-blue-500/90 to-blue-600/90"
      : "from-purple-400/90 via-purple-500/90 to-purple-600/90";

  const renderFields = (group: string) => {
    return STUDENT_FIELDS.filter((field) => field.group === group).map(
      ({ key, label }) => (
        <div
          key={key}
          className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 
                     hover:bg-white/70 transition-colors duration-300"
        >
          <dt className="text-sm font-medium text-gray-600">{label}</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {key === "hogarYBienestar" ||
            key === "talentoYCapacidadesExepcionales"
              ? parse(student?.[key] || "-")
              : student?.[key] || "-"}
          </dd>
        </div>
      ),
    );
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm 
                    shadow-xl shadow-purple-500/5"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 bg-gradient-to-r ${gradientStyle} 
                   backdrop-blur-md text-white flex justify-between items-center`}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
        </div>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-b from-white/80 to-white/40">
                {Object.keys(GROUP_LABELS).map((group) => (
                  <div key={group} className="mb-6 last:mb-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      {GROUP_LABELS[group]}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {renderFields(group)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
