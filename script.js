const inputbox  = document.getElementById("file-input");
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
    });
    console.log(xlsxdata);
});