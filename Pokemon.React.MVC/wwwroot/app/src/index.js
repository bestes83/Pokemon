import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';



import App from './App';
import PokemonDetail from './Pages/PokemonDetail';
import PokemonList from './Pages/PokemonList';


var rootEl = document.getElementById('root');
// console.log(typeof rootEl);
// console.log(typeof rootEl !== "undefined");
// console.log(rootEl);

if(typeof rootEl !== "undefined" && rootEl !== null)
{
    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}


var appEl = document.getElementById('home');
if (typeof appEl !== "undefined" && appEl !== null) {
    const root = ReactDOM.createRoot(appEl);
    root.render(
      <React.StrictMode>
        <PokemonDetail pokemonId={appEl.getAttribute("pokemonId")} />
      </React.StrictMode>
    );
}

var pokemonListEl = document.getElementById('pokemonList');
if(typeof pokemonListEl !== "undefined" && pokemonListEl !== null){
  const root = ReactDOM.createRoot(pokemonListEl);
  root.render(
    <React.StrictMode>
      <PokemonList currentIndex={pokemonListEl.getAttribute("currentIndex")} />
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
