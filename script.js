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

function fillAPIInputs() {


  // Assuming the data is stored in the first row of the xlsxdata array


let rowIndex1;
  table.addEventListener('click', (event) => {
    // Get the selected row
    let selectedRow = event.target.parentNode;
    // Get the row index
    let rowIndex = Array.from(selectedRow.parentNode.children).indexOf(selectedRow);
    // Get the data from the corresponding row in the xlsxdata array
    const data = xlsxdata[rowIndex];
    rowIndex1 = rowIndex
    console.log(data)
    // Fill the input boxes with the data
    inputBoxes.country_code.value = data[1];
    inputBoxes.unit_number.value = data[0];
    inputBoxes.customer_id.value = data[2];
    inputBoxes.contract_no.value = data[3];
    console.log(inputBoxes.unit_number);
console.log(inputBoxes.country_code);
console.log(inputBoxes.customer_id);
console.log(inputBoxes.contract_no);

    
});


var headers = {
  "Ocp-Apim-Subscription-Key": "979befdb23674a0096119ce2b7b00467"
};
var endpoint = "https://developer-portal-api-stage.otiselevator.com/elevatormaintenance/api/latestmaintenanceinfo?country_code=" + xlsxdata[3][0] + "&customer_id=" + xlsxdata[3][2] + "&contract_no=" + xlsxdata[3][3];

// Send a GET request to the API endpoint
var response = new XMLHttpRequest();
response.open('GET', endpoint);
response.setRequestHeader("Ocp-Apim-Subscription-Key", "979befdb23674a0096119ce2b7b00467");

response.onload = function() {
  if (response.status === 200) {
    var data = JSON.parse(response.responseText);

    // Do something with the data, such as display it on the page
    var html = "<table class='table table-striped'>" +
              "<thead>" +
                "<tr>" +
                  "<th>Customer ID</th>" +
                  "<th>Unit Number</th>" +
                  "<th>Issue</th>" +
                "</tr>" +
              "</thead>" +
              "<tbody>";
for (var i = 0; i < data.length; i++) {
  html += "<tr>" +
            "<td>" + data[i].customer_id + "</td>" +
            "<td>" + data[i].unit_number + "</td>" +
            "<td>" + data[i].type_of_visit + "</td>" +
          "</tr>";
}
html += "</tbody>" +
        "</table>";
document.getElementById("api-response").innerHTML = html;

  } else {
    console.error('Error:', response.status, response.statusText);
  }
};

response.send();

}
