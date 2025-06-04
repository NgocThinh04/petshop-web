document.addEventListener('DOMContentLoaded', function () {
           const danhmucselect = document.getElementById("Danhmuc");
           const tatcaSelects = document.querySelectorAll('.select-loai');
           
        danhmucselect.addEventListener('change', function() {
                 const value = this.value;

                 tatcaSelects.forEach(select => {
                 if (select.dataset.type === value) {
                  select.style.display = 'inline-block';
                   } else {
                      select.style.display = 'none';
                   }
                 });
        });
});