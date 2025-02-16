document.getElementById('analyzeButton').addEventListener('click', function () {
    const article = document.getElementById('articleText').value;
    const resultElement = document.getElementById('result');
  
    // Sending the article to the backend via POST request
    fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: article }),
    })
      .then(response => response.json())
      .then(data => {
        resultElement.textContent = data.result;  // Display the result in the 'result' element
      })
      .catch(error => {
        resultElement.textContent = 'Error: ' + error.message;  // Display error message if the request fails
      });
  });
  