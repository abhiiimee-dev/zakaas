export function ProductGallery({
  images = [],
  selectedImage = 0,
  setSelectedImage,
  productName = 'Chakli'
}) {
  const currentImage = images[selectedImage] || images[0] || '/zakaas-chakli.jpg';

  return (
    <div className="zakaas-pdp-gallery">
      <div className="zakaas-main-photo-frame">
        <img
          src={currentImage}
          alt={productName ? `${productName} packaging` : 'Zakaas snack'}
          loading="eager"
          className="zakaas-main-photo"
        />
      </div>

      {images.length > 1 && (
        <div className="zakaas-photo-thumbnails" role="tablist" aria-label="Product thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={selectedImage === idx}
              aria-label={`View photo ${idx + 1}`}
              className={`zakaas-thumb-btn ${selectedImage === idx ? 'is-active' : ''}`}
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
