document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('url-form');
    const urlInput = document.getElementById('url-input');
    const urlList = document.getElementById('url-list');
  
    // Retrieve URLs from localStorage and display them on load
    const savedUrls = JSON.parse(localStorage.getItem('urls')) || [];
    updateUrlList(savedUrls);
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const urlValue = urlInput.value;
  
      // Get existing URLs from localStorage
      let urls = JSON.parse(localStorage.getItem('urls')) || [];
  
      // Add the new URL to the list
      urls.push(urlValue);
  
      // Save the updated list back to localStorage
      localStorage.setItem('urls', JSON.stringify(urls));
  
      // Update the UI with the new list
      updateUrlList(urls);
  
      // Clear the input field
      urlInput.value = '';
    });
  
    // Function to update the displayed list of URLs
    function updateUrlList(urls) {
      urlList.innerHTML = ''; // Clear the current list
      urls.forEach((url, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
  
        // Create a remove button for each URL
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.addEventListener('click', function() {
          removeUrl(index);
        });
  
        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        urlList.appendChild(listItem);
      });
    }
  
    // Function to remove URL by index
    function removeUrl(index) {
      let urls = JSON.parse(localStorage.getItem('urls')) || [];
  
      // Remove the URL at the specified index
      urls.splice(index, 1);
  
      // Save the updated list back to localStorage
      localStorage.setItem('urls', JSON.stringify(urls));
  
      // Update the displayed list
      updateUrlList(urls);
    }
  });
  