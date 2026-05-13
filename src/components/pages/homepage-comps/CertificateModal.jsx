import { useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const CertificateModal = ({ selectedImage, setSelectedImage }) => {
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e) => e.key === "Escape" && setSelectedImage(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedImage, setSelectedImage]);

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl w-full max-h-[88vh] rounded-xl overflow-hidden border border-white/10 bg-ink-900 shadow-card-hover"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close certificate preview"
              className="absolute top-3 right-3 inline-grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 border border-white/10 text-fog-100 hover:text-accent-emerald hover:border-accent-emerald/50 backdrop-blur-sm transition-colors"
            >
              <FiX size={16} />
            </button>
            <img
              src={selectedImage}
              alt="Selected certificate"
              className="w-full max-h-[88vh] object-contain bg-ink-950"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

CertificateModal.propTypes = {
  selectedImage: PropTypes.string,
  setSelectedImage: PropTypes.func.isRequired,
};

export default CertificateModal;
