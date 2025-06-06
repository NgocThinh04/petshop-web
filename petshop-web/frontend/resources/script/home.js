function clickbtn() {
    const loginOverlap = document.getElementById("login-overlap");
    const user = JSON.parse(localStorage.getItem("userInfo"));
  
    if (loginOverlap.classList.contains("hidden")) {
      loginOverlap.classList.remove("hidden");
  
      if (user) {
        showUserInfo(user);
      } else {
        showLoginForm();
      }
    } else {
      loginOverlap.classList.add("hidden");
      document.getElementById("loginform").classList.remove("active");
      document.getElementById("creatform").classList.remove("active");
    }
  }
function showCreatForm() {
    const loginForm = document.getElementById("loginform");
    const createForm = document.getElementById("creatform");

    loginForm.classList.add("hidden");
    loginForm.classList.remove("active");

    createForm.classList.remove("hidden");
    createForm.classList.add("active");

    document.getElementById("name").disabled = false;
    document.getElementById("username").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("confirmpassword").disabled = false;
  
    document.getElementById("textCreat").textContent = "Đăng ký tài khoản";
}
function showLoginForm() {
    const loginForm = document.getElementById("loginform");
    const createForm = document.getElementById("creatform");

    loginForm.classList.remove("hidden");
    loginForm.classList.add("active");

    createForm.classList.add("hidden");
    createForm.classList.remove("active");
}
async function showUserInfo(user) {
    if(!user || !user.userName) return;

    try {
        const response = await fetch(`http://localhost:8080/api/user/${user.userName}`);
        if (!response.ok) throw new Error("Không tìm thấy người dùng");
        const infoUser = await response.json();
        console.log(infoUser);

            // Đổ dữ liệu user
    document.getElementById("name").value = infoUser.name || "";
    document.getElementById("username").value = infoUser.userName || "";
    document.getElementById("email").value = infoUser.email || "";
    document.getElementById("password").value = infoUser.pw || "";
    document.getElementById("confirmpassword").value = infoUser.dateCreat || "";
    } catch (error) {
        console.error("Lỗi",error);
        return;
    }
    document.getElementById("loginform").classList.add("hidden");
    document.getElementById("creatform").classList.remove("hidden");
    document.getElementById("creatform").classList.add("active");
    document.getElementById("login-overlap").classList.remove("hidden");
  
  
    //Vô hiệu hoá input
    document.getElementById("name").disabled = true;
    document.getElementById("username").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("confirmpassword").disabled = true;
    //Ẩn button, input
    document.getElementById("buttonCreat").style.display = "none";
    document.getElementById("buttonLogin").style.display = "none";
    document.getElementById("sendOtpBtn").style.display = "none";
    document.getElementById("otp").style.display = "none";
    //
    document.getElementById("textCreat").textContent = "Chi tiết tài khoản";
    // Thêm nút đăng xuất 
    const loginContent = document.querySelector("#creatform .login-content");
    if (!document.getElementById("logoutBtn")) {
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Đăng xuất";
      logoutBtn.id = "logoutBtn";
      logoutBtn.className = "register-btn";
      logoutBtn.onclick = logout;
      loginContent.appendChild(logoutBtn);
    }
  }
  function logout() {
    // Xóa dữ liệu người dùng trong localStorage
    localStorage.removeItem("userInfo");
    showMessage("Đăng xuất thành công", "green");
  
    // Reset lại form
    document.getElementById("name").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmpassword").value = "";

    // Đổi lại nút thành "Đăng nhập"
    document.getElementById("loginBtnText").textContent = "Đăng nhập";
  
    // Gỡ nút logout nếu có
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.remove();
  
    // Xóa dữ liệu trong form đăng nhập
    document.getElementById("usernamelogin").value = "";
    document.getElementById("pwlogin").value = "";
  
    // Ẩn form đăng ký nếu đang hiển thị
    document.getElementById("creatform").classList.add("hidden");
    document.getElementById("creatform").classList.remove("active");
  
    //Hiển thị lại button, input
    document.getElementById("buttonCreat").style.display = "block";
    document.getElementById("buttonLogin").style.display = "block";
    document.getElementById("sendOtpBtn").style.display = "block";
    document.getElementById("otp").style.display = "block";
    
    location.reload();
    // Hiển thị lại form đăng nhập
    showLoginForm();
  }
  window.onload = function () {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    document.getElementById("loginBtnText").textContent = "Tài khoản";
  } else {
    document.getElementById("loginBtnText").textContent = "Đăng nhập";
  }
};
// Wishlist
function openWishlist() {
    const wishlistOverlap = document.getElementById("wishlist-overlap");
    const loginForm = wishlistOverlap.querySelector(".login-form");

    if (wishlistOverlap.classList.contains("hidden")) {
        wishlistOverlap.classList.remove("hidden");
        loginForm.classList.add("active");
    } else {
        wishlistOverlap.classList.add("hidden");
        loginForm.classList.remove("active");
    }
}
//Cart
function opencart() {
    const cartOverlap = document.getElementById("cart-overlap");
    const  loginform = cartOverlap.querySelector(".login-form");

    if(cartOverlap.classList.contains("hidden")) {
        cartOverlap.classList.remove("hidden");
        loginform.classList.add("active");
    } else {
        cartOverlap.classList.add("hidden");
        loginform.classList.remove("active");
    }
}