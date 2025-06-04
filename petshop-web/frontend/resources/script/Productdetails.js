const urltim = new URLSearchParams(window.location.search);
const productid = urltim.get('id');

if(productid) {
    fetch(`http://localhost:8080/api/product/${productid}`)
    .then(res => res.json())
    .then(data =>{ 
                document.getElementById("namee").textContent = data.name;
                document.getElementById("brandd").textContent = data.brand;
                document.getElementById("costtt").textContent = data.price;
                 document.getElementById("img").src = data.imageproduct;  
    });
}