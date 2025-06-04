

  fetch("http://localhost:8080/api/smart/T01")
    .then((Response) => Response.json())
    .then(data => {
      const product1 = document.getElementById("product");
      const productlist = document.getElementById("productlist");
  
      
      productlist.innerHTML = "";

      data.forEach(product => {
        const clone = product1.cloneNode(true);
        clone.style.display = "flex";
        clone.removeAttribute("id");
        const img = clone.querySelector(".img");
        const name = clone.querySelector(".name");
        const price = clone.querySelector(".price");
        const brand = clone.querySelector(".brand");
        img.src = product.imageProductSmart;
        name.textContent = product.nameSmart;
        price.textContent = product.priceSmart;
        brand.textContent = product.brandSmart;
        const chitietbt = clone.querySelector(".chitiet");
        productlist.appendChild(clone);
        chitietbt.addEventListener("click", function (e) {         
          e.preventDefault();
          window.location.href = `/petshop-web/frontend/view/Smartdetail.html?id=${product.idSmart}`;
        })
      });

    })
    .catch(error => {
      console.error("Lỗi khi gọi API:", error);
      const productlist = document.getElementById("productlist");
      if (productlist) {
        productlist.innerHTML = "<p>Lỗi khi tải sản phẩm. Vui lòng thử lại.</p>";
      }
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