import React, { useState, useEffect } from 'react';
import './App.css';
import { ZERO, ONE, TWO, THREE, FOUR, FIVE, BOOK_PRICE, FIVE_PERCENT, TEN_PERCENT, TWENTY_PERCENT, TWENTY_FIVE_PERCENT, TOTAL_PRICE } from './constants'

function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO)
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO)
  const [cleanArchitectureQuantity, setCleanArchitectureQuantity] = useState(ZERO)
  const [tddQuantity, setTddQuantity] = useState(ZERO)
  const [legacyCodeQuantity, setLegacyCodeQuantity] = useState(ZERO)
  const [totalPrice, setTotalPrice] = useState(ZERO)
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    setShoppingCart([
      ...Array(cleanCodeQuantity).fill('cleanCode'),
      ...Array(cleanCoderQuantity).fill('cleanCoder'),
      ...Array(cleanArchitectureQuantity).fill('cleanArchitecture'),
      ...Array(tddQuantity).fill('tdd'),
      ...Array(legacyCodeQuantity).fill('legacyCode')
    ])
  }, [cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity, legacyCodeQuantity])

  const resetToDefault = () => {
    setCleanCodeQuantity(ZERO)
    setCleanCoderQuantity(ZERO)
    setCleanArchitectureQuantity(ZERO)
    setTddQuantity(ZERO)
    setLegacyCodeQuantity(ZERO)
    setTotalPrice(ZERO)
  }

  const calculateBooksPrice = (shoppingCart) => {
    let totalPrice = ZERO

    while (!shoppingCart.every(book => !book)) {
      const differentBooksArr = []
      shoppingCart.forEach((book, i) => {
        if (!differentBooksArr.includes(book) && book) {
          differentBooksArr.push(book)
          shoppingCart[i] = false
        }
      });

      switch (differentBooksArr.length) {
        case 1:
          totalPrice += BOOK_PRICE
          break;
        case 2:
          totalPrice += TWO * BOOK_PRICE * FIVE_PERCENT
          break;
        case 3:
          totalPrice += THREE * BOOK_PRICE * TEN_PERCENT
          break;
        case 4:
          totalPrice += FOUR * BOOK_PRICE * TWENTY_PERCENT
          break;
        case 5:
          totalPrice += FIVE * BOOK_PRICE * TWENTY_FIVE_PERCENT
          break;
        default:
          totalPrice = totalPrice
      }
    }
    setTotalPrice(totalPrice)
  }

  return (
    <div className="App">
      <img src="https://github.com/stephane-genicot/katas/raw/master/images/Kata_DevelopmentBooks_TDD.jpeg?raw=true" className="App-logo" alt="logo" />
      <h3>
        Book price calculator - TDD
      </h3>
      <div className="inputs">
        <label htmlFor="clean-code">Clean Code <input type="number" min={ZERO} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input></label>
        <label htmlFor="clean-coder">The Clean Coder <input type="number" min={ZERO} id="clean-coder" value={cleanCoderQuantity} onChange={e => setCleanCoderQuantity(Number(e.target.value))}></input></label>
        <label htmlFor="clean-architecture">Clean Architecture <input type="number" min={ZERO} id="clean-architecture" value={cleanArchitectureQuantity} onChange={e => setCleanArchitectureQuantity(Number(e.target.value))}></input></label>
        <label htmlFor="tdd">Test Driven Development <input type="number" id="tdd" min={ZERO} value={tddQuantity} onChange={e => setTddQuantity(Number(e.target.value))}></input></label>
        <label htmlFor="legacy-code">Legacy Code <input type="number" id="legacy-code" min={ZERO} value={legacyCodeQuantity} onChange={e => setLegacyCodeQuantity(Number(e.target.value))}></input></label>
      </div>
      <br />
      <button onClick={() => calculateBooksPrice(shoppingCart)}>Calculate Total Price</button>
      <h4>{`${TOTAL_PRICE} ${totalPrice}`}</h4>
      <div className='specialOffer'>
        <p>Our special offers for today:</p>
        <p>Buy 2 different books and get a 5% discount on them</p>
        <p>Buy 3 different books and get a 10% discount on them</p>
        <p>Buy 4 different books and get a 20% discount on them</p>
        <p>Buy 5 different books and get a 25% discount on them</p>
      </div>
      <button onClick={() => resetToDefault()}>Reset</button>
    </div>
  );
}

export default App;
