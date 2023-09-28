/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { buttons, labels } from '../../Data/data';
import { PrimaryLabel, Button, Toast } from '../../components';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from "../../AuthContext";


const CurrentMonth: React.FC = () => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalPlacements, setTotalPlacements] = useState(0);
  const [totalReturnVisits, setTotalReturnVisits] = useState(0);
  const [totalBibleStudies, setTotalBibleStudies] = useState(0);
  const [overseer, setOverseer] = useState("");
  const auth = useAuth();
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);
  const [toast, showToast] = useState(false)


  const displayToast = () => {
    showToast(true);
  }

  // Function to add a new alert message
  const addAlert = (message: string) => {
    const newAlert = {
      id: Date.now(), // Unique identifier 
      message: message,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Function to remove an alert by its ID
  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

 




  useEffect(() => {
    // Fetch data from Firestore for the current month and year
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();
        const reportDocRef = doc(db, auth.currentUser?.uid, "Reports");

        const userInfoDoc = doc(db, auth.currentUser?.uid, "UserInfo");
        const userInfoSnapshot = await getDoc(userInfoDoc);

        if (userInfoSnapshot.exists()) {
          const recordedData = userInfoSnapshot.data();
          setOverseer(recordedData.overseerPhoneNumber);
        }


        const reportDocumentSnapshot = await getDoc(reportDocRef);

        if (reportDocumentSnapshot.exists()) {
          const recordedData = reportDocumentSnapshot.data();

          // Find the current month-year object
          const currentMonthYear = recordedData[`${currentMonth} ${currentYear}`];

          if (currentMonthYear) {

            // Calculate totals from the recordedData and update state
            let totalHours = 0;
            let totalVideos = 0;
            let totalPlacements = 0;
            let totalReturnVisits = 0;
            let totalBibleStudies = 0;

            // Initialize sets to keep track of unique students
            const uniqueBibleStudies = new Set<string>();

            // Loop through the objects in the recordedData and add up the values
            Object.values(currentMonthYear).forEach((record: any) => {
              totalHours += record.hours || 0;
              totalVideos += record.videos || 0;
              totalPlacements += record.placements || 0;
              // totalReturnVisits += record.students.length || 0;

              // Count each student as one for Total Bible Studies
              if (Array.isArray(record.students)) {
                record.students.forEach((student: string) => {
                  uniqueBibleStudies.add(student);
                });
              }

              // Count each student for Total Return Visits
              if (record.students && Array.isArray(record.students)) {
                totalReturnVisits += record.students.length;
              }
            });


            // Calculate Total Bible Studies by adding the number of unique students
            totalBibleStudies = uniqueBibleStudies.size;

            setTotalHours(totalHours);
            setTotalVideos(totalVideos);
            setTotalPlacements(totalPlacements);
            setTotalReturnVisits(totalReturnVisits);
            setTotalBibleStudies(totalBibleStudies);

            // Total Object
            const totalObject = {
              tHours: totalHours,
              tVideos: totalVideos,
              tPlacements: totalPlacements,
              tReturnVisits: totalReturnVisits,
              tBibleStudies: totalReturnVisits,
            };

            // Update the 'total' field in the document
            await setDoc(reportDocRef, { Total: totalObject }, { merge: true })
              .then(() => {
                console.log('Total object created successfully!');
              })
              .catch((error: any) => {
                console.error('Error creating total object:', error);
              });

          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        displayToast();
        addAlert('Cannot Fetch Feild Service Data!');
      }
    };

    fetchData();
  }, []);




  // Function to handle the "Submit" button click
  const handleWhatsAppSubmit = (e: any) => {
    e.preventDefault();

    const currentDate = new Date();
    const curentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const phoneNumber = overseer; // Phone Number of service overseer

    // Check if all inputs are equal to zero or if at least one input is greater than zero
    const hasNonZeroInput = totalHours > 0 || totalVideos > 0 || totalPlacements > 0 || totalReturnVisits > 0 || totalBibleStudies > 0;

    // Create the WhatsApp message with the necessary details
    let message;
    if (hasNonZeroInput) {
      message = `My Field Service Report For The Month Of ${curentMonth} - ${totalHours} Hours, ${totalVideos} Videos, ${totalPlacements} Placements, ${totalReturnVisits} Return Visits, ${totalBibleStudies} Bible Studies`;
    } else {
      message = `I Participated In The Feild Service For The Month Of ${curentMonth}.`;
    }

    // Construct the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/+234${phoneNumber}?text=${encodedMessage}`;

    // Add a delay of 200ms before opening WhatsApp
    setTimeout(() => {
      // Open WhatsApp in a new window with the pre-filled message
      window.open(whatsappURL, '_blank');
    }, 400);
  };


  return (
    <div className="whole-container">
      <div className="popup text-white rounded submit-report">
        <form onSubmit={handleWhatsAppSubmit}>
          <h2>Submit Report</h2>
          <PrimaryLabel text={labels.thours} inputType='number' readOnly={true} value={totalHours} />
          <PrimaryLabel text={labels.tvideos} inputType='number' readOnly={true} value={totalVideos} />
          <PrimaryLabel text={labels.tplacements} inputType='number' readOnly={true} value={totalPlacements} />
          <PrimaryLabel text={labels.treturnv} inputType='number' readOnly={true} value={totalReturnVisits} />
          <PrimaryLabel text={labels.tbstudy} inputType='number' readOnly={true} value={totalBibleStudies} />
          <Button text={buttons.submit} />
        </form>
         {/* Render alert messages */}
         {alerts.map((alert) => (
          <Toast
            show={toast}
            key={alert.id}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div >
    </div>
  )
}

export default CurrentMonth;
