import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useApp();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h1>Carrinho Vazio</h1>
          <p>Seu carrinho está vazio. Que tal dar uma olhada em nossos produtos?</p>
          <Link to="/produtos" className="btn btn-primary">Ver Produtos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Meu Carrinho</h1>
        <p>{cart.length} produto(s) no carrinho</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="item-subtotal">
                <p>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="summary-row">
            <span>Frete</span>
            <span>Calculado no checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>R$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
          </div>
          <button className="btn btn-primary btn-block btn-lg">Finalizar Compra</button>
          <button onClick={clearCart} className="btn btn-outline btn-block">Limpar Carrinho</button>
        </div>
      </div>
    </div>
  );
}
