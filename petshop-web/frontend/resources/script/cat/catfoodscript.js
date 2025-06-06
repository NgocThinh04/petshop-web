document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".chonThucAn");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      const id = this.value;
      window.location.href = `catfood.html?category=${id}`;
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (category) {
    fetch(`http://localhost:8080/api/cat/${category}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        showProducts(data);
        const defaultCheckbox = document.querySelector(`input[value="${category}"]`);
        if (defaultCheckbox) defaultCheckbox.checked = true;
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);
        document.getElementById("productlist").innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại.</p>";
      });
  } else {
    fetch("http://localhost:8080/api/cat/")
      .then(response => {
        if (!response.ok) throw new Error("Lỗi HTTP");
        return response.json();
      })
      .then(data => {
        showProducts(data);
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);
        document.getElementById("productlist").innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại.</p>";
      });
  }

  function showProducts(data) {
    const product1 = document.getElementById("product");
    const productlist = document.getElementById("productlist");
    productlist.innerHTML = ""; 

    data.forEach(product => {
      const clone = product1.cloneNode(true);
      clone.style.display = "flex";
      clone.removeAttribute("id");

      clone.querySelector(".img").src = product.imageproduct;
      clone.querySelector(".name").textContent = product.name || "Tên sản phẩm";
      clone.querySelector(".price").textContent = product.price || "Chưa cập nhật";
      clone.querySelector(".brand").textContent = product.brand || "Thương hiệu";

      clone.querySelector(".chitiet").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = `/petshop-web/frontend/view/Productdetails.html?id=${product.idProduct}`;
      });
      productlist.appendChild(clone);
    });
  }
});
