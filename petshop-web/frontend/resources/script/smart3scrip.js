fetch("http://localhost:8080/api/product-smart3")
    .then((response) => response.json())
    .then((data) => {
        const productTemplate = document.getElementById("product-smart3-template");
        const productList = document.getElementById("product-smart3-list");

        data.forEach((product) => {
            const clone = productTemplate.cloneNode(true);
            clone.style.display = "flex";
            clone.removeAttribute("id");

            clone.querySelector(".name").textContent = product.nameSmart || "Tên sản phẩm";
            clone.querySelector(".price").textContent = product.priceSmart || "Chưa cập nhật";
            clone.querySelector(".brand").textContent = product.brandSmart || "Thương hiệu";

            productList.appendChild(clone);
        });
    })
    .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm smart:", error);
    });