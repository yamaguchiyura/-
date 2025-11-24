/* --- アイコンスライダー --- */
document.addEventListener('DOMContentLoaded', function () {
    // ★ CSSのクラス名 (.icon-slider-wrapper) に修正
    const iconSlider = document.querySelector('.icon-slider-wrapper'); 

    // スライダーが見つからない場合はエラーを表示して終了
    if (!iconSlider) {
        // console.error('スライダーの要素 (.icon-slider-wrapper) が見つかりません。');
        return; 
    }

    const iconContainer = iconSlider.querySelector('.icon-container');
    const iconSets = iconSlider.querySelectorAll('.icon-set');
    const leftArrow = iconSlider.querySelector('.left-arrow');
    const rightArrow = iconSlider.querySelector('.right-arrow');

    // 必要な要素が揃っていない場合も終了
    if (!iconContainer || !leftArrow || !rightArrow || iconSets.length === 0) {
        // console.error('スライダーの内部要素（container, arrows, sets）が見つかりません。');
        return;
    }

    let currentIndex = 0;
    const totalSets = iconSets.length; // ( totalSets は 2 になるはず)

    function updateSlider() {
        // ★ 1ページあたり -50% 動かす (2ページなので 0% と -50%)
        const offset = currentIndex * -50; 
        iconContainer.style.transform = 'translateX(' + offset + '%)';
    }

    // 右矢印のクリックイベント
    rightArrow.addEventListener('click', () => {
        if (currentIndex < totalSets - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // 最後のページで最初に戻る
        }
        updateSlider();
    });

    // 左矢印のクリックイベント
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSets - 1; // 最初のページで最後に戻る
        }
        updateSlider();
    });
});


/* --- カレンダー (jQuery と FullCalendar v3 を使用) --- */
// (★ 重複していた v4 用のコードは削除しました)
$(document).ready(function () {
    // FullCalendarの初期化
    var calendar = $('#calendar').fullCalendar({
        locale: 'ja',  // 日本語化
        header: {
            left: '',           // 左のスペースを空ける
            center: 'title',    // タイトルを中央に配置
            right: ''           // 月変更ボタンは非表示
        },
        events: getEventsForStore('store1')  // ★ 初期表示としてstore1のイベントを読み込む
    });

    // 前の月に移動
    $('#prevMonth').on('click', function () {
        $('#calendar').fullCalendar('prev');
    });

    // 次の月に移動
    $('#nextMonth').on('click', function () {
        $('#calendar').fullCalendar('next');
    });

    // 店舗選択用のドロップダウンメニューでイベントを変更
    $('#storeSelect').on('change', function () {
        var selectedStore = $(this).val();  // 選択された店舗の値を取得
        var eventsForStore = getEventsForStore(selectedStore);  // 店舗に対応するイベントを取得

        // FullCalendarのイベントを更新
        calendar.fullCalendar('removeEvents');  // 既存のイベントを削除
        calendar.fullCalendar('addEventSource', eventsForStore);  // 新しい店舗のイベントを追加
    });

    // 店舗ごとのイベントを取得する関数
    function getEventsForStore(store) {
        var events = [];

        // 店舗1のイベント
        if (store === 'store1') {
            events = [
                {
                    title: '３８０円均一★イベント（あれもこれも店内商品全て380円！）',
                    start: '2025-01-19',
                    color: '#116166' // 店舗1のイメージカラー
                },
            ];
        }
        // 店舗2のイベント
        else if (store === 'store2') {
            events = [
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-03',
                    color: '#BB5921' // 店舗2のイメージカラー
                },
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-31',
                    color: '#BB5921'
                }
            ];
        }
        // 店舗3のイベント
        else if (store === 'store3') {
            events = [
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-03',
                    color: '#AB1214' // 店舗3のイメージカラー（青）
                },
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-31',
                    color: '#AB1214'
                },
                {
                    title: '店休日',
                    start: '2025-01-14',
                    color: '#AB1214'
                }
                ,
                {
                    title: '店休日',
                    start: '2025-01-15',
                    color: '#AB1214'
                },
                {
                    title: '店休日',
                    start: '2025-01-19',
                    color: '#AB1214'
                },
                {
                    title: '店休日',
                    start: '2025-01-26',
                    color: '#AB1214'
                }
            ];
        }
        // 店舗4のイベント
        else if (store === 'store4') {
            events = [
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-02',
                    color: '#1E1E1E' // 店舗4のイメージカラー
                },
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-31',
                    color: '#1E1E1E'
                }
            ];
        }
        // 店舗5のイベント
        else if (store === 'store5') {
            events = [
                {
                    title: '店休日',
                    start: '2025-01-06',
                    color: '#FFC14D' // 店舗2のイメージカラー
                },
                {
                    title: '店休日',
                    start: '2025-01-13',
                    color: '#FFC14D'
                },
                {
                    title: '店休日',
                    start: '2025-01-20',
                    color: '#FFC14D'
                },
                {
                    title: '店休日',
                    start: '2025-01-27',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-07',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-08',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-09',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-10',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-11',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-12',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-14',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-15',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-16',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-17',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-18',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-19',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-21',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-22',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-23',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-28',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-29',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-30',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-24',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-25',
                    color: '#FFC14D'
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-26',
                    color: '#FFC14D'
                },
                {
                    title: 'ハピエン★飲み放題990円（60分）※小学生以下０円無料！',
                    start: '2025-01-31',
                    color: '#FFC14D'
                }
            ];
        }
        // 店舗6のイベント
        else if (store === 'store6') {
            events = [
                {
                    title: '店休日',
                    start: '2025-01-19',
                    color: '#2789A1' // 店舗6のイメージカラー
                }
            ];
        }
        // 店舗7のイベント
        else if (store === 'store7') {
            events = [
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-07',
                    color: '#116166' // 店舗7のイメージカラー
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-14',
                    color: '#116166' // 店舗7のイメージカラー
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-27',
                    color: '#116166' // 店舗7のイメージカラー
                },
                {
                    title: '感謝還元★１００円ドリンク祭',
                    start: '2025-01-30',
                    color: '#116166' // 店舗7のイメージカラー
                }
            ];
        }
        // 店舗8のイベント
        else if (store === 'store8') {
            events = [
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-02',
                    color: '#7D2257' // 店舗6のイメージカラー
                },
                {
                    title: '今日も！明日も！全日１００円ドリンク祭（大感謝大還元！毎日開催中！）',
                    start: '2025-01-31',
                    color: '#7D2257' // 店舗6のイメージカラー
                }
            ];
        }
        // 他の店舗の場合も同様に追加していく
        return events;
    }
});