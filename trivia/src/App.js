// make AJAX request in this file here!
import axios from "axios"
import SelectCategory from './Category'
import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])

  const handleSelectedCategory = (category) => {
    console.log("Your selected category is: ", category)
    setSelectedCategory(category)
  }


// axaj call to retrieve list of categories from the database
  useEffect (() => {
    axios
    .get("https://opentdb.com/api_category.php")
    .then((res) => setCategories(res.data.trivia_categories))
    
    
  },[])
  

return (
  <div className="container">
    <h1>Welcome to Trivia!</h1>
    <h2>Pick a category below to get started:</h2>
    {selectedCategory ? (
      <SelectCategory category={selectedCategory} />
    ) : (
      categories.map((category) => (
        
        <div
          className="category-card"
          key={category.id}
          onClick={() => handleSelectedCategory(category)}
        >
          <h4>{category.name}</h4>
        </div>
      ))
    )}

  </div>
)
}
export default App;
