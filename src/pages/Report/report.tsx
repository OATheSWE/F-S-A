/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IconImports } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Report: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();
    const [recordedDates, setRecordedDates] = useState<string[]>([]);
    const [today, setToday] = useState(currentDate.getDate());
    const [userReportData, setUserReportData] = useState<any | null>(null);
    const [messageSent, setMessageSent] = useState(false);
    const [executeWhatsApp, setExecuteWhatsApp] = useState(false);

    useEffect(() => {
        setToday(today);
    }, [today]);

    // Check whether the message to send last months report has already appeared before
    useEffect(() => {
        // Check if the message has been sent before
        const messageSentBefore = localStorage.getItem('messageSent');
        if (messageSentBefore) {
            setMessageSent(true);
        }
    }, []);

    useEffect(() => {
        // Check if it's the first day of the month
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        if (currentDay === 1) {
            // Clear the 'messageSent' from local storage
            localStorage.removeItem('messageSent');
            // Update the state to reflect the change
            setMessageSent(false);
            setExecuteWhatsApp(false);
        }

    }, []);


    // Function to get the previous month
    const getPreviousMonth = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const previousMonthDate = new Date();
        previousMonthDate.setMonth(currentMonth - 1);

        return previousMonthDate;
    };

    useEffect(() => {

        // Function to fetch the object names from Firestore
        const fetchRecordedDates = async () => {
            try {
                // Get the previous & current month's name and year
                const previousMonthDate = getPreviousMonth();
                const previousMonthName = previousMonthDate.toLocaleString('default', { month: 'long' });
                const previousMonthYear = previousMonthDate.getFullYear();
                const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
                const currentYear = currentDate.getFullYear();

                // Get the doucment collection & names needed
                const reportDocumentRef = doc(db, 'Reports', `${currentMonth} ${currentYear}`);
                const reportDocumentSnapshot = await getDoc(reportDocumentRef);
                const reportDocumentRef2 = doc(db, 'Reports', `${previousMonthName} ${previousMonthYear}`);
                const reportDocumentSnapshot2 = await getDoc(reportDocumentRef2);

                // To get the dates of recorded reports
                if (reportDocumentSnapshot.exists()) {
                    const recordedDatesData = reportDocumentSnapshot.data();
                    const dates = Object.keys(recordedDatesData); // Get the object keys as dates
                    setRecordedDates(dates);
                }

                if (reportDocumentSnapshot2.exists()) {
                    const reportData = reportDocumentSnapshot2.data();
                    // Access the 'total' object inside the 'reportData'
                    const totalObject = reportData.Total;
                    setUserReportData(totalObject)
                } else {
                    console.log('empty')
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

    // Whatsapp logic to send previous months report
    const handleWhatsAppSubmit = () => {
        // Now you can access the individual fields inside the 'total' object
        const totalHours = userReportData.tHours;
        const totalVideos = userReportData.tVideos;
        const totalPlacements = userReportData.tPlacements;
        const totalReturnVisits = userReportData.tReturnVisits;
        const totalBibleStudies = userReportData.tBibleStudies;

        const previousMonthDate = getPreviousMonth();
        const previousMonthName = previousMonthDate.toLocaleString('default', { month: 'long' });

        const hasNonZeroInput = totalHours > 0 || totalVideos > 0 || totalPlacements > 0 || totalReturnVisits > 0 || totalBibleStudies > 0;



        if (userReportData || hasNonZeroInput) {
            // No report data for the previous month, send a different WhatsApp message
            const phoneNumber = '+2347066463731'; // Replace this with the actual phone number
            const message = `My Field Service Report For The Month Of ${previousMonthName} - ${totalHours} Hours, ${totalVideos} Videos, ${totalPlacements} Placements, ${totalReturnVisits} Return Visits, ${totalBibleStudies} Bible Studies`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new window with the pre-filled message
            window.open(whatsappURL, '_blank');

            // Mark the message as sent in local storage
            localStorage.setItem('messageSent', 'true');
            setMessageSent(true);
        } else {
            // Send WhatsApp message with report data
            const phoneNumber = '+2347066463731'; // Replace this with the actual phone number
            const message = `I Participated In The Feild Service For The Month Of ${previousMonthName}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new window with the pre-filled message
            window.open(whatsappURL, '_blank');

            // Mark the message as sent in local storage
            localStorage.setItem('messageSent', 'true');
            setMessageSent(true);
        }
    };

    useEffect(() => {
        // Execute the WhatsApp logic 3 seconds after the page loads if the message has not been sent before
        if (!messageSent && executeWhatsApp) {
            handleWhatsAppSubmit();
        }
    }, [messageSent, executeWhatsApp]);

    useEffect(() => {
        // Execute the WhatsApp logic 3 seconds after the page loads if the message has not been sent before
        if (!messageSent) {

            const timer = setTimeout(() => {
                const confirmed = window.confirm('Do you want to send last month\'s report via WhatsApp?');
                if (confirmed) {
                    setExecuteWhatsApp(true);
                }

            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messageSent]);



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

            days.push(
                <div
                    className={isPastDay ? "calendar-day bg-dark rounded" : dayClass}
                    key={i}
                    onClick={isPastDay ? undefined : () => linkTo(i, year)}
                    style={dayStyle}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    // Function to check if a report has already been recorded for the selected day
    const isReportRecorded = async (day: number, year: number) => {
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const dateString = `${currentMonth} ${day} ${year}`;
        const reportDocumentRef = doc(db, 'Reports', `${currentMonth} ${year}`);
        const reportDocumentSnapshot = await getDoc(reportDocumentRef);

        if (reportDocumentSnapshot.exists()) {
            const recordedDatesData = reportDocumentSnapshot.data();
            return recordedDatesData[dateString] !== undefined;
        }

        return false;
    };



    const linkTo = async (day: number, year: number) => {
        const reportExists = await isReportRecorded(day, year);
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
