// fetchData.js
import { supabase } from './supabaseClient.js'; // Adjust the path if necessary

const fetchDataFromAllTables = async () => {
  const tables = ['skala', 'peringkat']; // List tables with data
  const results = {};

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`Error fetching data from ${table}:`, error.message);
      results[table] = [];
    } else {
      results[table] = data;
    }
  }

  // Display data in HTML
  displayData(results);
};

const displayData = (results) => {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '<h2>Data From Supabase</h2>'; // Clear previous content

  for (const [table, data] of Object.entries(results)) {
    const tableHeader = document.createElement('h3');
    tableHeader.textContent = table.charAt(0).toUpperCase() + table.slice(1);
    dataContainer.appendChild(tableHeader);

    if (data.length > 0) {
      const ul = document.createElement('ul');
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = JSON.stringify(item); // Displaying each record
        ul.appendChild(li);
      });
      dataContainer.appendChild(ul);
    } else {
      const noDataMessage = document.createElement('p');
      noDataMessage.textContent = 'No data found';
      dataContainer.appendChild(noDataMessage);
    }
  }
};

// Call the fetch function when the window loads
window.onload = fetchDataFromAllTables;
