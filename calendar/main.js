document.addEventListener("DOMContentLoaded", function () {
    var calendarDiv = document.getElementById("calendar");

    var calendar = new FullCalendar.Calendar(calendarDiv, {
        initialView: "dayGridMonth",
        headerToolbar: {
            left: "customAddEvent today",
            center: "title",
            right: "prev,next"
        },
        customButtons: {
            customAddEvent: {
                text: "+",
                click: function () {
                    selectDateAndAddEvent();
                }
            }
        },
        events: loadEvents(),
        dateClick: function (info) {
            addEvent(info.dateStr);
        },
        eventClick: function (info) {
            manageEvent(info);
        }
    });

    calendar.render();

    // 儲存到 localStorage
    function saveEvents() {
        var events = calendar.getEvents().map(function (event) {
            return {
                title: event.title,
                start: event.start.toISOString(),
                allDay: event.allDay
            };
        });
        localStorage.setItem("calendarEvents", JSON.stringify(events));
    }

    // 載入時讀取事件，顯示在行事曆
    function loadEvents() {
        var saved = localStorage.getItem("calendarEvents");
        if (saved) {
            return JSON.parse(saved).map(function (event) {
                return {
                    title: event.title,
                    start: new Date(event.start),
                    allDay: event.allDay
                };
            });
        }
        return [];
    }

    //  點擊 + 時選擇日期 
    async function selectDateAndAddEvent() {
        const result = await Swal.fire({
            title: "選擇日期",
            input: "date",
            inputLabel: "請選擇新增待辦事項的日期",
            showCancelButton: true,
            confirmButtonText: "下一步",
            cancelButtonText: "取消",
            inputValidator: (value) => value ? null : "請選擇日期！"
        });

        if (result.isConfirmed) {
            addEvent(result.value);
        }
    }

    // 新增事件 
    async function addEvent(dateStr) {
        const result = await Swal.fire({
            title: "新增待辦事項",
            input: "text",
            inputLabel: "事項內容",
            inputPlaceholder: "請輸入待辦事項",
            showCancelButton: true,
            confirmButtonText: "儲存",
            cancelButtonText: "取消",
            inputValidator: (value) => value.trim() ? null : "請輸入待辦事項!"
        });

        if (result.isConfirmed) {
            var newEvent = {
                title: result.value,
                start: dateStr,
                allDay: true
            };

            // 即時更新到行事曆
            calendar.addEvent(newEvent);
            saveEvents();

            Swal.fire({
                icon: "success",
                title: "新增成功！",
                timer: 1500,
                showConfirmButton: false
            });
        }
    }

    // 編輯或刪除事件 
    async function manageEvent(info) {
        const result = await Swal.fire({
            title: info.event.title,
            html: `<p>日期：${info.event.start.toLocaleDateString()}</p>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "編輯",
            denyButtonText: "刪除",
            cancelButtonText: "關閉"
        });

        if (result.isConfirmed) {
            editEvent(info);
        }
        if (result.isDenied) {
            deleteEvent(info);
        }
    }

    // 編輯事件 
    async function editEvent(info) {
        const result = await Swal.fire({
            title: "編輯待辦事項",
            input: "text",
            inputValue: info.event.title,
            showCancelButton: true,
            confirmButtonText: "儲存",
            cancelButtonText: "取消",
            inputValidator: (value) => value.trim() ? null : "請輸入待辦事項!"
        });

        if (result.isConfirmed) {
            info.event.setProp("title", result.value);
            saveEvents();
            Swal.fire({ icon: "success", title: "修改成功！", timer: 1500, showConfirmButton: false });
        }
    }

    // 刪除事件
    async function deleteEvent(info) {
        const result = await Swal.fire({
            title: "確定要刪除嗎？",
            text: "刪除後將無法復原！",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "確定刪除",
            cancelButtonText: "取消"
        });

        if (result.isConfirmed) {
            info.event.remove();
            saveEvents();
            Swal.fire({ icon: "success", title: "刪除成功！", timer: 1500, showConfirmButton: false });
        }
    }
});
