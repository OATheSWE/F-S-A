/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { IconImports } from "../../assets";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";
import { db, getTheToken } from "../../firebase-config";
import { useAuth } from "../../AuthContext";
import { monthNames } from "../../Data/data";


const Report: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();
    const [recordedDates, setRecordedDates] = useState<string[]>([]);
    const [today, setToday] = useState(currentDate.getDate());
    const auth = useAuth();
    const [isToken, setTokenFound] = useState(false);


    useEffect(() => {
        let data;


        async function tokenFunc() {
            data = await getTheToken(setTokenFound)
            if (data) {
               
                const userTokenDoc = doc(db, auth.currentUser?.uid, "UserToken");
                const userTokensSnapshot = await getDoc(userTokenDoc);

                if (!userTokensSnapshot.exists()) {
                    await setDoc(userTokenDoc, {
                        notificationToken: data,
                    })
                }
            }
            return data;
        }

        tokenFunc();

    }, [setTokenFound])

    useEffect(() => {
        const getTokenAndSubscribe = async () => {
            try {
                const currentPermission = await Notification.requestPermission();
                if (currentPermission === 'granted') {
                    console.log("Notification permission granted.");
                } else {
                    console.error('Permission denied for notifications.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getTokenAndSubscribe();
    }, []);


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
                    const reportDays = Object.keys(reportData).flatMap((month) =>
                        Object.keys(reportData[month])
                    );
                    setRecordedDates(reportDays);
                }
            } catch (error) {
                console.error("Error fetching recorded dates:", error);
            }
        };

        fetchRecordedDates();
    }, [currentDate]);

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

    // Function to get recorded dates from calendar & compare with dates in firebase
    const hasRecordedReport = (day: number, month: number, year: number) => {
        const currentMonth = monthNames[month]; // Get the month name from the month number
        const dateString = `${currentMonth} ${day} ${year}`;
        return recordedDates.includes(dateString);
    };

    // Check for if a report has been recorded for a particular day already.
    const linkTo = async (day: number, month: number, year: number) => {
        const reportExists = await hasRecordedReport(day, month, year);
        if (reportExists) {
            const confirmDelete = window.confirm(
                "A report has already been recorded for this day. Do you want to proceed and overwrite it?"
            );
            if (!confirmDelete) {
                return;
            }
        }

        const queryParams = new URLSearchParams();
        const Day = day.toString();
        const Month = month.toString();
        queryParams.append("day", Day);
        queryParams.append("month", Month); // Add the month parameter

        const queryString = queryParams.toString();

        setTimeout(() => {
            navigate(`/record-report/?${queryString}`, { replace: true });
        }, 1000);
    };

    // Function to render the calendar
    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const today = new Date(); // Get the current date

        const days = [];

        // Fill empty days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

        // Render days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const isCurrentDay =
                i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayClass = isCurrentDay
                ? "calendar-day current-day rounded"
                : "calendar-day bg-dark rounded";
            const isPastDay = new Date(year, month, i) > today;
            const dayStyle = hasRecordedReport(i, month, year)
                ? { borderBottom: "2px solid #fff" }
                : {};

            days.push(
                <div
                    className={isPastDay ? "calendar-day bg-dark rounded" : dayClass}
                    key={i}
                    onClick={() => {
                        if (!isPastDay) {
                            linkTo(i, month, year);
                        } else {
                            alert("Recording of future reports is not allowed!.");
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

    return (
        <div className="report text-white">
            <div className="calendar">
                <div className="calendar-header d-flex rounded">
                    <div
                        onClick={handlePrevMonth}
                        className="preview-icon rounded-circle"
                    >
                        <IconImports.FaAngleLeft className="icon-profile" />
                    </div>
                    <span>
                        {currentDate.toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                    <div
                        onClick={handleNextMonth}
                        className="preview-icon rounded-circle"
                    >
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
