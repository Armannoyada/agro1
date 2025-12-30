import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const GalleryModal = ({ images, isOpen, onClose, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, goToNext, goToPrevious]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!images || images.length === 0) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Close gallery"
                        >
                            <CloseIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-xs sm:text-sm font-medium bg-black/30 px-2 sm:px-3 py-1 rounded-full">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {/* Main Image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-5xl max-h-[60vh] sm:max-h-[70vh] w-full flex items-center justify-center mt-10 sm:mt-0"
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1}`}
                                className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
                                </button>
                            </>
                        )}

                        {/* Thumbnail Strip */}
                        {images.length > 1 && (
                            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-black/30 rounded-lg sm:rounded-xl overflow-x-auto max-w-[94vw] sm:max-w-[90vw]">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                            ? 'border-primary-500 scale-105'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GalleryModal;
