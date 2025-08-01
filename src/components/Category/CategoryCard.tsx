import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
  };
}

/**
 * Category card component for homepage
 * Optimized for Pakistani mobile users with large touch targets
 */
const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={category.link}
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-sm text-gray-200 mb-4">{category.description}</p>
          
          <div className="flex items-center space-x-2 text-sm font-medium group-hover:text-yellow-400 transition-colors">
            <span>Explore Collection</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;