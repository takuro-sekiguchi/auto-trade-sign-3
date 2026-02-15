// AI Trade - 共通ロジック

// ダミーデータ
const appData = {
    // 現在のサイン
    currentSign: {
        type: 'BUY',
        price: 6850000,
        reason: 'RSI反発 + 好材料',
        sentiment: 'ポジティブ',
        fundamental: '半減期まで83日'
    },

    // 運用サマリー
    portfolio: {
        totalAssets: 12345678,
        profit: 1632456,
        profitRate: 15.2,
        isRunning: true,
        riskLevel: 'balance' // stable, balance, aggressive
    },

    // 取引履歴
    history: [
        { date: '2026/01/28 10:23', type: '買い', price: 6850000, amount: 0.1, reason: 'RSI反発 + 好材料', profit: null },
        { date: '2026/01/25 15:45', type: '利確', price: 7120000, amount: 0.1, reason: '目標価格到達', profit: 27000 },
        { date: '2026/01/22 09:12', type: '買い', price: 6780000, amount: 0.15, reason: 'サポートライン反発', profit: null },
        { date: '2026/01/18 14:30', type: '損切り', price: 6650000, amount: 0.08, reason: 'ストップロス発動', profit: -12000 },
        { date: '2026/01/15 11:00', type: '買い', price: 6720000, amount: 0.08, reason: 'センチメント好転', profit: null }
    ],

    // レポート
    report: {
        period: '2026年1月',
        totalProfit: 523456,
        winRate: 68,
        tradeCount: 23,
        monthlyData: [
            { month: '9月', profit: 180000 },
            { month: '10月', profit: 250000 },
            { month: '11月', profit: -50000 },
            { month: '12月', profit: 320000 },
            { month: '1月', profit: 523456 }
        ]
    },

    // 設定
    settings: {
        exchange: 'bitflyer',
        apiKey: '',
        apiSecret: '',
        notifications: {
            sign: true,
            trade: true,
            weekly: true
        }
    }
};

// 数値フォーマット
function formatNumber(num) {
    return new Intl.NumberFormat('ja-JP').format(num);
}

// 通貨フォーマット
function formatCurrency(num) {
    return '¥' + formatNumber(num);
}

// パーセント表示
function formatPercent(num) {
    const sign = num >= 0 ? '+' : '';
    return sign + num.toFixed(1) + '%';
}

// 損益の色クラス
function getProfitClass(profit) {
    if (profit > 0) return 'text-green-400';
    if (profit < 0) return 'text-red-400';
    return 'text-gray-400';
}

// サインタイプの色クラス
function getSignClass(type) {
    switch (type) {
        case 'BUY': return 'bg-green-500';
        case 'SELL': return 'bg-red-500';
        case 'HOLD': return 'bg-yellow-500';
        case 'EXIT': return 'bg-blue-500';
        default: return 'bg-gray-500';
    }
}
