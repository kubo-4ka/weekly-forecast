const locations = {
    "北海道 - 札幌市": { lat: 43.064310, lon: 141.346879 },
    "青森県 - 青森市": { lat: 40.824589, lon: 140.740548 },
    "岩手県 - 盛岡市": { lat: 39.703526, lon: 141.152696 },
    "宮城県 - 仙台市": { lat: 38.268579, lon: 140.872072 },
    "秋田県 - 秋田市": { lat: 39.718626, lon: 140.102381 },
    "山形県 - 山形市": { lat: 38.240434, lon: 140.363690 },
    "福島県 - 福島市": { lat: 37.750029, lon: 140.467771 },
    "茨城県 - 水戸市": { lat: 36.341737, lon: 140.446824 },
    "栃木県 - 宇都宮市": { lat: 36.565912, lon: 139.883592 },
    "群馬県 - 前橋市": { lat: 36.390688, lon: 139.060453 },
    "埼玉県 - さいたま市": { lat: 35.857033, lon: 139.649012 },
    "千葉県 - 千葉市": { lat: 35.604560, lon: 140.123154 },
    "東京都 - 新宿区": { lat: 35.689501, lon: 139.691722 },
    "神奈川県 - 横浜市": { lat: 35.447734, lon: 139.642537 },
    "新潟県 - 新潟市": { lat: 37.902451, lon: 139.023245 },
    "富山県 - 富山市": { lat: 36.695265, lon: 137.211305 },
    "石川県 - 金沢市": { lat: 36.594606, lon: 136.625669 },
    "福井県 - 福井市": { lat: 36.065209, lon: 136.221720 },
    "山梨県 - 甲府市": { lat: 35.664108, lon: 138.568455 },
    "長野県 - 長野市": { lat: 36.651306, lon: 138.180904 },
    "岐阜県 - 岐阜市": { lat: 35.391228, lon: 136.722311 },
    "静岡県 - 静岡市": { lat: 34.976944, lon: 138.383056 },
    "愛知県 - 名古屋市": { lat: 35.180209, lon: 136.906582 },
    "三重県 - 津市": { lat: 34.730282, lon: 136.508611 },
    "滋賀県 - 大津市": { lat: 35.004528, lon: 135.868607 },
    "京都府 - 京都市": { lat: 35.021242, lon: 135.755613 },
    "大阪府 - 大阪市": { lat: 34.686316, lon: 135.519711 },
    "兵庫県 - 神戸市": { lat: 34.691304, lon: 135.183070 },
    "奈良県 - 奈良市": { lat: 34.685326, lon: 135.832751 },
    "和歌山県 - 和歌山市": { lat: 34.226041, lon: 135.167504 },
    "鳥取県 - 鳥取市": { lat: 35.503867, lon: 134.237716 },
    "島根県 - 松江市": { lat: 35.472324, lon: 133.050523 },
    "岡山県 - 岡山市": { lat: 34.661759, lon: 133.934399 },
    "広島県 - 広島市": { lat: 34.396560, lon: 132.459622 },
    "山口県 - 山口市": { lat: 34.186123, lon: 131.470497 },
    "徳島県 - 徳島市": { lat: 34.065756, lon: 134.559297 },
    "香川県 - 高松市": { lat: 34.340045, lon: 134.043369 },
    "愛媛県 - 松山市": { lat: 33.841624, lon: 132.765681 },
    "高知県 - 高知市": { lat: 33.559814, lon: 133.531151 },
    "福岡県 - 福岡市": { lat: 33.606785, lon: 130.418314 },
    "佐賀県 - 佐賀市": { lat: 33.249367, lon: 130.298822 },
    "長崎県 - 長崎市": { lat: 32.744814, lon: 129.873691 },
    "熊本県 - 熊本市": { lat: 32.789816, lon: 130.741690 },
    "大分県 - 大分市": { lat: 33.238205, lon: 131.612591 },
    "宮崎県 - 宮崎市": { lat: 31.911058, lon: 131.423883 },
    "鹿児島県 - 鹿児島市": { lat: 31.560171, lon: 130.558025 },
    "沖縄県 - 那覇市": { lat: 26.212445, lon: 127.680922 }
};

const select = document.getElementById('location-select');
const button = document.getElementById('fetch-button');
const container = document.getElementById('weather-container');

// プルダウン初期化
Object.keys(locations).forEach(loc => {
    const option = document.createElement('option');
    option.value = loc;
    option.textContent = loc;
    select.appendChild(option);
});
select.value = "東京都 - 新宿区";

