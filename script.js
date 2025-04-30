// 搜索功能
function searchCrypto() {
    const searchInput = document.getElementById('crypto-search');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        // 這裡可以添加搜索邏輯
        alert('搜索功能即將推出！');
    } else {
        alert('請輸入搜索內容');
    }
}

// Initialize all cryptocurrency charts
function initCharts() {
    // Common chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    };

    // BTC Chart
    const btcCtx = document.getElementById('btcChart').getContext('2d');
    new Chart(btcCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [40000, 42000, 41000, 43000, 44000, 45000],
                borderColor: '#f7931a',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // ETH Chart
    const ethCtx = document.getElementById('ethChart').getContext('2d');
    new Chart(ethCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [2800, 2900, 3000, 3100, 3150, 3200],
                borderColor: '#627eea',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // BNB Chart
    const bnbCtx = document.getElementById('bnbChart').getContext('2d');
    new Chart(bnbCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [400, 410, 420, 415, 418, 420],
                borderColor: '#f3ba2f',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // XRP Chart
    const xrpCtx = document.getElementById('xrpChart').getContext('2d');
    new Chart(xrpCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [0.45, 0.48, 0.47, 0.50, 0.52, 0.55],
                borderColor: '#23292f',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // ADA Chart
    const adaCtx = document.getElementById('adaChart').getContext('2d');
    new Chart(adaCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [0.35, 0.38, 0.40, 0.42, 0.43, 0.45],
                borderColor: '#0033ad',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // SOL Chart
    const solCtx = document.getElementById('solChart').getContext('2d');
    new Chart(solCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                data: [85, 88, 90, 92, 94, 95],
                borderColor: '#00ffbd',
                tension: 0.4
            }]
        },
        options: chartOptions
    });

    // 市場概況圖表
    const marketCtx = document.getElementById('marketChart').getContext('2d');
    new Chart(marketCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '總市值',
                data: [1.8, 1.9, 2.0, 2.05, 2.08, 2.1],
                borderColor: '#3498db',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'T';
                        }
                    }
                }
            }
        }
    });

    // 投資組合圖表
    const portfolioCtx = document.getElementById('portfolioChart').getContext('2d');
    new Chart(portfolioCtx, {
        type: 'doughnut',
        data: {
            labels: ['比特幣', '以太幣', '幣安幣'],
            datasets: [{
                data: [22500, 16000, 8400],
                backgroundColor: ['#f7931a', '#627eea', '#f3ba2f']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Function to update cryptocurrency prices
function updatePrices() {
    fetch('prices.json')
        .then(response => response.json())
        .then(prices => {
            // Update BTC
            document.querySelector('.crypto-card:nth-child(1) .price').textContent = `$${prices.BTC.price.toLocaleString()}`;
            updateChangeIndicator(1, prices.BTC.change);

            // Update ETH
            document.querySelector('.crypto-card:nth-child(2) .price').textContent = `$${prices.ETH.price.toLocaleString()}`;
            updateChangeIndicator(2, prices.ETH.change);

            // Update BNB
            document.querySelector('.crypto-card:nth-child(3) .price').textContent = `$${prices.BNB.price.toLocaleString()}`;
            updateChangeIndicator(3, prices.BNB.change);

            // Update XRP
            document.querySelector('.crypto-card:nth-child(4) .price').textContent = `$${prices.XRP.price.toLocaleString()}`;
            updateChangeIndicator(4, prices.XRP.change);

            // Update ADA
            document.querySelector('.crypto-card:nth-child(5) .price').textContent = `$${prices.ADA.price.toLocaleString()}`;
            updateChangeIndicator(5, prices.ADA.change);

            // Update SOL
            document.querySelector('.crypto-card:nth-child(6) .price').textContent = `$${prices.SOL.price.toLocaleString()}`;
            updateChangeIndicator(6, prices.SOL.change);
        })
        .catch(error => console.error('Error updating prices:', error));
}

// Helper function to update change indicators
function updateChangeIndicator(cardIndex, change) {
    const changeElement = document.querySelector(`.crypto-card:nth-child(${cardIndex}) .change`);
    const isPositive = change >= 0;
    
    changeElement.className = `change ${isPositive ? 'positive' : 'negative'}`;
    changeElement.innerHTML = `<i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i> ${Math.abs(change).toFixed(2)}%`;
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    loadNews();
    updatePrices();
    
    // Set up intervals
    setInterval(loadNews, 3600000); // Update news every hour
    setInterval(updatePrices, 60000); // Update prices every minute
});

// 導航欄活動狀態
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// News handling functions
function loadNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(news => {
            const newsGrid = document.getElementById('newsGrid');
            newsGrid.innerHTML = '';
            
            news.forEach(article => {
                const newsCard = document.createElement('article');
                newsCard.className = 'news-card';
                
                // Format the date
                const date = new Date(article.date);
                const formattedDate = date.toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                newsCard.innerHTML = `
                    <div class="news-content">
                        <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                        <p class="news-date">${formattedDate}</p>
                        <p class="news-desc">${article.desc}</p>
                    </div>
                `;
                newsGrid.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Error loading news:', error));
} 