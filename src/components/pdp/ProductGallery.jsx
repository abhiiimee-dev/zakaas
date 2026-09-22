export function ProductGallery({
  images = [],
  selectedImage = 0,
  setSelectedImage,
  productName = '',
  personality = 'MAHARASHTRA ORIGINAL'
}) {
  const currentImage = images[selectedImage] || images[0] || '/zakaas-bhakarwadi.jpg';

  return (
    <div className="zakaas-pdp-gallery">
      <div className="zakaas-pdp-main-image">
        <img
          src={currentImage}
          alt={productName ? `${productName} packaging` : 'Zakaas snack'}
          loading="eager"
        />
        {personality && (
          <span className="zakaas-personality-tag">{personality}</span>
        )}
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
