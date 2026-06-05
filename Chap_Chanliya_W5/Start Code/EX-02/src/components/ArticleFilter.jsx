import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appliedJournalist, setAppliedJournalist] = useState('');
  const [appliedCategory, setAppliedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
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

  useEffect(() => {
    if (!articles.length) return;

    if (!journalists.length) {
      const uniqueJournalists = Array.from(
        new Map(
          articles.map(article => [
            String(article.journalistId),
            { id: String(article.journalistId), name: `Journalist #${article.journalistId}` },
          ])
        ).values()
      );
      setJournalists(uniqueJournalists);
    }

    if (!categories.length) {
      const uniqueCategories = Array.from(
        new Map(
          articles.map(article => [
            String(article.categoryId),
            { id: String(article.categoryId), name: `Category #${article.categoryId}` },
          ])
        ).values()
      );
      setCategories(uniqueCategories);
    }
  }, [articles, journalists.length, categories.length]);

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const response = await axios.get('http://localhost:5000/journalists');
      console.log('Journalists fetched:', response.data);
      setJournalists(response.data);
    } catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const response = await axios.get('http://localhost:5000/categories');
      console.log('Categories fetched:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesJournalist = appliedJournalist === '' || String(article.journalistId) === appliedJournalist;
    const matchesCategory = appliedCategory === '' || String(article.categoryId) === appliedCategory;
    return matchesJournalist && matchesCategory;
  });

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '10px' }}>
        Showing {filteredArticles.length} of {articles.length} articles
      </div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalist}
          onChange={e => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(journalist => (
            <option key={journalist.id} value={String(journalist.id)}>
              {journalist.name || `Journalist #${journalist.id}`}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={String(category.id)}>
              {category.name || `Category #${category.id}`}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setAppliedJournalist(selectedJournalist);
            setAppliedCategory(selectedCategory);
          }}
        >Apply Filters</button>
        <button
          type="button"
          onClick={() => {
            setSelectedJournalist('');
            setSelectedCategory('');
            setAppliedJournalist('');
            setAppliedCategory('');
          }}
        >Reset Filters</button>
      </div>

      {filteredArticles.length === 0 ? (
        <div>No articles found.</div>
      ) : (
        <ul>
          {filteredArticles.map(article => (
            <li key={article.id}>
              <strong>{article.title}</strong> <br />
              <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
              <button disabled>Delete</button>
              <button disabled>Update</button>
              <button disabled>View</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}