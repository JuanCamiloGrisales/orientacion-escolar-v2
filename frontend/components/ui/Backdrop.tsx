import { motion } from "framer-motion";

interface BackdropProps {
  onClick: () => void;
}

export const Backdrop = ({ onClick }: BackdropProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
    className="fixed inset-0 bg-black z-40"
  />
);
