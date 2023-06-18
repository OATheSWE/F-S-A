import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from '../../assets/IconImports';
import PopupRecorder from './Record Report/Popup Recorder';
import Footer from '../../components/Footer/Footer';

const Report: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);

    const handleReportRecorder = () => {
        setShowPopup(!showPopup);
    };

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const prevMonth = prevDate.getMonth() - 1;
            const prevYear = prevDate.getFullYear();
            return new Date(prevYear, prevMonth, 1);
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonth = prevDate.getMonth() + 1;
            const nextYear = prevDate.getFullYear();
            return new Date(nextYear, nextMonth, 1);
        });
    };

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const days = [];

        // Fill empty days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

        // Render days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const isCurrentDay = i === currentDate.getDate();
            const dayClass = isCurrentDay ? "calendar-day current-day rounded" : "calendar-day bg-dark rounded";
            days.push(
                <div className={dayClass} key={i}>
                    {i}
                </div>
            );

        }

        return days;
    };


    return (
        <div className="report text-white">
            <div className="calendar">
                <div className="calendar-header d-flex rounded">
                    <div onClick={handlePrevMonth} className="preview-icon rounded-circle">
                        <FaAngleLeft className="icon-profile" />
                    </div>
                    <span>{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                    <div onClick={handleNextMonth} className="preview-icon rounded-circle">
                        <FaAngleRight className="icon-profile" />
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="calendar-days">{renderCalendarDays()}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Report;
