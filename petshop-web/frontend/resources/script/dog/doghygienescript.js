
document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll(".chonThucAn");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
      const id = this.value; 
      window.location.href = `doghygiene.html?category=${id}`;
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "vesinhrangmieng";

  fetch(`http://localhost:8080/api/dog/${category}`)
    .then(response => {
      console.log("API response status:", response.status);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Data received:", data);
      const product1 = document.getElementById("product");
      const productlist = document.getElementById("productlist");
  
      
      productlist.innerHTML = ""; // Xóa sản phẩm cũ

      data.forEach(product => {
        const clone = product1.cloneNode(true);
        clone.style.display = "flex";
        clone.removeAttribute("id");
        const img = clone.querySelector(".img");
        const name = clone.querySelector(".name");
        const price = clone.querySelector(".price");
        const brand = clone.querySelector(".brand");
        img.src = product.imageproduct;
        name.textContent = product.name;
        price.textContent = product.price;
        brand.textContent = product.brand;
        const chitietbt = clone.querySelector(".chitiet");
        productlist.appendChild(clone);
        chitietbt.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = `/petshop-web/frontend/view/Productdetails.html?id=${product.idProduct}`;
        })
      });
      // Đánh dấu checkbox tương ứng
      const defaultCheckbox = document.querySelector(`input[value="${category}"]`);
      if (defaultCheckbox) {
        defaultCheckbox.checked = true;
      }


    })
    .catch(error => {
      console.error("Lỗi khi gọi API:", error);
      const productlist = document.getElementById("productlist");
      if (productlist) {
        productlist.innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại.</p>";
      }
    });
});

// fetch("http://localhost:8080/api/cat")
// .then((Response) => Response.json())
//     .then((data) => {
//         const product1 = document.getElementById("product");
//         const productlist = document.getElementById("productlist");

//         data.forEach((product) => {
//             const clone = product1.cloneNode(true);
//             clone.style.display = "flex";
//             clone.removeAttribute("id");
            
//             clone.querySelector(".img").src = product.imageproduct;
//             clone.querySelector(".name").textContent = product.name || "Tên sản phẩm";
//             clone.querySelector(".price").textContent = product.price || " Chưa cập nhật";
//             clone.querySelector(".brand").textContent = product.brand || "Thương hiệu";
//             productlist.appendChild(clone);
//         });
//     })
//     .catch((error) => {
//         console.error("Loi",error);
// });