const inputs = document.querySelectorAll('.input-group input');

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('active');
        }
    });

    // 頁面載入時若已填值（例如瀏覽器自動填入），也加入 active
    if (input.value !== '') {
        input.parentElement.classList.add('active');
    }
});
