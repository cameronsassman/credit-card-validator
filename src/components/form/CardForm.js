import { useState } from "react";
import "./CardForm.css"
import Cards from "react-credit-cards"
import "react-credit-cards/es/styles-compiled.css"

function CardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [country, setCountry] = useState("");
  const [submittedCards, setSubmittedCards] = useState([]);
  const [bannedCountries, setBannedCountries] = useState([
    "North Korea",
    "Syria",
    "Iran",
    "Iraq",
    "Cuba"
  ]);

  function isCountryBanned(country) {
    return bannedCountries.includes(country);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "cardNumber":
          // Remove any spaces from the input value
        const strippedValue = value.replace(/\s/g, "");
        // Add a space after every 4 digits
        const formattedValue = strippedValue.replace(/(.{4})/g, "$1 ");
        setCardNumber(formattedValue);
        break;
      case "cardHolder":
        setCardHolder(value.toUpperCase());
        break;
      case "expiryDate":
        setExpiryDate(value);
        break;
      case "cvv":
        setCVV(value);
        break;
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isCountryBanned(country)) {
      alert(`Sorry, ${country} is a banned country`);
    } else {
      const newCard = {
        cardNumber: cardNumber,
        cardHolder: cardHolder,
        expiry: expiryDate || "01/01",
        cvv: cvv,
        country: country,
      };
      // Check if the card has already been submitted
      const cardExists = submittedCards.some(
        card => card.cardNumber === newCard.cardNumber &&
                card.cardHolder === newCard.cardHolder &&
                card.expiryDate === newCard.expiryDate &&
                card.cvv === newCard.cvv &&
                card.country === newCard.country
      );
      if (cardExists) {
        alert("This card has already been submitted");
      } else {
        setSubmittedCards([...submittedCards, newCard]);
        setCardNumber("");
        setCardHolder("");
        setExpiryDate("");
        setCVV("");
        setCountry("");
      }
    }
  }

  function handleAddBannedCountry(e) {
    e.preventDefault();
    setBannedCountries([...bannedCountries, country]);
    setCountry("");
  }

  function handleRemoveBannedCountry(countryToRemove) {
    setBannedCountries(
      bannedCountries.filter(c => c !== countryToRemove)
    );
  }

  return (
    <div>
      <div className="container">
        <div className="form_container">
          <div>
            {bannedCountries.map((country, index) => (
              <div key={index} className="ban_container" onClick={() => handleRemoveBannedCountry(country)}>
                {country}
              </div>
            ))}
            <form onSubmit={handleAddBannedCountry}>
              <label htmlFor="country">Add a banned country:</label>
              <input type="text" name="country" value={country} onChange={handleChange} />
              <button type="submit" className="submitbtn">Add</button>
            </form>
          </div>
          <div className="form_con">
            <Cards 
              number={cardNumber}
              name={cardHolder}
              expiry={expiryDate}
              cvv={cvv}
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            type="tel"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={handleChange}
                            maxLength="19"
                            title="Please enter a valid credit card number"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="cardHolder"
                            placeholder="Card Holder"
                            value={cardHolder}
                            onChange={handleChange}
                            title="Please enter a valid card name (letters and spaces only)"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="expiryDate"
                            placeholder="Expiry Date"
                            value={expiryDate}
                            onChange={handleChange}
                            maxLength="7"
                            title="Please enter the expiry date in MM/YY format"
                            required
                    />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="cvv"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleChange}
                            maxLength="4"
                            title="Please enter a 3-digit CVV code"
                            required
                        />  
                    </div>
                    <div>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="submitbtn">Submit</button>
                </div>
            </form>
          </div>
        </div>
        <div className="submitted-cards">
          {submittedCards.map((card, index) => (
            <div className="submitted-cards">
              <Cards
                key={index}
                number={card.cardNumber}
                name={card.cardHolder}
                xpiry={card.expiryDate}
                cvv={card.cvv}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardForm;