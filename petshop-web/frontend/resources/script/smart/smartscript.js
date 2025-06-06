fetch("http://localhost:8080/api/smart")
    .then((Response) => Response.json())
    .then((data) => {
        const product1 = document.getElementById("product");
        const productlist = document.getElementById("productlist");

        data.forEach((product) => {
            const clone = product1.cloneNode(true);
            clone.style.display = "flex";
            clone.removeAttribute("id");
            
            clone.querySelector(".img").src = product.imageProductSmart;
            clone.querySelector(".name").textContent = product.nameSmart || "Tên sản phẩm";
            clone.querySelector(".price").textContent = product.priceSmart || " Chưa cập nhật";
            clone.querySelector(".brand").textContent = product.brandSmart || "Thương hiệu";
             clone.querySelector(".chitiet").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = `/petshop-web/frontend/view/Smartdetail.html?id=${product.idSmart}`;
      });
            productlist.appendChild(clone);
        });
    })
    .catch((error) => {
        console.error("Loi",error);
});


