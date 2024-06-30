import React, { useEffect, useState } from "react";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

export const Currency = () => {
    const API_KEY = 'fca_live_IropyDFdmtx6LGLRrwMt76lfEgT2pRcVC0XswPXa'; 
    const freecurrencyapi = new Freecurrencyapi(API_KEY);

    const [exchangeData, setExchangeData] = useState({});
    const [baseCurrencyCode, setBaseCurrencyCode] = useState("");
    const [baseCurrencyName, setBaseCurrencyName] = useState("");
    const [exchangeCurrencyCode, setExchangeCurrencyCode] = useState("");
    const [exchangeCurrencyName, setExchangeCurrencyName] = useState("");
    const [nameToCodeList, setNameToCodeList] = useState({});

    useEffect(() => {
        const fetchCurrencyList = async () => {
            try {
                const response = await freecurrencyapi.currencies();
                const currencyDetailsList = response.data;
                const currencyNameToCode = {};
                Object.keys(currencyDetailsList).forEach(currencyCode => {
                    const currencyDetails = currencyDetailsList[currencyCode];
                    currencyNameToCode[currencyDetails.name] = currencyCode;
                });
                setNameToCodeList(currencyNameToCode);
            } catch (error) {
                console.error('Error fetching currency list:', error);
            }
        };

        fetchCurrencyList();
    }, []);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                if (baseCurrencyCode && exchangeCurrencyCode) {
                    const response = await freecurrencyapi.latest({
                        base_currency: baseCurrencyCode,
                        currencies: exchangeCurrencyCode
                    });
                    setExchangeData(response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchExchangeRates();
    }, [baseCurrencyCode, exchangeCurrencyCode]);

    const exchangeRate = exchangeData.data ? exchangeData.data[exchangeCurrencyCode] : null;

    const handleBaseCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setBaseCurrencyName(selectedCurrency);
        setBaseCurrencyCode(nameToCodeList[selectedCurrency]);
    };

    const handleTargetCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setExchangeCurrencyName(selectedCurrency);
        setExchangeCurrencyCode(nameToCodeList[selectedCurrency]);
    };

    const currencyOptions = Object.keys(nameToCodeList).map(currencyName => (
        <option key={currencyName} value={currencyName}>{currencyName}</option>
    ));

    return (
        <div className="currency">
            <div>
                <label htmlFor="selectBaseCurrency">Use: </label>
                <select
                    id="selectBaseCurrency"
                    onChange={handleBaseCurrencyChange}
                    value={baseCurrencyName}
                >
                    <option value="">-- Base Currency --</option>
                    {currencyOptions}
                </select>
            </div>
            <div>
                <label htmlFor="selectExchangeCurrency">To Buy: </label>
                <select
                    id="selectExchangeCurrency"
                    onChange={handleTargetCurrencyChange}
                    value={exchangeCurrencyName}
                >
                    <option value="">-- Exchange Currency --</option>
                    {currencyOptions.filter(currency => currency !== baseCurrencyName)}
                </select>
            </div>
             <h4>
                {exchangeRate && exchangeCurrencyCode? (
                    <p>1 {baseCurrencyCode} = {exchangeRate.toFixed(2)} {exchangeCurrencyCode}</p>
                ) : (
                    <p>Loading</p>
                )}
            </h4>
        </div>
    );
};
