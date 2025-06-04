const urltim = new URLSearchParams(window.location.search);
const productid = urltim.get('id');

if(productid) {
    fetch(`http://localhost:8080/api/smart/${productid}`)
    .then(res => res.json())
    .then(data =>{ 
                document.getElementById("namee").textContent = data.nameSmart;
                document.getElementById("brandd").textContent = data.brandSmart;
                document.getElementById("costtt").textContent = data.priceSmart;
                document.getElementById("img").src = data.imageProductSmart;  
    });
}