// fetch("http://localhost:8080/api/home")
//   .then((Response) => Response.json())
//   .then((data) => {
//     const home = document.getElementById("product");
//     const list = document.getElementById("producthome");
//     data.forEach((product) => {
//       const clone = home.cloneNode(true);
//       clone.style.display = "flex";
//       clone.removeAttribute("id");

//       clone.querySelector(".name").textContent = product.name;
//       clone.querySelector(".brand").textContent = product.brand;
//       clone.querySelector(".price").textContent = product.price;

//       list.appendChild(clone);
//     })
//   })
//   .catch((error) => {
//     console.error("Loi", error);
//   });

function sendOtp() {
  const email = document.getElementById("email").value;
  const btn = document.getElementById("sendOtpBtn");

  fetch("http://localhost:8080/api/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email })
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      btn.disabled = true;
      let countdown = 60;
      const interval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
          clearInterval(interval);
          btn.disabled = false;
        }
      }, 1000);
    })
    .catch(err => console.error("Loi", err));
}

function OtpButton() {
  const email = document.getElementById("email").value.trim();
  const otpBtn = document.getElementById("sendOtpBtn");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    otpBtn.disabled = false;
    otpBtn.style.opacity = "1";
    otpBtn.style.cursor = "pointer";
  } else {
    otpBtn.disabled = true;
    otpBtn.style.opacity = "0.5";
    otpBtn.style.cursor = "not-allowed";
  }
}
function confirm(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;
  const otp = document.getElementById("otp").value.trim();

  if (!name || !username || !email || !password || !confirmPassword || !otp) {
    showMessage("Vui lòng nhập đầy đủ thông tin", "red");
    return;
  } else if (password !== confirmPassword) {
    showMessage("Mật khẩu nhập lại không khớp!", "red");
    return;
  } else {
    fetch("http://localhost:8080/api/otp/rest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, code: otp })
    })
      .then(res => {
        return res.text().then(text => {
          if (res.ok) {
            showMessage(text, "green");
          } else {
            showMessage(text, "red");
            return;
          }
        })
      })
      .catch(err => showMessage(err.message, "red"));
  }
  fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: username, name: name, pw: password, email: email })
  })
    .then((res => res.text()))
    .then(() => {
      document.getElementById("name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";
      document.getElementById("otp").value = "";
    })
    .catch(err => showMessage(err.message, "red"))
}

function loginbtn(event) {
  event.preventDefault();
  const username = document.getElementById("usernamelogin").value.trim();
  const pwlogin = document.getElementById("pwlogin").value.trim();
  if (!username) {
    showMessage("Vui lòng nhập tên đăng nhập", "red")
    return;
  } else if (!pwlogin) {
    showMessage("Vui lòng nhập mật khẩu", "red")
  }
  else {
    fetch("http://localhost:8080/api/home/login",
      {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: username,
          pw: pwlogin
        })
      }
    )
      .then(res => res.json().then(data => {
        if (res.ok) {
          showMessage("Đăng nhập thành công", "green");
          localStorage.setItem("userInfo", JSON.stringify(data));
          document.getElementById("loginBtnText").textContent = "Tài khoản";
        } else {
          showMessage(data.message || "Đăng nhập thất bại", "red");
        }
      }))
      .catch(error => {
        console.error(error.message);
      });
  }
}

function showMessage(message, color) {
  const msgDiv = document.getElementById("message");
  msgDiv.textContent = message;
  msgDiv.style.color = color;
}