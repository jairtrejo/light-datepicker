import '../styles/datepicker.css';
import { Calendar } from './calendar';
import { isSame, prevMonth, nextMonth } from './date';
import { createNode } from './util';

const LANGUAGE = window.navigator.language;
const WEEKDAYS = 'sun_mon_tue_wed_thu_fri_sat'.split('_');

const doc = window.document;

export class DatePicker {

    constructor(options) {
        this.options = {
            currentDate: new Date(),
            language: 'en-Us',
            selector: null,
            updateInput: true,
            weekdays: WEEKDAYS,
            appendTo: 'body'
        };
        this.options = { ...this.options, ...options };
        this.options.currentMonth = Object.assign(this.options.currentDate);

        this.setupParentElement();
        this.updateInputValue();
        this.setupCalendar();
        this.setupDatePicker();
        this.draw();
        this.hide();
    }

    setupParentElement() {
        this.parentElement = doc.querySelector(this.options.selector);
        this.parentElement.addEventListener('focus', event => this.show());
    }

    setupCalendar() {
        let options = this.options;
        this.calendar = new Calendar(options.weekdays);
        this.calendar.addDecorator(date => !isSame(date, options.currentMonth, 'year month'), 'out-month');
        this.calendar.addDecorator(date => isSame(date, options.currentMonth, 'year month'), 'enabled');
        this.calendar.addDecorator(date => isSame(date, options.currentDate), 'selected');
        this.calendar.on('click', date => this.selectDate(date));
    }

    setupDatePicker() {
        let template = `<div class="arrow"></div>
                        <div class="header">
                            <span class="prev">&#8592;</span>
                            <span class="title"></span>
                            <span class="next">&#8594;</span>
                        </div>`
        this.datepicker = createNode('div', 'datepicker', template);
        this.datepicker.style.display = 'none';
        this.datepicker.appendChild(this.calendar.container);
        this.datepicker.querySelector('.prev').addEventListener('click', event => this.onClickPrevMonth());
        this.datepicker.querySelector('.next').addEventListener('click', event => this.onClickNextMonth());

        doc.querySelector(this.options.appendTo).appendChild(this.datepicker);
        doc.addEventListener('click', event => {
            let target = event.target;
            let isOutsideClick = this.isOpened &&
                                !this.parentElement.isEqualNode(target) &&
                                !this.datepicker.isEqualNode(target) &&
                                !this.datepicker.contains(target);
            if (isOutsideClick) {
                this.hide();
            }
        }, true);
    }

    show() {
        let parentOffset = this.parentElement.getBoundingClientRect();
        this.isOpened = true;
        this.datepicker.style.cssText = `display: block; top: ${(parentOffset.top + 55)}px; left: ${parentOffset.left}px;`;
        this.calendar.applyDecorators();
    }

    hide(delay=0) {
        setTimeout(() => {
            this.isOpened = false;
            this.datepicker.style.display = 'none';
        }, delay);
    }

    selectDate(date) {
        let options = this.options;
        if (isSame(date, options.currentMonth, 'year month')) {
            options.currentDate = date;
            this.updateInputValue();
            this.calendar.applyDecorators();
        }
    }

    updateInputValue() {
        let options = this.options;
        if (!options.updateInput) {
            return;
        }
        let date = options
                   .currentDate
                   .toLocaleDateString(options.language, {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'numeric'
                    });
        this.parentElement.value = date;
    }

    onClickPrevMonth() {
        let options = this.options;
        options.currentMonth = prevMonth(options.currentMonth);
        this.draw();
    }

    onClickNextMonth() {
        let options = this.options;
        options.currentMonth = nextMonth(options.currentMonth);
        this.draw();
    }

    updateTitle() {
        let options = this.options;
        let title = options
                        .currentMonth
                        .toLocaleDateString(options.language, {
                            month : 'long',
                            year : 'numeric'
                        });
        this.datepicker.querySelector('.title').innerText = title;
    }

    draw() {
        this.updateTitle();
        this.calendar.draw(this.options.currentMonth);
    }
};
