"use client"
import React, { useState, useEffect } from 'react';

export default function StorePage() {

    function ProductDetailModal({ product, onClose }) {
        // State for active image and selected size
        const [activeImage, setActiveImage] = useState(product.model_image_front_duplicate);
        const [selectedSize, setSelectedSize] = useState(null);

        // Extract images from API response for gallery
        const images = [
            product.model_image_front_duplicate,
            product.model_image_back_duplicate
        ].filter(Boolean); // Remove nulls if any

        // Find price based on selected size, or default to lowest available
        const currentPrice = selectedSize
            ? product.size_data.find(s => s.size === selectedSize)?.price
            : product.size_data.find(s => s.price !== null)?.price;

        return (
            // Backdrop
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

                {/* Modal Container */}
                <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 p-2"
                    >
                        ✕
                    </button>

                    {/* Left Side: Images */}
                    <div className="w-full md:w-1/2 flex gap-4 p-6 bg-[#f2f6ea] md:min-h-[600px]">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-2 w-16 md:w-20">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`border-2 ${activeImage === img ? 'border-gray-800' : 'border-transparent'} overflow-hidden rounded`}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-auto object-cover" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 flex items-center justify-center overflow-hidden rounded">
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-full object-cover max-h-[70vh] rounded"
                            />
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">

                        <h2 className="text-2xl font-bold text-slate-800 uppercase mb-1">{product.brand}</h2>
                        <p className="text-gray-500 text-lg mb-4 capitalize">{product.title}</p>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl font-bold text-slate-800">
                                {currentPrice ? `₹${currentPrice}` : 'Out of Stock'}
                            </span>
                            <span className="text-xs text-gray-400">Inclusive of all taxes</span>
                        </div>

                        <hr className="border-gray-200 mb-6" />

                        {/* Size Selector */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-slate-800">Select Size</span>
                                <button className="text-pink-600 text-sm font-medium">Size Guide</button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {product.size_data.map((sizeObj) => {
                                    const isOutOfStock = sizeObj.quantity === 0 || sizeObj.quantity === null;
                                    return (
                                        <button
                                            key={sizeObj.size}
                                            disabled={isOutOfStock}
                                            onClick={() => setSelectedSize(sizeObj.size)}
                                            className={`
                      px-4 py-2 border rounded-full text-sm min-w-[3rem] transition-all
                      ${selectedSize === sizeObj.size
                                                    ? 'border-slate-900 bg-slate-900 text-white'
                                                    : 'border-gray-300 text-gray-700 hover:border-slate-800'}
                      ${isOutOfStock ? 'opacity-40 cursor-not-allowed bg-gray-50 line-through' : ''}
                    `}
                                        >
                                            {sizeObj.size}
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedSize && (
                                <p className="text-xs text-green-600 mt-2">
                                    Quantity available: {product.size_data.find(s => s.size === selectedSize)?.quantity}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 py-3 border border-gray-300 rounded font-bold text-slate-800 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                                <span>♡</span> Add to Wishlist
                            </button>
                            <button
                                disabled={!selectedSize}
                                className="flex-1 py-3 bg-[#0a1b2a] text-white rounded font-bold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Bag
                            </button>
                        </div>

                        <hr className="border-gray-200 mb-6" />

                        {/* Delivery Location Widget */}
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">Select Delivery Location</h4>
                            <p className="text-sm text-gray-500 mb-4">Enter the pincode of your area to check product availability and delivery options</p>

                            <div className="flex border border-gray-300 rounded overflow-hidden mb-6 bg-gray-50">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    className="flex-1 p-3 bg-transparent outline-none text-sm"
                                />
                                <button className="px-4 text-pink-600 font-medium text-sm hover:bg-gray-100">Apply</button>
                            </div>

                            {/* Delivery Features */}
                            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-700">
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-1">📦</span>
                                    <span className="mb-1">COD <b>available</b></span>
                                    <a href="#" className="text-pink-600 mt-auto">Know More</a>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-1">🔄</span>
                                    <span className="mb-1">7-day return & size exchange</span>
                                    <a href="#" className="text-pink-600 mt-auto">Know More</a>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-1">🚚</span>
                                    <span className="mb-1"><b>Free</b> Delivery by <b>Wed, 10 June</b></span>
                                    <a href="#" className="text-pink-600 mt-auto">Know More</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }





    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter and Pagination State
    const [filters, setFilters] = useState({ gender: 'Men', item_name: 'Shirt' });
    const [pagination, setPagination] = useState({ limit: 10, offset: 0 });

    // Options for filters
    const genders = ['Men', 'Women', 'Kids', 'Unisex'];
    const categories = ['Shirt', 'Jeans', 'Shorts', 'T-Shirt'];

    // Fetch API Logic
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = new URL("http://dev.zuget.com/site/item-details");
                url.searchParams.append("gender", filters.gender);
                url.searchParams.append("item_name", filters.item_name);
                url.searchParams.append("limit", pagination.limit);
                url.searchParams.append("offset", pagination.offset);

                const response = await fetch(url.toString(), {
                    headers: { "accept": "application/json" }
                });

                const result = await response.json();
                if (result.status === "success") {
                    setProducts(result.data.items);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Fallback or empty state handling can go here
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, pagination]);

    // Handlers
    const handleNextPage = () => {
        setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    };

    const handlePrevPage = () => {
        setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
    };

    // Helper to find starting price from size_data
    const getBasePrice = (sizeData) => {
        const validSize = sizeData?.find(s => s.price !== null);
        return validSize ? validSize.price : 'N/A';
    };

    return (
        <div className="max-w-[1600px] mx-auto p-4 font-sans text-gray-800">

            {/* Header & Pagination Controls */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Collections</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={pagination.offset === 0}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Showing {pagination.offset + 1} - {pagination.offset + pagination.limit}
                    </span>
                    <button
                        onClick={handleNextPage}
                        className="px-4 py-2 border rounded"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar: Filters */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
                    {/* Gender Filter */}
                    <div className="border border-gray-200 rounded p-4">
                        <h3 className="font-bold mb-3">Gender</h3>
                        <div className="space-y-2">
                            {genders.map(gender => (
                                <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={filters.gender === gender}
                                        onChange={() => {
                                            setFilters(prev => ({ ...prev, gender }));
                                            setPagination(prev => ({ ...prev, offset: 0 })); // Reset page on filter
                                        }}
                                        className="w-4 h-4 text-slate-800 accent-slate-800"
                                    />
                                    <span>{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="border border-gray-200 rounded p-4">
                        <h3 className="font-bold mb-3">Category</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={filters.item_name === category}
                                        onChange={() => {
                                            setFilters(prev => ({ ...prev, item_name: category }));
                                            setPagination(prev => ({ ...prev, offset: 0 }));
                                        }}
                                        className="w-4 h-4 text-slate-800 accent-slate-800"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Content: Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gray-500">Loading products...</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product, idx) => (
                                <div
                                    key={idx}
                                    className="group cursor-pointer flex flex-col"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3 rounded">
                                        <img
                                            src={product.model_image_front_duplicate}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image'}
                                        />
                                    </div>
                                    <h3 className="font-bold text-sm text-gray-800 truncate uppercase">{product.brand}</h3>
                                    <p className="text-sm text-gray-500 truncate mb-1 capitalize">{product.title}</p>
                                    <p className="font-bold text-sm text-gray-800">
                                        ₹{getBasePrice(product.size_data)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

        </div>
    );
}