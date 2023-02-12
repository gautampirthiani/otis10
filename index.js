const customerId = "your_customer_id";
const contractNo = "your_contract_no";
const countryCode = "your_country_code";

// Read the data from the Excel file
const readExcelData = () => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      resolve(XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
    };
    reader.readAsBinaryString(input.files[0]);
  });
};

const input = document.createElement("input");
input.type = "file";
input.accept = ".xlsx";
input.addEventListener("change", async () => {
  const data = await readExcelData();
  customerId = data[1][0];
  contractNo = data[1][1];
  countryCode = data[1][2];
  fetchData();
});
document.body.appendChild(input);

// Fetch the data from the API
const fetchData = () => {
  fetch(
    `https://developer-portal-api-stage.otiselevator.com/elevatormaintenance/api/latestmaintenanceinfo?country_code=${countryCode}&customer_id=${customerId}&contract_no=${contractNo}`
  )
    .then(response => response.json())
    .then(data => {
      const maintenanceBody = document.getElementById("maintenance-body");
      data.forEach(maintenanceInfo => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${maintenanceInfo.elevator_id}</td>
          <td>${maintenanceInfo.maintenance_type}</td>
          <td>${maintenanceInfo.maintenance_date}</td>
        `;
        maintenanceBody.appendChild(row);
      });
    });
};
