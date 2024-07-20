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
const apiKey = '2518d57e9cf75f6675ec15fa34dfb1cc';
const city = 'Tamsui';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`;

function fetchWeather() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const icon = data.weather[0].icon;

            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('description').textContent = description;
            document.getElementById('humidity').textContent = `濕度: ${humidity}%`;
            document.getElementById('wind-speed').textContent = `風速: ${windSpeed} m/s`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').textContent = '無法獲取天氣數據';
        });
}

fetchWeather();
// 每小時更新一次天氣數據
setInterval(fetchWeather, 3600000);

document.addEventListener('DOMContentLoaded', (event) => {
    const notice = document.getElementById('emergency-notice');
    const closeButton = document.getElementById('close-notice');
    
    // 點擊關閉按鈕關閉通知
    closeButton.addEventListener('click', () => {
      notice.style.display = 'none';
    });
  
    // 點擊通知外的區域關閉通知
    document.addEventListener('click', (event) => {
      if (!notice.contains(event.target)) {
        notice.style.display = 'none';
      }
    });
  
    // 雙擊通知關閉
    notice.addEventListener('dblclick', () => {
      notice.style.display = 'none';
    });
  });


   //颱風

 function fetchTyphoonImages() {
    const typhoonNews = document.getElementById('typhoon-news');
    const typhoonSatellite = document.getElementById('typhoon-satellite');
    const lastUpdated = document.getElementById('last-updated');
    
    const timestamp = new Date().getTime();
    
    typhoonNews.src = `https://www.cwa.gov.tw/Data/typhoon/TY_NEWS/PTA_202407200600-120_zhtw.png?t=${timestamp}`;
    typhoonSatellite.src = `https://www.cwa.gov.tw/Data/satellite/TWI_IR1_CR_800/TWI_IR1_CR_800.jpg?t=${timestamp}`;
    
    const now = new Date();
    lastUpdated.textContent = `最後更新: ${now.toLocaleString('zh-TW')}`;
    
    typhoonNews.onerror = function() {
        console.error('Error loading typhoon news image');
        typhoonNews.alt = '無法載入颱風消息圖片';
    };
    typhoonSatellite.onerror = function() {
        console.error('Error loading satellite image');
        typhoonSatellite.alt = '無法載入衛星雲圖';
    };
}

function setupImageSwitching() {
    const newsContainer = document.getElementById('typhoon-news-container');
    const satelliteContainer = document.getElementById('typhoon-satellite-container');
    const showNewsButton = document.getElementById('show-news');
    const showSatelliteButton = document.getElementById('show-satellite');

    showNewsButton.addEventListener('click', () => {
        newsContainer.classList.add('active');
        satelliteContainer.classList.remove('active');
        showNewsButton.classList.add('active');
        showSatelliteButton.classList.remove('active');
    });

    showSatelliteButton.addEventListener('click', () => {
        satelliteContainer.classList.add('active');
        newsContainer.classList.remove('active');
        showSatelliteButton.classList.add('active');
        showNewsButton.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchTyphoonImages();
    setupImageSwitching();
    
    setInterval(fetchWeather, 3600000);
    
    setInterval(fetchTyphoonImages, 1800000);
});

// 此產品製作by靈魂鯊
