document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const feedback = document.getElementById('feedback').value;

    // 顯示 loading 畫面
    Swal.fire({
        title: '提交中...',
        text: '請稍候...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('https://script.google.com/macros/s/AKfycbzQ9JEk0CWeVNPxmh52Ed9bKhHEEYA_bB16be9vaeP8JuGt1LLqa1ah5h5U-pLzlpM2/exec', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `feedback=${encodeURIComponent(feedback)}`
    }).then(response => response.json())
    .then(data => {
        Swal.close(); // 關閉 loading 畫面
        console.log('Success:', data);
        if (data.result === 'success') {
            Swal.fire({
                title: '送出成功',
                text: '感謝您的反饋！',
                icon: 'success'
            });
            document.getElementById('feedback').value = '';
        } else {
            Swal.fire({
                title: '送出成功',
                text: '感謝您的反饋！',
                icon: 'success'
            });
        }
    }).catch((error) => {
        console.error('Error:', error);
        Swal.close(); // 關閉 loading 畫面
        Swal.fire({
            title: '送出成功',
            text: '感謝您的反饋！',
            icon: 'success'
        });
    });
});
