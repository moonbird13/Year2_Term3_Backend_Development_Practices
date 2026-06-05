import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } 
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try { 
      const response = await axios.get('http://localhost:5000/journalists/${selectedJournalistId}/articles').then(res => {
        console.log('Journalists fetched:', res.data);
      });
    } catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            fetchJournalists();

          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            
            // Logic to reset filters
            fetchArticles();
            fetchJournalists();

          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}