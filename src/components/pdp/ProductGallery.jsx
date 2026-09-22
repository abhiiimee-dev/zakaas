export function ProductGallery({
  images = [],
  selectedImage = 0,
  setSelectedImage,
  productName = '',
  personality = 'MAHARASHTRA ORIGINAL',
  annotations = []
}) {
  const currentImage = images[selectedImage] || images[0] || '/zakaas-chakli.jpg';

  const defaultAnnotations = [
    { text: 'BHAJAN FLOUR', pos: 'top-left' },
    { text: 'AJWAIN & CUMIN', pos: 'top-right' },
    { text: '100g NET WEIGHT', pos: 'bottom-left' },
    { text: 'MAHARASHTRIAN ORIGINAL', pos: 'bottom-right' }
  ];

  const activeAnnotations = annotations.length ? annotations : defaultAnnotations;

  return (
    <div className="zakaas-pdp-gallery">
      {/* Editorial Frame with Tactile Annotations */}
      <div className="zakaas-pdp-main-image-wrap">
        <div className="zakaas-pdp-main-image">
          <img
            src={currentImage}
            alt={productName ? `${productName} packaging` : 'Zakaas snack packet'}
            loading="eager"
          />
          {personality && (
            <span className="zakaas-personality-tag">{personality}</span>
          )}
        </div>

        {/* Small Editorial Annotations Around Hero */}
        <div className="gallery-annotations-layer" aria-hidden="true">
          {activeAnnotations.map((note, i) => (
            <span key={i} className={`editorial-stamp stamp-${note.pos}`}>
              <span className="stamp-line" />
              {note.text}
            </span>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="zakaas-pdp-thumbnails" role="tablist" aria-label="Product image gallery">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={selectedImage === idx}
              aria-label={`View ${productName} image ${idx + 1}`}
              className={`zakaas-pdp-thumb ${selectedImage === idx ? 'is-active' : ''}`}
              onClick={() => setSelectedImage(idx)}
            >
              <img src={img} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
