import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/pages.css'
const xml2js = require('xml2js');


export default function NewsFeed() {
  const [newsItems, setNewsItems] = useState([]);

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

  return (
    <div>
      {newsItems.map((article, index) => (
        <div>
          <h1 style={{ color: '#fff' }}>{article.Title}</h1>
        <div key={index} className='index'>
          <img src={article.ThumbnailURL[0]} alt="News Thumbnail" className="thumbnail"/>
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