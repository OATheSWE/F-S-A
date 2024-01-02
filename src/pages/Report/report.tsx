/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { IconImports } from "../../assets";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";
import { db, getTheToken } from "../../firebase-config";
import { useAuth } from "../../AuthContext";
import { monthNames } from "../../Data/data";
import { DialogBox, Toast } from "../../components";

const Report: React.FC = () => {
    // State variables
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();
    const [recordedDates, setRecordedDates] = useState<string[]>([]);
    const [today, setToday] = useState(currentDate.getDate());
    const auth = useAuth();
    const [isToken, setTokenFound] = useState(false);
    const [showConfirmationToast, setShowConfirmationToast] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    // Function to hide the delete confirmation toast
    const hideDeleteConfirmation = () => {
        setShowConfirmationToast(false);
    };

    // Function to show the delete confirmation toast
    const showDeleteConfirmation = () => {
        setShowConfirmationToast(true);
    };

    // useEffect to fetch the user's notification token
    useEffect(() => {
        let data;

        async function tokenFunc() {
            data = await getTheToken(setTokenFound);
            if (data) {
                const userTokenDoc = doc(db, auth.currentUser?.uid, "UserToken");
                const userTokensSnapshot = await getDoc(userTokenDoc);

                if (!userTokensSnapshot.exists()) {
                    await setDoc(userTokenDoc, {
                        notificationToken: data,
                    });
                }
            }
            return data;
        }

        tokenFunc();
    }, [setTokenFound]);

    // useEffect to request notification permission
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

    // useEffect to set today's date
    useEffect(() => {
        setToday(today);
    }, [today]);

    // useEffect to fetch recorded dates from Firestore
    useEffect(() => {
        const fetchRecordedDates = async () => {
            try {
                const reportDocRef = doc(db, auth.currentUser?.uid, "Reports");
                const reportDocSnapshot = await getDoc(reportDocRef);

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

    // Function to switch to the previous month
    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const prevMonth = prevDate.getMonth() - 1;
            const prevYear = prevDate.getFullYear();
            return new Date(prevYear, prevMonth, 1);
        });
    };

    // Function to switch to the next month
    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonth = prevDate.getMonth() + 1;
            const nextYear = prevDate.getFullYear();
            return new Date(nextYear, nextMonth, 1);
        });
    };

    // Function to check if a report has been recorded for a specific day
    const hasRecordedReport = (day: number, month: number, year: number) => {
        const currentMonth = monthNames[month];
        const dateString = `${currentMonth} ${day} ${year}`;
        return recordedDates.includes(dateString);
    };

    // Function to navigate to the report recording page
    const linkTo = async (day: number, month: number, year: number) => {
        const reportExists = await hasRecordedReport(day, month, year);
        if (reportExists) {
            setSelectedDay(day);
            setSelectedMonth(month);
            setSelectedYear(year);
            showDeleteConfirmation();
            return;
        }

        const queryParams = new URLSearchParams();
        const Day = day.toString();
        const Month = month.toString();
        queryParams.append("day", Day);
        queryParams.append("month", Month);

        const queryString = queryParams.toString();

        setTimeout(() => {
            navigate(`/record-report/?${queryString}`, { replace: true });
        }, 1000);
    };

    // Function to render the calendar days
    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const today = new Date();

        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
        }

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
        <>
            {/* Render the calendar component */}
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

            {/* Render the ConfirmationToast component */}
            {showConfirmationToast && (
                <DialogBox
                    show={showConfirmationToast}
                    onConfirm={() => {
                        hideDeleteConfirmation();
                        if (selectedDay !== null && selectedMonth !== null && selectedYear !== null) {
                            // Use the selected day, month, and year here
                            const queryParams = new URLSearchParams();
                            const Day = selectedDay.toString();
                            const Month = selectedMonth.toString();
                            queryParams.append("day", Day);
                            queryParams.append("month", Month);
                            const queryString = queryParams.toString();
                            setTimeout(() => {
                                navigate(`/record-report/?${queryString}`, { replace: true });
                            }, 500);
                        }
                    }}
                    onClose={() => {
                        hideDeleteConfirmation();
                        setSelectedDay(null);
                        setSelectedMonth(null);
                        setSelectedYear(null);
                    }}
                    message={`A report has already been recorded for the selected day. Do you want to proceed and overwrite it?`}
                />
            )}
        </>
    );
};

export default Report;
