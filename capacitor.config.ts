import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.feildserviceassistant.app',
  appName: 'F-S-A',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
