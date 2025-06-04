

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

function generateTable(data, type) {
  if (!data || data.length === 0) {
    return "<p>Không có dữ liệu.</p>";
  }

  // Chọn các cột muốn hiển thị cho từng loại
  let headers = [];
  if (type === "product") {
    headers = ["idProduct", "name", "classify", "classifyUnder", "classifyUnder2", "dateAdd"];
  } if(type === "user") {
    headers = Object.keys(data[0]); // mặc định hiển thị tất cả cột
  }
  if(type === "smart"){
    headers = ["idSmart","dateAddSmart","nameSmart","priceSmart","classifySmart","quantitySmart"];
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
  
  // Tạo từng dòng dữ liệu
  data.forEach(row => {
    html += `<tr data-id="${row.idProduct}">`;
    headers.forEach(h => {
      html += `<td>${row[h] ?? ''}</td>`; // tránh lỗi nếu dữ liệu không có cột
    });

    if(type === "product"){
      html += `<td>
      <button class="action-btn1" onclick="handleAdd('${type}')">Thêm</button>
      <button class="action-btn2" onclick="handleEdit('${type}', ${row.idProduct})">Sửa</button>
      <button class="action-btn3" onclick="handleDelete('${type}', ${row.idProduct})">Xóa</button>
    </td>`;

    html += "</tr>";
    }
    if(type === "user") {
        html += `<td>
      <button class="action-btn3" onclick="handleDelete1('${type}', ${row.id})">Xóa</button>
    </td>`;

    html += "</tr>";
    }
    if(type === "smart"){
      html += `<td>
      <button class="action-btn1" onclick="handleAdd1('${type}')">Thêm</button>
      <button class="action-btn2" onclick="handleEdit1('${type}', ${row.idSmart})">Sửa</button>
      <button class="action-btn3" onclick="handleDelete2('${type}', ${row.idSmart})">Xóa</button>
    </td>`;
    }
    
  });

  html += "</tbody></table>";

  return html;
}

//ham them
function handleAdd(type) {
  alert(`Bạn muốn thêm mới bản ghi loại ${type}`);
      window.location.href = "ProductAD.html";
}
function handleAdd1(type) {
  alert(`Bạn muốn thêm mới bản ghi loại ${type}`);
      window.location.href = "SmartAD.html";
}


//ham sua
function handleEdit(type, idProduct) {
  alert(`Bạn muốn sửa bản ghi id ${idProduct} loại ${type}`);
    // Điều hướng sang trang sửa sản phẩm
  window.location.href = `ProductAD.html?id=${idProduct}`;
}
function handleEdit1(type, idSmart) {
  alert(`Bạn muốn sửa bản ghi id ${idSmart} loại ${type}`);
  window.location.href = `SmartAD.html?id=${idSmart}`;
}



//ham xoa
function handleDelete(type, idProduct) {
  alert(`Bạn muốn xóa bản ghi id ${idProduct} loại ${type}`);
  fetch(`http://localhost:8080/api/product/dlte?id=${idProduct}`, {
    method: "DELETE",
  })
  .then(res => {
    if (!res.ok) throw new Error("Xóa thất bại");
        const row = document.querySelector(`#${type}Table tr[data-id='${idProduct}']`);
    if (row) row.remove();
  })
  .catch(err => console.error(err));
}

function handleDelete1(type, id) {
  alert(`Bạn muốn xóa bản ghi id ${id} loại ${type}`);
  fetch(`http://localhost:8080/api/user/dlte?id=${id}`, {
    method: "DELETE",
  })
}

function handleDelete2(type, idSmart) {
  alert(`Bạn muốn xóa bản ghi id ${idSmart} loại ${type}`);
  fetch(`http://localhost:8080/api/smart/dlte?id=${idSmart}`, {
    method: "DELETE",
  })
  .then(res => {
    if (!res.ok) throw new Error("Xóa thất bại");
        const row = document.querySelector(`#${type}Table tr[data-id='${idSmart}']`);
    if (row) row.remove();
  })
  .catch(err => console.error(err));
}


async function renderDashboard(content) {
  // Lấy dữ liệu từ API
  const res = await fetch("http://localhost:8080/api/product");
  const data = await res.json();

  const totalProducts = data.length;
  const countByClassify = {};
  data.forEach(item => {
    const key = item.classify || "Khác";
    countByClassify[key] = (countByClassify[key] || 0) + 1;
  });

  // Hiển thị HTML + canvas
  content.innerHTML = `
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <div><h3>Tổng số sản phẩm: ${totalProducts}</h3></div>
      <canvas id="pieChart" width="300" height="300"></canvas>
      <canvas id="barChart" width="400" height="300"></canvas>
    </div>
  `;

  // Biểu đồ tròn
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: Object.keys(countByClassify),
      datasets: [{
        label: "Phân loại sản phẩm",
        data: Object.values(countByClassify),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"]
      }]
    }
  });

  // Biểu đồ cột
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: Object.keys(countByClassify),
      datasets: [{
        label: "Số lượng sản phẩm theo phân loại",
        data: Object.values(countByClassify),
        backgroundColor: "#36a2eb"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
