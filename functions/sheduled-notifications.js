import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { useAuth } from "../src/AuthContext";


admin.initializeApp();



// Function to send a scheduled notification
export const sendScheduledNotification = functions.pubsub
  .schedule('every 2 weeks')
  .timeZone('Africa/Lagos')
  .onRun(async (context) => {
    try {
      // Retrieve the user token from the database
      const userToken = await getUserTokenFromDatabase();

      // Define the notification message
      const message = {
        notification: {
          title: 'Scheduled Notification',
          body: 'This is your scheduled notification message.',
        },
      };

      // Send the notification to the user 
      if (userToken) {
        await admin.messaging().sendToDevice(userToken, message);
        console.log('Scheduled notification sent successfully.');
      } else {
        console.log('User token not found.');
      }

      return null;
    } catch (error) {
      console.error('Error sending scheduled notifications:', error);
      return null;
    }
  });

// Function to retrieve the user token from Firestore (replace with your logic)
async function getUserTokenFromDatabase() {
  try {
    // Get a reference to the Firestore database
    const db = admin.firestore();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const auth = useAuth();

    // Replace with the path to the user's document in Firestore
    const userTokenDocRef = db.doc(`users/${auth.currentUser?.uid}/UserToken`);

    // Get the user token document
    const userTokenSnapshot = await userTokenDocRef.get();

    if (userTokenSnapshot.exists) {
      const userData = userTokenSnapshot.data();
      return userData.notificationToken;
    } else {
      console.log('User token document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user token from Firestore:', error);
    return null;
  }
}
