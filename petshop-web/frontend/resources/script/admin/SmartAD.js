    
const urltim = new URLSearchParams(window.location.search);
const productid = urltim.get('id');
// console.log("productid:", productid);


//update CSDL
if(productid) {
        fetch(`http://localhost:8080/api/smart/${productid}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("loai").value = data.classifySmart;
            document.getElementById("ten").value = data.nameSmart;
            document.getElementById("soluongg").value = data.quantitySmart;
            document.getElementById("nhapgia").value = data.priceSmart;
            document.getElementById("thieu").value = data.brandSmart;
            document.getElementById("previewImage").src = data.imageProductSmart;
            document.getElementById("mota").value = data.describeSmart;
        });
        
        document.getElementById("nutnhap").addEventListener("click", function (e) {
        e.preventDefault();
              const tensp = document.getElementById("ten").value;
    const soluonggg = document.getElementById("soluongg").value;
    const gia = document.getElementById("nhapgia").value;
    const thieuu = document.getElementById("thieu").value;
    const loaivatt = document.getElementById("loai").value;
    const motaa = document.getElementById("mota").value;
    const anhspp = document.querySelector("#anhsp");
    const file = anhspp.files[0];
    let htaiimg = document.getElementById("previewImage").src;
    htaiimg = htaiimg.replace("http://127.0.0.1:5500", "");

    const newsanphamjson = {
        nameSmart: tensp,
        priceSmart: parseFloat(gia),    
        brandSmart: thieuu,
        classifySmart: loaivatt,
        quantitySmart: parseInt(soluonggg),
        describeSmart: motaa,
        imageproductSmart: file ? null : htaiimg
    };

    const formdata = new FormData();
    formdata.append("smart", JSON.stringify(newsanphamjson)); 
    if(file) {
         formdata.append("image", file);
    }
    
    fetch(`http://localhost:8080/api/smart/put/${productid}`, {
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
        document.getElementById("loai").selectedIndex = 0;
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thêm được sản phẩm!\n" + error.message);
    });
      });
    }
    

    // Them san pham vao CSDL
   else
   { 
  
    document.getElementById("nutnhap").addEventListener("click", function (e) {
    e.preventDefault(); 
    const tensp = document.getElementById("ten").value;
    const soluonggg = document.getElementById("soluongg").value;
    const gia = document.getElementById("nhapgia").value;
    const thieuu = document.getElementById("thieu").value;
    const motaa = document.getElementById("mota").value;
    const loai = document.getElementById("loai").value;
    const anhspp = document.querySelector("#anhsp");
    const file = anhspp.files[0];

    const newsanphamjson = {

        nameSmart: tensp,
        priceSmart: parseFloat(gia),    
        brandSmart: thieuu,
        classifySmart: loai,
        describeSmart: motaa,
        quantitySmart: parseInt(soluonggg),
    };

    const formdata = new FormData();
    formdata.append("smart", JSON.stringify(newsanphamjson));
    formdata.append("image", file);
    
    fetch("http://localhost:8080/api/smart/postt", {
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
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Không thêm được sản phẩm!\n" + error.message);
    });
});
   }