import React from 'react';
import { Link } from 'react-router-dom';
import './inicio.css';

const HomePage = () => {

  const products = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    name: `Produto ${index + 1}`,
    price: `R$${(index + 1) * 10},00`,
    imageUrl: 'images/Produto.png'
  }));


  const userName = localStorage.getItem('userName');

  return (
    <div>
      <div className="top-bar">
        <div className="top-links">
          <div className="left-links">
            <Link to="#">Central do Vendedor</Link>
            <span style={{ color: 'white' }}>|</span>
            <Link to="/cadastro_vendedor">Vender no Marketlink</Link>
          </div>
          <div className="right-links">
            <span>Olá, {userName || 'Visitante'}</span>
            <span style={{ color: 'white' }}>|</span>
            <Link to="/login">Sair</Link>
          </div>
        </div>
        <div className="bottom-links">
          <div className="logo-container">
            <Link to="/inicio">
              <img src="images/MarketLink - Logo.jpg" alt="Logo MarketLink" />
            </Link>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Buscar no Marketlink" />
            <Link to="/resultado_pesquisa">
              <button type="button" id="search-icon">
                <i className="fas fa-search"></i>
              </button>
            </Link>
          </div>
          <div className="cart-container">
            <Link to="/carrinho">
              <img src="images/carrinho.png" alt="Carrinho" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {products.map(product => (
            <div className="col-custom" key={product.id}>
              <div className="product-item">
                <img src={product.imageUrl} alt="Produto" className="img-responsive" />
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <Link to={`/produto/${product.id}`} className="btn btn-primary">Detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
