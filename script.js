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

// 初始化圖表
function initCharts() {
    // 比特幣圖表
    const btcCtx = document.getElementById('btcChart').getContext('2d');
    new Chart(btcCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: 'BTC 價格',
                data: [40000, 42000, 41000, 43000, 44000, 45000],
                borderColor: '#f7931a',
                tension: 0.4
            }]
        },
        options: {
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
        }
    });

    // 以太幣圖表
    const ethCtx = document.getElementById('ethChart').getContext('2d');
    new Chart(ethCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: 'ETH 價格',
                data: [2800, 2900, 3000, 3100, 3150, 3200],
                borderColor: '#627eea',
                tension: 0.4
            }]
        },
        options: {
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
        }
    });

    // 幣安幣圖表
    const bnbCtx = document.getElementById('bnbChart').getContext('2d');
    new Chart(bnbCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: 'BNB 價格',
                data: [400, 410, 420, 415, 418, 420],
                borderColor: '#f3ba2f',
                tension: 0.4
            }]
        },
        options: {
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
        }
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

// 頁面加載完成後初始化圖表
document.addEventListener('DOMContentLoaded', initCharts);

// 導航欄活動狀態
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
}); 