// ボタンで予報取得
button.addEventListener('click', () => {
    // ボタン無効化
    button.disabled = true;
    button.classList.add('disabled');

    fetchWeather();

    // 3秒後にボタンを再び有効化
    setTimeout(() => {
        button.disabled = false;
        button.classList.remove('disabled');
    }, 3000);
});


function fetchWeather() {
    const selected = locations[select.value];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selected.lat}&longitude=${selected.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = '';
            const days = data.daily.time;
            const minTemps = data.daily.temperature_2m_min;
            const maxTemps = data.daily.temperature_2m_max;
            const weatherCodes = data.daily.weathercode;

            for (let i = 0; i < 7; i++) {
                const dayElem = document.createElement('div');
                dayElem.className = 'weather-day-row';

                const date = new Date(days[i]);
                const monthDay = `${date.getMonth() + 1}/${date.getDate()}`;
                const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
                const description = weatherDescription(weatherCodes[i]);
                const emoji = getWeatherEmoji(weatherCodes[i]);
                const min = minTemps[i].toFixed(1);
                const max = maxTemps[i].toFixed(1);

                // 各列要素を作成して追加
                const cols = [
                    monthDay,
                    weekday,
                    description,
                    emoji,
                    `${min}°C`,
                    '/',
                    `${max}°C`
                ];

                cols.forEach(content => {
                    const col = document.createElement('div');
                    col.className = 'weather-col';
                    col.textContent = content;
                    dayElem.appendChild(col);
                });

                container.appendChild(dayElem);
            }
        });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
}

function weatherDescription(code) {
    const map = {
        0: '快晴',
        1: 'ほぼ晴れ',
        2: '薄曇り',
        3: '曇り',
        45: '霧',
        48: '霧（霧氷）',

        51: '弱い霧雨',
        53: '中程度の霧雨',
        55: '強い霧雨',
        56: '弱い凍結霧雨',
        57: '強い凍結霧雨',

        61: '弱い雨',
        63: '中程度の雨',
        65: '強い雨',
        66: '弱い凍結雨',
        67: '強い凍結雨',

        71: '弱い雪',
        73: '中程度の雪',
        75: '強い雪',
        77: '雪あられ',

        80: '弱いにわか雨',
        81: '中程度のにわか雨',
        82: '激しいにわか雨',

        85: '弱いにわか雪',
        86: '強いにわか雪',

        95: '雷雨',
        96: '雷雨（弱い雹）',
        99: '雷雨（強い雹）'
    };

    return map[code] || `コード${code}：不明`;
}

function getWeatherEmoji(code) {
    if (code === 0) return '☀️';           // 快晴
    if (code === 1) return '🌤️';          // ほぼ晴れ
    if (code === 2) return '⛅';           // 薄曇り
    if (code === 3) return '☁️';           // 曇り

    if (code === 45 || code === 48) return '🌫️'; // 霧

    if (code === 51 || code === 53 || code === 55) return '🌦️'; // 霧雨
    if (code === 56 || code === 57) return '🌧️❄️';              // 凍結霧雨

    if (code === 61 || code === 63) return '🌧️';      // 弱〜中程度の雨
    if (code === 65) return '🌧️🌧️';                  // 強い雨
    if (code === 66 || code === 67) return '🌧️❄️';    // 凍結雨

    if (code === 71 || code === 73) return '🌨️';      // 弱〜中程度の雪
    if (code === 75) return '❄️❄️';                  // 強い雪
    if (code === 77) return '🌨️⛄';                   // 雪あられ

    if (code === 80) return '🚿';           // 弱いにわか雨
    if (code === 81) return '🌧️🚿';         // 中程度のにわか雨
    if (code === 82) return '🌧️🌧️🚿';       // 激しいにわか雨

    if (code === 85) return '🌨️🚿';         // 弱いにわか雪
    if (code === 86) return '🌨️❄️❄️';       // 強いにわか雪

    if (code === 95) return '⛈️';           // 雷雨
    if (code === 96) return '⛈️🧊';         // 雷雨（弱い雹）
    if (code === 99) return '⛈️🧊🧊';       // 雷雨（強い雹）

    return '❔'; // 未定義コードのフォールバック
}

function formatDateFull(dateStr) {
    const date = new Date(dateStr);
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    return `${date.getMonth() + 1}/${date.getDate()}　${weekdays[date.getDay()]}`;
}
