import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/pages.css'
const xml2js = require('xml2js');


export default function NewsFeed() {
  const [newsItems, setNewsItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const result = await axios.get('https://www.finnkino.fi/xml/News/');
        const jsResult = await xml2js.parseStringPromise(result.data);

        if (!jsResult.News || !jsResult.News.NewsArticle) {
          console.error('Uutiset eivät ole ladanneet tai jsResult ei ole määritelty.');
          return;
        }

        const newsArticles = jsResult.News.NewsArticle;

        // Voit suodattaa tai muokata uutisia tässä tarpeen mukaan

        setNewsItems(newsArticles);
      } catch (error) {
        console.error('Virhe haettaessa uutisia:', error);
      }
    }

    fetchNews();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredNews = newsItems.filter(article =>
    article.Title[0].toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div>
        
        <input
        className='haku'
          type="text"
          id="searchInput"
          placeholder="Hae uutisia otsikolla"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>

      {filteredNews.map((article, index) => (
        <div key={index} className='index'>
            <img src={article.ThumbnailURL[0]} alt="News Thumbnail" className="thumbnail" />
          <div>
          <h1 style={{ color: '#fff' }}>{article.Title}</h1>
            <div>
              <p className="publishDate">{article.PublishDate[0]}</p>
              <p className="HTMLLead">{article.HTMLLead[0]}</p>
              <a href={article.ArticleURL[0]} className="link">
                Linkki artikkeliin
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}