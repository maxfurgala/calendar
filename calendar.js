let weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

let prevMonthButton = document.getElementById('prev-month');

let nextMonthButton = document.getElementById('next-month');

let calendarGrid = document.getElementById('calendar-grid');

let currentDateText = document.getElementById('currentDateText');

let customDate = new Date();

let selectedDate;

let COUNT_DAYS_WEEK = 7;

Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

function calendarDayCreate(date, currentMonth) {
    let elementDay = document.createElement('div');
    elementDay.className = 'dayGrid';
    elementDay.date = new Date(date);
    elementDay.innerText = date.getDate();
    if(date.toDateString() === new Date().toDateString())
    {
        elementDay.isCurrentDay = true;
        elementDay.className += ' currentDay'
    }
    if(!currentMonth) {
        elementDay.className += ' dayAnotherMonth';
        elementDay.setAttribute('dayAnotherMonth', 'dayAnotherMonth');
    }

    if(date.toDateString() === selectedDate?.toDateString()) {
        elementDay.setAttribute('selected', 'selected');
    }

    return elementDay;
}

function initGridCalendar(date){
    let daysArray = [];
    let countDays = date.daysInMonth();
    let firstDayInMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let lastDayInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    let restrictionMin = firstDayInMonth === 0 ? COUNT_DAYS_WEEK : firstDayInMonth;
    let restrictionMax = lastDayInMonth === 0 ? COUNT_DAYS_WEEK : (COUNT_DAYS_WEEK - lastDayInMonth) + COUNT_DAYS_WEEK;

    for (let i = 0; i < restrictionMin - 1; i++) {
        daysArray.unshift(calendarDayCreate(new Date(date.getFullYear(), date.getMonth(), - i), false));
    }

    //array for middle days (current month)
    for (let i = 0; i < countDays;) {
        daysArray.push(calendarDayCreate(new Date(date.getFullYear(), date.getMonth(), ++i), true));
    }

    for (let i = 0; i < restrictionMax;) {
        daysArray.push(calendarDayCreate(new Date(date.getFullYear(), date.getMonth() + 1 , ++i), false));
    }

    calendarGrid.innerHTML = '';

    daysArray.forEach((item) => {
        item.addEventListener('click', () => {
            currentDateText.innerText = item.date.toLocaleDateString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.querySelector('div[selected]')?.removeAttribute('selected');
            if(item.getAttribute('selected') === null) {
                item.setAttribute('selected', 'selected');
                selectedDate = item.date;
            }
        });
        calendarGrid.append(item);
    });
}

nextMonthButton.addEventListener('click', () => {
    customDate.setMonth(customDate.getMonth() + 1);
    initGridCalendar(customDate);
});

prevMonthButton.addEventListener('click', () => {
    customDate.setMonth(customDate.getMonth() - 1);
    initGridCalendar(customDate);
});

currentDateText.innerText = new Date().toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

weekDays.forEach((item) => {
    let element = document.createElement('span');
    element.innerText = item;
    document.getElementById('week').append(element);
});

initGridCalendar(new Date());