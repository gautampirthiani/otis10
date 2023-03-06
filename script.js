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
            var innerlist = [];
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

        // Fill the API input boxes with the data from xlsxdata
        fillAPIInputs();
    });
    console.log(xlsxdata);
});

function fillAPIInputs() {
  const inputBoxes = {
    unit_number: document.getElementById("unit-number-input"),
    country_code: document.getElementById("country-code-input"),
    customer_id: document.getElementById("customer-id-input"),
    contract_no: document.getElementById("contract-no-input"),
    start_date: document.getElementById("start-date-input"),
    end_date: document.getElementById("end-date-input"),
  };

  // Assuming the data is stored in the first row of the xlsxdata array
  const data = xlsxdata[0];

  // Fill the input boxes with the data
  inputBoxes.unit_number.value = data[0];
  inputBoxes.country_code.value = data[1];
  inputBoxes.customer_id.value = data[2];
  inputBoxes.contract_no.value = data[3];
  inputBoxes.start_date.value = data[4];
  inputBoxes.end_date.value = data[5];
}

