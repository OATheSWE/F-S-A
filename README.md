# Field Service Assistant

Field Service Assistant is a web application designed to help manage and streamline field service activities. Whether you're involved in community outreach, door-to-door preaching, or any field service work, this tool can assist you in tracking your activities, managing students or team members, and reporting your progress. This is a link to the [Field Service Assistant](https://feild-service-assistant.web.app/) application. Here is a link to the project on github - https://github.com/OATheSWE/F-S-A. Here is a link to my project screen cast - https://drive.google.com/file/d/1R6bQSFucyh2s5azFOfEnwjxZfWLmhDIu/view?usp=sharing

## Tech Stack

- **Frontend:** The project utilizes React with TypeScript for the frontend. TypeScript was chosen for its static typing, which enhances code quality and catch errors during development. React provides a component-based structure for building interactive user interfaces.

- **Backend and Database:** Firebase is used as the backend and database. Its easy integration with frontend technologies, real-time database capabilities, and authentication features make it suitable for rapid development and scalability.

- **Hybrid Application:** The hybrid mobile application is developed using Capacitor by Ionic. Capacitor allows seamless deployment of web applications as native mobile apps, providing a consistent user experience across platforms.

- **Programming Language:** The project predominantly uses TypeScript over Regular JavaScript for enhanced code maintainability, better collaboration among developers, and improved development experience due to static typing.

## Folder Structure

- **.github:** Contains Firebase workflows for CI/CD.

- **android:** Houses the Android app with files predominantly written in Java.

- **functions:** Contains Firebase functions.

- **dist:** Holds the build version uploaded as the current working version online.

- **public:** Stores public assets.

- **src:**
  - **assets:** Contains project-related assets.
  - **components:** Holds reusable React components.
  - **static data:** Stores static data used in the application.
  - **pages:** Contains React components representing different pages of the application.
  - **routes:** Manages the routing configuration of the application.
  - **context file:** Contains context-related logic.
  - **main entry file:** The main entry file for the application.
  - **firebase config:** Configuration for Firebase integration.

- **other files:** Such as lock file, typescript configurations and Project Screencast video.

## Libraries

- **crypto-js:** Utilized for cryptographic functions.
- **Google Maps API:** Integrated for geolocation and map-related functionalities.

## Features

- **Student Management:** Keep track of your students or team members, including their names, books of study, and contact information.

- **Activity Recording:** Record your daily activities, including the number of hours spent, videos shown, placements, return visits, and Bible studies.

- **Location Usage:** Utilize geolocation to keep track of your student's location so you can revisit.

- **Monthly Reports:** Generate monthly reports summarizing your field service activities for each month.

- **User Authentication:** Securely sign in using Firebase Authentication to protect your data.

- **Automation of Sending Reports:** Get your monthly report calculated for you and onclick of a button sends it to your service overseer.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **Pnpm Installation:** Install pnpm with this command - npm install pnpm -g.

### Installation

1. Clone the repository:

   ```shell
   git clone --depth 1 https://github.com/OATheSWE/F-S-A.git 
   cd F-S-A
   ```

2. Install the dependencies:

   ```shell
   pnpm install
   ```

3. Start the development server:

   ```shell
   pnpm run dev
   ```

4. Open your web browser and go to http://localhost:5173 to view the application.

5. Usage
   - Sign Up: Create an account using your email and password.
   - Sign In: Log in with your registered account.
   - Record Activities: Record your field service activities by providing details in the form.
   - View Reports: Access monthly reports to see your field service progress.
   - Submit Reports: Submit your monthly report to your service overseer on WhatsApp automatically.
   - Manage Students: Add and manage students or team members you work with.

## Acknowledgments

- Thanks to the Firebase team for providing a powerful and easy-to-use backend service.
- Thanks to the Ionic Team for Capacitor for hybrid application development.

Hat tip to anyone whose code was used.


Here is a link to my project screen cast - https://drive.google.com/file/d/1R6bQSFucyh2s5azFOfEnwjxZfWLmhDIu/view?usp=sharing

## Contact

If you have any questions or suggestions, feel free to contact the project maintainer:

Osborne Aigbiremolen
osborneosas12@gmail.com