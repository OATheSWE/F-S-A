/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IconImports } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from "../../AuthContext";

const Report: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();
    const [recordedDates, setRecordedDates] = useState<string[]>([]);
    const [today, setToday] = useState(currentDate.getDate());
    const auth = useAuth();


    useEffect(() => {
        setToday(today);
    }, [today]);



    //Fetching data from firestore to use in this page
    useEffect(() => {

        // Function to fetch the object names from Firestore
        const fetchRecordedDates = async () => {
            try {
                // Get the doucment collection & names needed
                const reportDocRef = doc(db, auth.currentUser?.uid, "Reports");
                const reportDocSnapshot = await getDoc(reportDocRef);

                // To get the dates of recorded reports
                if (reportDocSnapshot.exists()) {
                    const reportData = reportDocSnapshot.data();
                    const reportDays = Object.keys(reportData).flatMap(month => Object.keys(reportData[month]));
                    setRecordedDates(reportDays);
                }

            } catch (error) {
                console.error('Error fetching recorded dates:', error);
            }
        };

        fetchRecordedDates();
    }, [currentDate]);



    // Function to check if a day has a recorded report
    const hasRecordedReport = (day: number, year: number) => {
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const dateString = `${currentMonth} ${day} ${year}`;
        return recordedDates.includes(dateString);

    };


    // Button to switch to the previous month
    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const prevMonth = prevDate.getMonth() - 1;
            const prevYear = prevDate.getFullYear();
            return new Date(prevYear, prevMonth, 1);
        });
    };

    // Button to switch to the next month
    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonth = prevDate.getMonth() + 1;
            const nextYear = prevDate.getFullYear();
            return new Date(nextYear, nextMonth, 1);
        });
    };


    // Function to render the calendar
    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const today = currentDate.getDate();

        const days = [];

        // Fill empty days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

        // Render days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const isCurrentDay = i === today;
            const dayClass = isCurrentDay ? "calendar-day current-day rounded" : "calendar-day bg-dark rounded";
            const isPastDay = i > today;
            const dayStyle = hasRecordedReport(i, year) ? { borderBottom: '2px solid #fff' } : {};
            const isCurrentMonth = i === year && month;
            days.push(
                <div
                    className={isPastDay ? "calendar-day bg-dark rounded" : dayClass}
                    key={i}
                    onClick={() => {
                        if (isPastDay && isCurrentMonth) {
                            linkTo(i, year);
                        } else {
                            window.alert("A report cannot be recorded outside of the current month.");
                        }
                    }}
                    style={dayStyle}
                >
                    {i}
                </div>
            );
        }

        return days;
    };


    // Check for if a report has been recorded for a particular day already.
    const linkTo = async (day: number, year: number) => {
        const currentDate = new Date(); // Get the current date
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Check if the selected day and year are in the current month
        if (year !== currentYear || currentDate.getMonth() !== currentMonth) {
            alert("Reports can only be recorded in the current month.");
            return;
        }

        const reportExists = await hasRecordedReport(day, year);
        if (reportExists) {
            const confirmDelete = window.confirm('A report has already been recorded for this day. Do you want to proceed and overwrite it?');
            if (!confirmDelete) {
                return;
            }
        }

        setTimeout(() => {
            navigate(`/record-report/?day=${day}`, { replace: true });
        }, 1000);
    };


    return (

        <div className="report text-white">
            <div className="calendar">
                <div className="calendar-header d-flex rounded">
                    <div onClick={handlePrevMonth} className="preview-icon rounded-circle">
                        <IconImports.FaAngleLeft className="icon-profile" />
                    </div>
                    <span>{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                    <div onClick={handleNextMonth} className="preview-icon rounded-circle">
                        <IconImports.FaAngleRight className="icon-profile" />
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
        </div>

    );
};

export default Report;
