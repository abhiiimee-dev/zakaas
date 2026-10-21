import { useRef, useEffect, useState } from 'react';

export function ProductGallery({
  images = [],
  selectedImage = 0,
  setSelectedImage,
  productName = 'Chakli'
}) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(selectedImage || 0);
  const galleryImages = images.length > 0 ? images : ['/zakaas-chakli.jpg'];

  // Keep internal state in sync if parent changes selectedImage
  useEffect(() => {
    if (selectedImage !== undefined && selectedImage !== currentIndex) {
      setCurrentIndex(selectedImage);
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth;
        scrollRef.current.scrollTo({ left: selectedImage * width, behavior: 'smooth' });
      }
    }
  }, [selectedImage]);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (!el || el.clientWidth === 0) return;
    const newIndex = Math.round(el.scrollLeft / el.clientWidth);
    if (newIndex >= 0 && newIndex < galleryImages.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (setSelectedImage) {
        setSelectedImage(newIndex);
      }
    }
  };

  const scrollToSlide = (idx) => {
    setCurrentIndex(idx);
    if (setSelectedImage) setSelectedImage(idx);
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: idx * width, behavior: 'smooth' });
    }
  };

  return (
    <div className="zakaas-pdp-gallery">
      {/* Mobile & Desktop Main Stage: Touch swipeable container */}
      <div className="zakaas-main-photo-frame">
        <div
          ref={scrollRef}
          className="zakaas-slider-track"
          onScroll={handleScroll}
          role="region"
          aria-label={`${productName} photo gallery`}
        >
          {galleryImages.map((img, idx) => (
            <div key={idx} className="zakaas-slider-slide">
              <img
                src={img}
                alt={`${productName} view ${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="zakaas-main-photo"
              />
            </div>
          ))}
        </div>

        {/* Slide Counter Badge for mobile swipe orientation */}
        {galleryImages.length > 1 && (
          <div className="zakaas-slider-badge" aria-hidden="true">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        )}
      </div>

      {/* Swipe Dots Indicator for Mobile */}
      {galleryImages.length > 1 && (
        <div className="zakaas-slider-dots" role="tablist" aria-label="Slide indicators">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`Go to photo ${idx + 1}`}
              className={`zakaas-slider-dot ${currentIndex === idx ? 'is-active' : ''}`}
              onClick={() => scrollToSlide(idx)}
            />
          ))}
        </div>
      )}

      {/* Thumbnails row (shown on desktop/tablet) */}
      {galleryImages.length > 1 && (
        <div className="zakaas-photo-thumbnails" role="tablist" aria-label="Product thumbnails">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`View photo ${idx + 1}`}
              className={`zakaas-thumb-btn ${currentIndex === idx ? 'is-active' : ''}`}
              onClick={() => scrollToSlide(idx)}
            >
              <img src={img} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
