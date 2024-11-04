import { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { MOCK_VIDEOS } from '../data/mockData';
import { Video } from '../types';

const MOCK_PRODUCTS = MOCK_VIDEOS.map((video, index) => ({
  id: `product-${index}`,
  title: video.title,
  price: Math.floor(Math.random() * 900) + 100,
  image: video.thumbnail,
  seller: video.channel.name,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 1000) + 100,
  category: assignCategory(video.title)
}));

function assignCategory(title: string): string {
  const lowercaseTitle = title.toLowerCase();
  
  if (lowercaseTitle.match(/phone|laptop|computer|gadget|tech|electronic/i)) {
    return 'Electronics';
  } else if (lowercaseTitle.match(/fashion|clothing|dress|shoe|style|wear/i)) {
    return 'Fashion';
  } else if (lowercaseTitle.match(/home|furniture|decor|kitchen|house/i)) {
    return 'Home';
  } else if (lowercaseTitle.match(/beauty|makeup|cosmetic|skincare/i)) {
    return 'Beauty';
  } else if (lowercaseTitle.match(/book|reading|novel|study/i)) {
    return 'Books';
  } else if (lowercaseTitle.match(/sport|fitness|exercise|workout/i)) {
    return 'Sports';
  }
  return 'All';
}

export default function Shopping() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Books', 'Sports'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <ShoppingBag className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold text-white">Shopping</h1>
        </div>
        <div className="relative w-96">
          <Search className="w-5 h-5 text-[#aaa] absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] text-white pl-10 pr-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-[#3ea6ff]"
          />
        </div>
      </div>

      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
            }`}
          >
            {category}
            <span className="ml-2 text-sm">
              {category === 'All' 
                ? `(${MOCK_PRODUCTS.length})`
                : `(${MOCK_PRODUCTS.filter(p => p.category === category).length})`
              }
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#272727] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-medium mb-2 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white">
                  ${product.price}
                </span>
                <div className="flex items-center text-[#aaa]">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{product.rating}</span>
                  <span className="ml-1">({product.reviews})</span>
                </div>
              </div>
              <p className="text-sm text-[#aaa]">Sold by {product.seller}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}