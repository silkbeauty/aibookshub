const BookCard = ({ product }) => {
    const handleDownload = () => {
        window.open(product.download_url, '_blank');
    };
    
    return (
        <div className="product-card">
            <img src={product.cover_image_url} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-author">{product.author}</p>
            <p className="product-summary">{product.summary}</p>
            <button className="add-to-cart" onClick={handleDownload}>Free Download</button>
        </div>
    );
};

export default BookCard;
