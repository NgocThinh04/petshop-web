const urltim = new URLSearchParams(window.location.search);
const productid = urltim.get('id');
//Biến toàn cục
let productData = null;
let total_item = 0;

if(productid) {
    fetch(`http://localhost:8080/api/product/${productid}`)
    .then(res => res.json())
    .then(data =>{ 
      data.id = productid;
         productData = data;
                document.getElementById("namee").textContent = data.name;
                document.getElementById("brandd").textContent = data.brand;
                document.getElementById("costtt").textContent = data.price;
                 document.getElementById("img").src = data.imageproduct;  
                 total_item = data.price;

                 updateTotal();
    });
}
document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
});
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') +  '₫';
  }
  
  function changeQuantity(change) {
    let quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);
  
    quantity = Math.max(1, quantity + change);
    quantityInput.value = quantity;
  
    updateTotal();
  }
  
  function updateTotal() {
    let quantity = parseInt(document.getElementById("quantity").value);
    let total = total_item * quantity;
    
    document.getElementById("total").textContent = "Tổng số tiền: " + formatCurrency(total);
    document.getElementById("total-cart").textContent = "Tổng tiền: " + formatCurrency(total);
  }

  function addWishlist() {
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập.");
      return;
    }
  
    // if (!productData || !productData.id) {
    //   console.error("Dữ liệu sản phẩm không hợp lệ.");
    //   return;
    // }
  
    const username = getCurrentUser().userName;
    const wishlistKey = `wishlist_${username}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    wishlist = wishlist.map(id => Number(id)); 
    const productIdNum = Number(productData.id);
    if (wishlist.includes(productIdNum)) {
      alert("Sản phẩm đã có trong wishlist.");
      return;
    }
  
    wishlist.push(productIdNum);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    alert("Đã thêm vào wishlist!");
    renderWishlist();
    
}

function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return user;
    
}
console.log(JSON.parse(localStorage.getItem("userInfo")));
function isLoggedIn() {
    return !!getCurrentUser(); 
  }  
function showInfoProduct(product) {
  console.log("Wishlist:", product);
    const container = document.getElementById("items");

    const itemDiv = document.createElement("div");
    itemDiv.className = "wishlist-item";
    itemDiv.innerHTML = `
      <p>${product.name}</p>
      <p>${Number(product.price).toLocaleString('vi-VN')}₫</p>
      <button onclick="removeFromWishlist(${product.idProduct}, this)">
        <img src="/petshop-web/frontend/resources/image/icons8-close-96.png" alt="X" />
      </button>
    `;
   
    container.appendChild(itemDiv);
  }

  function removeFromWishlist(productId) {   
    if (!isLoggedIn()) {
      alert("Bạn cần đăng nhập.");
      return;
    }
  
    const username = getCurrentUser().userName;
    const wishlistKey = `wishlist_${username}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    const productIdNum = Number(productId); 
    wishlist = wishlist.map(id => Number(id)); 
  
    const index = wishlist.indexOf(productIdNum); 
    if (index > -1) {
      wishlist.splice(index, 1); 
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  
      renderWishlist(); 
      alert("Đã xoá sản phẩm khỏi wishlist.");
    } else {
      
      alert("Không tìm thấy sản phẩm trong wishlist.");
    }
  }
  function renderWishlist() {
    if (!isLoggedIn()) return;
  
    const container = document.getElementById("items");
    container.innerHTML = ""; 
  
    const username = getCurrentUser().userName;
    const wishlistKey = `wishlist_${username}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    wishlist.forEach(productId => {
      fetch(`http://localhost:8080/api/product/${productId}`)
        .then(res => res.json())
        .then(product => {
          showInfoProduct(product);
        })
        .catch(err => console.error("Lỗi tải sản phẩm wishlist:", err));
    });
  }

//Cart
function addCart() {
  if(!isLoggedIn()) {
    alert("Bạn cần đăng nhập.")
    return;
  }
  const username = getCurrentUser().userName;
  const cartKey = `cart_${username}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart = cart.map(id => Number(id));
  const cartProductId = Number(productData.id);
  if(cart.includes(cartProductId)) {
      alert("Sản phẩm đã có trong giỏ hàng.");
      return;
  }
  cart.push(cartProductId);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
  renderCart();
}
function showInfoCart(product) {
  console.log("Cart:", product);
  const container = document.getElementById("cart");
  
  let quantityInput = document.getElementById("quantity");
  let quantity = quantityInput ? parseInt(quantityInput.value) : 1;
  let total = Number(product.price) * quantity;
  const itemDiv = document.createElement("div");
  itemDiv.className = "cart-items";
  itemDiv.innerHTML = `
      <p>${product.name}</p>
      <p>Đơn giá:${Number(product.price).toLocaleString('vi-VN')}₫</p>
      <p>Số lượng:${quantity}</p>
      <p>Tổng tiền:${formatCurrency(total)}</p>
      <button onclick="removeCart(${product.idProduct}, this)">
        <img src="/petshop-web/frontend/resources/image/icons8-close-96.png" alt="X" />
      </button>
      
  `;
 //Payment
  const nameTextEl = document.getElementById("text-name");
  if (nameTextEl) {
    const productNameElem = document.createElement("p");
    productNameElem.textContent = product.name;
    nameTextEl.appendChild(productNameElem);
  }

  container.appendChild(itemDiv);

  const totalEl = document.getElementById("total-amount");
  if (totalEl) {
    totalEl.textContent = "Tổng: " + formatCurrency(totalCartAmount);
  }
}
function removeCart(productId) {
  const username = getCurrentUser().userName;
  const cartKey = `cart_${username}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartNumber = Number(productId);
  cart = cart.map(id => Number(id));

  const index = cart.indexOf(cartNumber);
  if(index > -1) {
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));

    renderCart();
    alert("Đã xoá sản phẩm khỏi cart.");
  } else {
    alert("Không tìm thấy sản phẩm trong cart.");
  }
}
// function renderCart() {
//   if(!isLoggedIn()) return;

