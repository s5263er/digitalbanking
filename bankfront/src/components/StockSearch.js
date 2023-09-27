import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StockSearch.css'; // Import your CSS file for styling
import stocksDirectory from './stocksDirectory.json'; // Import the JSON file

async function fetchLatestNews() {
  const url = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ac645fda57mshace61460c023f9bp1af813jsnf00735905a68',
      'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function StockSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    const results = Object.keys(stocksDirectory)
      .filter((symbol) =>
        symbol.toLowerCase().startsWith(query) ||
        stocksDirectory[symbol].toLowerCase().startsWith(query)
      )
      .slice(0, 5); // Limit the results to 5 entries
    setSearchResults(results);
  };

  const handleSelectStock = (symbol) => {
    // Use navigate to redirect to the StocksPage with the selected stock symbol
    navigate(`/stocks/${symbol}`);
    setSearchResults([]);
    setSearchTerm('');
  };

  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const newsData = await fetchLatestNews();
      setLatestNews(newsData);
    }

    fetchNews();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <div className="stock-search-container">
        <input
          className="stock-search-input"
          type="text"
          placeholder="Search for a stock..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm !== "" && searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((symbol) => (
              <li key={symbol} onClick={() => handleSelectStock(symbol)}>
                {`${symbol} - ${stocksDirectory[symbol]}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="latest-news-container">
        {/* Map through the latestNews array and render each news-container */}
        {latestNews.slice(0, 5).map((news) => (
          <div key={news.guid} className="news-container">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <div className="news-title">{news.title}</div>
              <div className="news-pubDate">{news.pubDate}</div>
              <div className="news-source">{news.source}</div>
            </a>
          </div>
))}
      </div>
    </div>
  );
}

export default StockSearch;
