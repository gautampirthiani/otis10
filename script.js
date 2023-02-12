async function fetchAPI() {
  // Read data from an input Excel file
  var file = document.getElementById("fileInput").files[0];
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = async function(e) {
    var data = new Uint8Array(reader.result);
    var wb = XLSX.read(data, {type: 'array'});
    var firstSheetName = wb.SheetNames[0];
    var worksheet = wb.Sheets[firstSheetName];
    var customerIds = XLSX.utils.sheet_to_json(worksheet, { header: 1, column: 3 });
    var contractNos = XLSX.utils.sheet_to_json(worksheet, { header: 1, column: 4 });
    var countryCodes = XLSX.utils.sheet_to_json(worksheet, { header: 1, column: 1 });

    // Add the subscription key to the API request header
    var headers = {
      "Ocp-Apim-Subscription-Key": "979befdb23674a0096119ce2b7b00467"
    };
  
    // An array to store the API response data
    var apiData = [];
  
    // Loop through the arrays of customer IDs, contract numbers, and country codes
    for (var i = 0; i < customerIds.length; i++) {
      // Replace placeholders in the API endpoint with values from the arrays
      var endpoint = "https://developer-portal-api-stage.otiselevator.com/elevatormaintenance/api/latestmaintenanceinfo?country_code=" + countryCodes[i] + "&customer_id=" + customerIds[i] + "&contract_no=" + contractNos[i];
  
      // Send a GET request to the API endpoint
      var response = await fetch(endpoint, {
        headers: headers
      });
  
      // Parse the API response as a JSON object
      var data = await response.json();
      apiData.push(data);
    }
  
    // Return the data fetched from the API
    return apiData;
  }
}
var data = fetchAPI();
console.log(data);