//   const container = document.getElementById("cart");
//   container.innerHTML = "";

  
//   const username = getCurrentUser().username;
//   const cartKey = `cart_${username}`;
//   let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

//   cart.forEach(productId => {
//     fetch(`http://localhost:8080/api/product/${productId}`)
//     .then(res => res.json())
//     .then(product => {
//       showInfoCart(product);
//     })
//     .catch(err => console.error("Lỗi tải sản phẩm cart:", err));
//   })
// }
let totalCartAmount = 0; // Biến toàn cục để lưu tổng tiền

function renderCart() {
  if (!isLoggedIn()) return;

  const container = document.getElementById("cart");
  container.innerHTML = "";

  // Reset tổng tiền
  totalCartAmount = 0;

  const nameTextEl = document.getElementById("text-name");
  if (nameTextEl) {
    nameTextEl.innerHTML = "";  // Xóa danh sách tên cũ trước khi hiển thị mới
  }

  const username = getCurrentUser().userName;
  const cartKey = `cart_${username}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    const totalEl = document.getElementById("total-amount");
    if (totalEl) {
      totalEl.textContent = "Tổng: 0₫";
    }
    return;
  }

  // Duyệt qua từng sản phẩm trong cart
  const fetchPromises = cart.map(productId => {
    return fetch(`http://localhost:8080/api/product/${productId}`)
      .then(res => res.json())
      .then(product => {
        // Mặc định số lượng là 1
        const quantity = 1;
        totalCartAmount += Number(product.price) * quantity;
        showInfoCart(product); 
      });
  });

  // Sau khi tất cả fetch xong thì cập nhật tổng tiền
  Promise.all(fetchPromises)
    .then(() => {
      const totalEl = document.getElementById("total-amount");
      const totalbill = document.getElementById("total-bill");

      if (totalEl && totalbill) {
        totalEl.textContent = "Tổng: " + formatCurrency(totalCartAmount);
        totalbill.textContent = "Tổng tiền: " + formatCurrency(totalCartAmount);

      }
    })
    .catch(err => console.error("Lỗi tải sản phẩm trong cart:", err));
}


window.addEventListener("DOMContentLoaded", function() {
  if (isLoggedIn()) {
    renderCart();
  }
});
//Payment
function checkoutCart() {
  if (!isLoggedIn()) {
    alert("Bạn cần đăng nhập.");
    return;
  }
  const username = getCurrentUser().userName;
  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống.");
    return;
  }
  const payOverlap = document.getElementById("payment-overlap");
  const  loginform = payOverlap.querySelector(".login-form");

  if(payOverlap.classList.contains("hidden")) {
      payOverlap.classList.remove("hidden");
      loginform.classList.add("active");
  } else {
      payOverlap.classList.add("hidden");
      loginform.classList.remove("active");
  }
}

async function confirmPayment() {
  console.log("Current user:", getCurrentUser());
  console.log("Hàm confirmPayment đã được gọi");
       // Lấy các trường input và select
  const province = document.getElementById("province").value;
  const district = document.getElementById("district").value;
  const ward = document.getElementById("ward").value;
  const addressDetail = document.getElementById("address-detail").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Kiểm tra từng trường
  if (!province) {
    alert("Vui lòng chọn Tỉnh/Thành phố.");
    return;
  }
  if (!district) {
    alert("Vui lòng chọn Quận/Huyện.");
    return;
  }
  if (!ward) {
    alert("Vui lòng chọn Phường/Xã.");
    return;
  }
  if (!addressDetail) {
    alert("Vui lòng nhập địa chỉ cụ thể.");
    return;
  }
  if (!phone) {
    alert("Vui lòng nhập số điện thoại.");
    return;
  }
  const currentUser = getCurrentUser();

if (!currentUser || !currentUser.userName) {
  alert("User chưa đăng nhập hoặc không có username");
  return;
}

  const username = getCurrentUser().userName;
  const cartKey = `cart_${username}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  console.log("cartKey đang sử dụng:", cartKey);
  console.log("Giỏ hàng hiện tại:", cart);
  try {
    // Gọi API backend lấy user info theo username
    const userResponse = await fetch(`http://localhost:8080/api/user/${username}`);
    if (!userResponse.ok) {
      alert("Không tìm thấy thông tin người dùng.");
      return;
    }
    const userData = await userResponse.json();
    const userId = userData.id; // Lấy idUser từ response

    // Gửi từng sản phẩm POST về backend
    
    const sendPromises = cart.map(item => {
      console.log("Đang gửi sản phẩm:", item);
      return fetch(`http://localhost:8080/api/bill/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: userId,
          idProduct: item.idProduct,
          billTotal: item.quantity * item.price
        }),
      });
    });

    const responses = await Promise.all(sendPromises);
    if (responses.every(r => r.ok)) {
      alert("Đơn hàng đã được đặt thành công!");
      localStorage.removeItem(cartKey);
      renderCart(); 
    } else {
      alert("Có lỗi xảy ra khi gửi đơn hàng.");
    }
  } catch (error) {
    console.error("Lỗi gửi đơn hàng:", error);
    alert("Không thể gửi đơn hàng, vui lòng thử lại.");
  }
}