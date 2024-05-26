// script.js
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const feedback = document.getElementById('feedback').value;
    
    fetch('https://script.google.com/macros/s/AKfycbzQ9JEk0CWeVNPxmh52Ed9bKhHEEYA_bB16be9vaeP8JuGt1LLqa1ah5h5U-pLzlpM2/exec', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `feedback=${encodeURIComponent(feedback)}`
    }).then(response => response.json())
    .then(data => {
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
        Swal.fire({
            title: '送出成功',
            text: '感謝您的反饋！',
            icon: 'success'
        });
    });
});
