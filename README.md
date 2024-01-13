# Field Service Assistant

Field Service Assistant is a web application designed to help manage and streamline field service activities. Whether you're involved in community outreach, door-to-door preaching, or any field service work, this tool can assist you in tracking your activities, managing students or team members, and reporting your progress. This is a link to the 


## Features

- **Student Management:** Keep track of your students or team members, including their names, books of study, and contact information.

- **Activity Recording:** Record your daily activities, including the number of hours spent, videos shown, placements, return visits, and Bible studies.

- **Location Usage:** Utilize geolocation to keep track your  student location so you can revisit.

- **Monthly Reports:** Generate monthly reports summarizing your field service activities for each month.

- **User Authentication:** Securely sign in using Firebase Authentication to protect your data.

- **Automation of Sending Reports:** Get your monthly report calculated for you and onclick of a button sends it to your service overseer.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **Firebase Project:** Create a Firebase project and set up Firestore as your database. Refer to the Firebase documentation for detailed instructions.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/OATheSWE/F-S-A.git
   cd F-S-A

2. Install the dependencies:

      pnpm install


// If you want you can create your own firebase account and setup if not skip to step 4
3. Create a Firebase config file:

Create a Firebase config file in the src/firebase-config.js directory. Add your Firebase configuration details to this file.

    // src/firebase-config.js

    import { initializeApp } from 'firebase/app';

    const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
    };

    const app = initializeApp(firebaseConfig);

    export { app };

4. Start the development server:

      pnpm run dev

5. Open your web browser and go to http://localhost:3000 to view the application.

6. Usage
   Sign Up: Create an account using your email and password.

   Sign In: Log in with your registered account.

   Record Activities: Record your field service activities by providing details in the form.

   View Reports: Access monthly reports to see your field service progress.

   Submit Reports: Submit your monthly report to your service overseer on whatsapp automatically.

   Manage Students: Add and manage students or team members you work with.

Acknowledgments
  Thanks to the Firebase team for providing a powerful and easy-to-use backend service and also the Ionic Team for Capacitor as well.
  Hat tip to anyone whose code was used.

Contact
  If you have any questions or suggestions, feel free to contact the project maintainer:

  Osborne Aigbiremolen
  osborneosas12@gmail.com
   
