document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("province");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");
  
    // Load tỉnh/thành
    fetch("https://provinces.open-api.vn/api/p/")
      .then(res => res.json())
      .then(provinces => {
        provinces.forEach(province => {
          const option = document.createElement("option");
          option.value = province.code;
          option.textContent = province.name;
          provinceSelect.appendChild(option);
        });
      });
  
    // Khi chọn tỉnh => load huyện
    provinceSelect.addEventListener("change", () => {
      const provinceCode = provinceSelect.value;
      districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
      districtSelect.disabled = true;
      wardSelect.disabled = true;
  
      if (provinceCode) {
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
          .then(res => res.json())
          .then(data => {
            data.districts.forEach(district => {
              const option = document.createElement("option");
              option.value = district.code;
              option.textContent = district.name;
              districtSelect.appendChild(option);
            });
            districtSelect.disabled = false;
          });
      }
    });
  
    // Khi chọn huyện => load xã
    districtSelect.addEventListener("change", () => {
      const districtCode = districtSelect.value;
      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
      wardSelect.disabled = true;
  
      if (districtCode) {
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
          .then(res => res.json())
          .then(data => {
            data.wards.forEach(ward => {
              const option = document.createElement("option");
              option.value = ward.code;
              option.textContent = ward.name;
              wardSelect.appendChild(option);
            });
            wardSelect.disabled = false;
          });
      }
    });
  });
  
  function submitOrder() {
    const province = document.getElementById("province").selectedOptions[0]?.textContent;
    const district = document.getElementById("district").selectedOptions[0]?.textContent;
    const ward = document.getElementById("ward").selectedOptions[0]?.textContent;
    const addressDetail = document.getElementById("address-detail").value;
    const phone = document.getElementById("phone").value;
  
    if (!province || !district || !ward || !addressDetail || !phone) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    const fullAddress = `${addressDetail}, ${ward}, ${district}, ${province}`;
    console.log("Thông tin đặt hàng:");
    console.log("Địa chỉ:", fullAddress);
    console.log("SĐT:", phone);
  
    alert("Đặt hàng thành công!");
  }
  