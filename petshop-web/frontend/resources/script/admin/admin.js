
// Ham nhan gia tri button doi trangtrang
async function showContent(type) {
  const content = document.getElementById("mainContent");

  if (type === "dashboard") {
    renderDashboard(content);
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/${type}`);
    const data = await response.json();
    content.innerHTML = generateTable(data, type);
  } catch (err) {
    console.error("Lỗi lấy dữ liệu:", err);
    content.innerHTML = "<p>Không thể tải dữ liệu.</p>";
  }
}

// ham hien thi ten cot dua tren du lieu json
function generateTable(data, type) {
  if (!data || data.length === 0) {
    return "<p>Không có dữ liệu.</p>";
  }

  let headers = [];
  if (type === "product") {
    headers = ["idProduct", "name", "classify", "classifyUnder", "classifyUnder2", "dateAdd"];
  } if(type === "user") {
    headers = Object.keys(data[0]);
  }
  if(type === "smart"){
    headers = ["idSmart","dateAddSmart","nameSmart","priceSmart","classifySmart","quantitySmart"];
  }
  if(type === "bill"){
    headers = ["idBill","billTotal","billDate","idUser"];
  }
    let html = `<table id="${type}Table"><thead><tr>`;

  // Tạo tiêu đề bảng
  headers.forEach(h => {
    html += `<th>${h}</th>`;
  });
  
  // Thêm cột thao tác
  html += `<th>Thao tác</th>
    </tr>
  </thead>
  <tbody>`;
  
  // Tạo từng dòng dữ liệu dựa trên jsonjson
  data.forEach(row => {
    html += `<tr data-id="${row.id}">`;
    headers.forEach(h => {
      html += `<td>${row[h] ?? ''}</td>`;
    });

    //hien thi nut theo product
    if(type === "product"){
      html += `<td>
      <button class="action-btn1" onclick="handleAdd()">Thêm</button>
      <button class="action-btn2" onclick="handleEdit(${row.idProduct})">Sửa</button>
      <button class="action-btn3" onclick="handleDelete('${type}', ${row.idProduct})">Xóa</button>
    </td>`;

    html += "</tr>";
    }
    //hien thi nut theo smart
    if(type === "smart"){
      html += `<td>
      <button class="action-btn1" onclick="handleAdd1()">Thêm</button>
      <button class="action-btn2" onclick="handleEdit1(${row.idSmart})">Sửa</button>
      <button class="action-btn3" onclick="handleDelete2('${type}', ${row.idSmart})">Xóa</button>
    </td>`;
    }
  });

  html += "</tbody></table>";

  return html;
}

//ham them
function handleAdd() {
      window.location.href = "ProductAD.html";
}
function handleAdd1() {
      window.location.href = "SmartAD.html";
}
//ham sua
function handleEdit(idProduct) {
  window.location.href = `ProductAD.html?id=${idProduct}`;
}
function handleEdit1(idSmart) {
  window.location.href = `SmartAD.html?id=${idSmart}`;
}
//ham xoa
function handleDelete(type, idProduct) {
  fetch(`http://localhost:8080/api/product/dlte?id=${idProduct}`, {
    method: "DELETE",
  })
  .then(res => {
    const row = document.querySelector(`#${type}Table tr[data-id='${idProduct}']`);
    if (row) row.remove();
  })
  .catch(err => console.error(err));
}

function handleDelete2(type, idSmart) {
  fetch(`http://localhost:8080/api/smart/dlte?id=${idSmart}`, {
    method: "DELETE",
  })
  .then(res => {
        const row = document.querySelector(`#${type}Table tr[data-id='${idSmart}']`);
    if (row) row.remove();
  })
  .catch(err => console.error(err));
}





//ham hien thi du lieu thong keke
async function renderDashboard(content) {
  const [resStats, resLine,resQty ] = await Promise.all([
    fetch("http://localhost:8080/api/product/admin"),
    fetch("http://localhost:8080/api/product/adminlinec"),
    fetch("http://localhost:8080/api/product/admin/quantity-summary")
  ]);

  const stats = await resStats.json();
  const lineData = await resLine.json();
  const quantityData  = await resQty.json();

     // hien thi thong ke ở các ô
  content.innerHTML = `
    <div class="div">
      <div class="divtkecha">
        <div class="div1">
          <h3>Cat supplies: 📊</h3>
          <h2>${stats["C01"]} PR</h2>
        </div>
        <div class="div1">
          <h3>Dog supplies: tích 📈</h3>
          <h2>${stats["D01"]} PR</h2>
        </div>
        <div class="div1">
          <h3>Smart devices: 🧮</h3>
          <h2>${stats["Smart"]} PR</h2>
        </div>
        <div class="div1">
          <h3>Total users: 📝</h3>
          <h2>${stats["User"]} US</h2>
        </div>
      </div>

      <div class="divcanvascha">
        <div class = "divbdocotcha">
           <div class="barChartt">
             <canvas id="lineChart"></canvas>
           </div>
           <div class="barChartt1">
             <canvas id="barChart"></canvas>
           </div>
        </div>
        
        
        <div class="divpiee">
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  `;

     //Biểu đồ tròn
  const label =  Object.keys(quantityData); 
const value = Object.values(quantityData);

const ctxx = document.getElementById("pieChart").getContext("2d");
new Chart(ctxx, {
  type: "pie",
  data: {
    labels: label,
    datasets: [{
      label: "Số lượng sản phẩm còn lại theo phân loại",
      data: value,
      backgroundColor: ["#ffcd56", "red", "#9966ff"]
    }]
  },
  options: {
    maintainAspectRatio: false,
  }
});

  //Biểu đồ cột dạng cột
  const labels = Object.keys(quantityData); 
const values = Object.values(quantityData);

const ctx = document.getElementById("barChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [{
      label: "Số lượng sản phẩm còn lại theo phân loại",
      data: values,
      backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0"]
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  }
});



  // Chuẩn bị dữ liệu line chart doanh thu theo tháng
  const monthsSet = new Set(lineData.map(item => item.month));
  const months = Array.from(monthsSet).sort();

  const revenueByType = { "D01": {}, "C01": {}, "Smart": {}};
  lineData.forEach(item => {
    const { month, type, total } = item;
    if (!revenueByType[type]) revenueByType[type] = {};
    revenueByType[type][month] = total;
  });

  const dogData = months.map(month => revenueByType["D01"][month] || 0);
  const catData = months.map(month => revenueByType["C01"][month] || 0);
  const snmartData = months.map(month => revenueByType["Smart"][month] || 0);




  // Vẽ biểu đồ cột dạng Line chart
  const lineCtx = document.getElementById("lineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Doanh thu các sản phẩm từ cún",
          data: dogData,
          borderColor: "blue",
          backgroundColor: "rgba(0,0,255,0.1)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Doanh thu các sản phẩm từ mèo",
          data: catData,
          borderColor: "orange",
          backgroundColor: "rgba(255,165,0,0.1)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Doanh thu các sản phẩm từ thiết bị",
          data: snmartData,
          borderColor: "green",
          backgroundColor: "rgba(234, 210, 164, 0.1)",
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Doanh thu theo tháng - Sản phẩm chó & mèo"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Doanh thu (VNĐ)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Tháng (yyyy-MM)"
          }
        }
      }
    }
  });
}