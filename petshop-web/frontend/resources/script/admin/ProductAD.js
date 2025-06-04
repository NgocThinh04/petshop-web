    
const urltim = new URLSearchParams(window.location.search);
const productid = urltim.get('id');

if(productid) {
        fetch(`http://localhost:8080/api/product/${productid}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("ten").value = data.name;
            document.getElementById("soluongg").value = data.quantity;
            document.getElementById("nhapgia").value = data.price;
            document.getElementById("thieu").value = data.brand;
            document.getElementById("loai").value = data.classify;
            document.getElementById("Danhmuc").value = data.classifyUnder;
            document.getElementById("previewImage").src = data.imageproduct;
        });
        
        document.getElementById("nutnhap").addEventListener("click", function (e) {
        e.preventDefault();


              const tensp = document.getElementById("ten").value;
    const soluonggg = document.getElementById("soluongg").value;
    const gia = document.getElementById("nhapgia").value;
    const thieuu = document.getElementById("thieu").value;
    const motaa = document.getElementById("mota").value;
    const loaivatt = document.getElementById("loai").value;
    const danhmucc = document.getElementById("Danhmuc").value;
    const anhspp = document.querySelector("#anhsp");
    const file = anhspp.files[0];
    let htaiimg = document.getElementById("previewImage").src;
    htaiimg = htaiimg.replace("http://127.0.0.1:5500", "");

    const timloaidanhmuccon = Array.from(document.querySelectorAll(".select-loai"))
        .find(select => select.style.display !== "none");
    
    if (!timloaidanhmuccon) {
        alert("Vui lòng chọn loại sản phẩm !");
        return;
    }

    const loaidanhmuccon = timloaidanhmuccon.value;

    const newsanphamjson = {
        name: tensp,
        price: parseFloat(gia),    
        brand: thieuu,
        classify: loaivatt,
        describe: motaa,
        quantity: parseInt(soluonggg),
        classifyUnder2: loaidanhmuccon,
        classifyUnder: danhmucc,
        imageproduct: file ? null : htaiimg
    };

    const formdata = new FormData();
    formdata.append("product", JSON.stringify(newsanphamjson));
    if(file) {
         formdata.append("image", file);
    }
    
    fetch(`http://localhost:8080/api/product/put/${productid}`, {
        method: "PUT",
        body: formdata
    })
    .then(res => {
        if (!res.ok) throw new Error("Thêm thất bại");
        return res.json();
    })
    .then(data => {
        console.log("Server trả về:", data);
        document.getElementById("ten").value = "";
        document.getElementById("soluongg").value = "";
        document.getElementById("nhapgia").value = "";
        document.getElementById("thieu").value = "";
        document.getElementById("mota").value = "";
        document.getElementById("loai").selectedIndex = 0;
        document.getElementById("Danhmuc").selectedIndex = 0;
        timloaidanhmuccon.selectedIndex = 0;
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thêm được sản phẩm!\n" + error.message);
    });
      });
    }
    
   else
   
   { 
  
    document.getElementById("nutnhap").addEventListener("click", function (e) {
    e.preventDefault(); 
    const tensp = document.getElementById("ten").value;
    const soluonggg = document.getElementById("soluongg").value;
    const gia = document.getElementById("nhapgia").value;
    const thieuu = document.getElementById("thieu").value;
    const motaa = document.getElementById("mota").value;
    const loaivatt = document.getElementById("loai").value;
    const danhmucc = document.getElementById("Danhmuc").value;
    const anhspp = document.querySelector("#anhsp");
    const file = anhspp.files[0];

    const timloaidanhmuccon = Array.from(document.querySelectorAll(".select-loai"))
        .find(select => select.style.display !== "none");

    if (!timloaidanhmuccon) {
        alert("Vui lòng chọn loại sản phẩm !");
        return;
    }

    const loaidanhmuccon = timloaidanhmuccon.value;

    const newsanphamjson = {
        name: tensp,
        price: parseFloat(gia),    
        brand: thieuu,
        classify: loaivatt,
        describe: motaa,
        quantity: parseInt(soluonggg),
        classifyUnder2: loaidanhmuccon,
        classifyUnder: danhmucc,
    };

    const formdata = new FormData();
    formdata.append("product", JSON.stringify(newsanphamjson));
    formdata.append("image", file);
    
    fetch("http://localhost:8080/api/product/postt", {
        method: "POST",
        body: formdata
    })
    .then(res => {
        if (!res.ok) throw new Error("Thêm thất bại");
        return res.json();
    })
    .then(data => {
        console.log("Server trả về:", data);
        document.getElementById("ten").value = "";
        document.getElementById("soluongg").value = "";
        document.getElementById("nhapgia").value = "";
        document.getElementById("thieu").value = "";
        document.getElementById("mota").value = "";
        document.getElementById("loai").selectedIndex = 0;
        document.getElementById("Danhmuc").selectedIndex = 0;
        timloaidanhmuccon.selectedIndex = 0;
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thêm được sản phẩm!\n" + error.message);
    });
});
   }