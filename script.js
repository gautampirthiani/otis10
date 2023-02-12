const inputbox = document.getElementById("file-input");
const table = document.getElementById("excel-table");

const xlsxdata = [];

inputbox.addEventListener('change', (event) => {
    const filename = event.target.files[0];
    console.log(filename);
    readXlsxFile(filename).then((rows) => {
        // Clear the table
        table.innerHTML = '';

        // Add the rows to the table
        rows.forEach((row) => {
            //create row element
            const tr = document.createElement('tr');
            const innerlist = [];
            row.forEach((cell) => {
                //create cell element
                const td = document.createElement('td');
                td.textContent = cell;
                innerlist.push(cell);
                
                tr.appendChild(td);
            });
            table.appendChild(tr);
            xlsxdata.push(innerlist);
        });

        fillAPIInputs();
    });
});
const inputBoxes = {
  country_code: document.getElementById("country_code-input"),
  unit_number: document.getElementById("unit_number-input"),
  customer_id: document.getElementById("customer_id-input"),
  contract_no: document.getElementById("contract_no-input"),
};
console.log(inputBoxes.unit_number);
console.log(inputBoxes.country_code);
console.log(inputBoxes.customer_id);
console.log(inputBoxes.contract_no);

function fillAPIInputs() {


  // Assuming the data is stored in the first row of the xlsxdata array

  const data = xlsxdata[4];
  
  console.log(data);
  console.log(xlsxdata);

  // Fill the input boxes with the data
  inputBoxes.country_code.value = data[1];
  inputBoxes.unit_number.value = data[0];
  inputBoxes.customer_id.value = data[2];
  inputBoxes.contract_no.value = data[3];
  

  var headers = {
    "Ocp-Apim-Subscription-Key": "979befdb23674a0096119ce2b7b00467"
  };
  var endpoint = "https://developer-portal-api-stage.otiselevator.com/elevatormaintenance/api/latestmaintenanceinfo?country_code=" + xlsxdata[1][0] + "&customer_id=" + xlsxdata[1][2] + "&contract_no=" + xlsxdata[1][3];



  
 // Send a GET request to the API endpoint
var response = new XMLHttpRequest();
response.open('GET', endpoint);
response.setRequestHeader("Ocp-Apim-Subscription-Key", "979befdb23674a0096119ce2b7b00467");
response.send();
console.log(response.responseType, response.responseText);
console.log(response.responseText);
// response.onload = function() {
//   if (response.status === 200) {
//     var data = JSON.parse(response.responseText);
//     document.getElementById("api-response").innerHTML = data[2].name;
//   } else {
//     console.error("Request failed. Returned status of " + response.status);
//   }
// };

//var data1 = JSON.parse(response.responseText);
//     // Do something with the data, such as display it on the page
//     // Example: display the name of the first item in the data array
//     document.getElementById("api-response").innerHTML = data1[0].name;
  }
