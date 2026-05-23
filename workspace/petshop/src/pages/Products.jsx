import { useState } from 'react';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import './Products.css';

export function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useApp();

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Nossos Produtos</h1>
        <p>Encontre tudo que seu pet precisa</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filter">
          <Filter size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as Categorias</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} /> Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
