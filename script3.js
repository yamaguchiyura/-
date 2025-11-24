document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('eventModal');
    var modalTitle = document.getElementById('modalTitle');
    var modalDate = document.getElementById('modalDate');
    var modalDescription = document.getElementById('modalDescription');
    var closeModal = document.querySelector('.close');
    var storeFilter = document.getElementById('storeFilter');

    var eventsData = {
        shop1: [
            { title: '（祝！節分の日）感謝還元★１００円ドリンク祭', start: '2025-02-02', backgroundColor: '#1E686D', extendedProps: { description: '100円ドリンク祭イベント！' } },
            { title: '３８０円均一★イベント', start: '2025-02-16', backgroundColor: '#1E686D', extendedProps: { description: '全て380円均一！' } }
        ],
        shop2: [
            { title: '全日１００円ドリンク祭', start: '2025-02-01', backgroundColor: '#BB5921', extendedProps: { description: '毎日開催中！' } },
            { title: '全日１００円ドリンク祭', start: '2025-02-28', backgroundColor: '#BB5921', extendedProps: { description: '毎日開催中！' } }
        ],
        shop3: [
            { title: 'ホルモン鍋 金ちゃんイベント', start: '2025-02-10', backgroundColor: '#5733ff', extendedProps: { description: 'ホルモン鍋 金ちゃんのイベント！' } }
        ]
    };

    function createCalendar(shopId) {
        var calendarEl = document.getElementById(`calendar-${shopId}`);
        if (!calendarEl) {
            console.warn(`カレンダー要素が見つかりません: calendar-${shopId}`);
            return null;
        }

        return new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'ja',
            events: eventsData[shopId] || [],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            eventClick: function (info) {
                modalTitle.textContent = info.event.title;
                modalDate.textContent = '日付: ' + (info.event.startStr || '日付未定');
                modalDescription.textContent = info.event.extendedProps.description || '詳細情報はありません。';
                modal.style.display = 'flex';
            }
        });
    }

    var calendars = {};
    Object.keys(eventsData).forEach(shopId => {
        console.log(`現在のshopId: ${shopId}`);

        var calendarEl = document.getElementById(`calendar-${shopId}`);
        if (!calendarEl) {
            console.warn(`カレンダーの要素が見つかりません: calendar-${shopId}`);
            return;
        }

        calendars[shopId] = createCalendar(shopId);
        if (calendars[shopId]) {
            calendars[shopId].render();
            calendarEl.style.display = (shopId === "shop1") ? 'block' : 'none';
        }
    });

    storeFilter.addEventListener('change', function () {
        var selectedShop = storeFilter.value;
        document.querySelectorAll('.calendar').forEach(el => el.style.display = 'none');

        var selectedCalendar = document.getElementById(`calendar-${selectedShop}`);
        if (selectedCalendar) {
            selectedCalendar.style.display = 'block';
        } else {
            console.warn(`選択された店舗のカレンダーが見つかりません: calendar-${selectedShop}`);
        }
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
