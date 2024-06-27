import { useEffect, useState } from "react";

export const Currency = () => {
    const [exchangeData, setExchangeData] = useState({});
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [exchangeCurrency, setExchangeCurrency] = useState("GBP");

    useEffect(() => {
        fetch(`https://openexchangerates.org/api/latest.json?app_id=d1cbaf35f95e4608b0c06a8a94b44d0d&base=${baseCurrency}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setExchangeData(data);
            })
    }, [baseCurrency]);

    const exchangeRate = exchangeData.rates ? exchangeData.rates[exchangeCurrency] : "Loading...";

    return (
        <footer className="currency">
            <div>
                <label htmlFor="baseCurrency">Base Currency: </label>
                <select
                    id="baseCurrency"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                >
                    {exchangeData.rates && Object.keys(exchangeData.rates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="exchangeCurrency">Exchange Currency: </label>
                <select
                    id="exchangeCurrency"
                    value={exchangeCurrency}
                    onChange={(e) => setExchangeCurrency(e.target.value)}
                >
                    {exchangeData.rates && Object.keys(exchangeData.rates).map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <h4>Exchange Rate: {exchangeRate}</h4>
        </footer>
    );
};
