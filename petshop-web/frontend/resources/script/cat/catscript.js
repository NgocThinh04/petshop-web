fetch("http://localhost:8080/api/cat")
    .then((Response) => Response.json())
    .then((data) => {
        const product1 = document.getElementById("product");
        const productlist = document.getElementById("productlist");

        data.forEach((product) => {
            const clone = product1.cloneNode(true);
            clone.style.display = "flex";
            clone.removeAttribute("id");
            
            clone.querySelector(".img").src = product.imageproduct;
            clone.querySelector(".name").textContent = product.name || "Tên sản phẩm";
            clone.querySelector(".price").textContent = product.price || " Chưa cập nhật";
            clone.querySelector(".brand").textContent = product.brand || "Thương hiệu";
            productlist.appendChild(clone);
        });
    })
    .catch((error) => {
        console.error("Loi",error);
});


