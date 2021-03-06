import { TabsPage } from './pages/tabs/tabs';
import { VerificationPage } from './pages/verification/verification';

export namespace Settings {
  // replace with your key
  export const firebaseConfig = {
    apiKey: "AIzaSyDN6WmBnJGfN64BnR-r4TW9V8N1IHgps1w",
    authDomain: "chatapp-3f829.firebaseapp.com",
    databaseURL: "https://chatapp-3f829.firebaseio.com",
    projectId: "chatapp-3f829",
    storageBucket: "chatapp-3f829.appspot.com",
    messagingSenderId: "845839389008"
  };
  
  // For Facebook Login
  export const facebookLoginEnabled = true;
  export const facebookAppId: string = "767580770058358"; // Not required, If you're not using FBLogin
  
  //For Google Login
  export const googleLoginEnabled = true;
  export const googleClientId: string = "845839389008-s0scp3mghdi67t5ga9t56j6265ibonp5.apps.googleusercontent.com"; // Not Required, If you're not using Google+ login
  
  // For PhoneNumber Login
  // we used Facebook AccountKit for PhoneNumber Validation
  // Limitation: customToken will generate only if you have firebase blaze plan
  export const phoneLoginEnabled = true; // only works on real devices
  export const customTokenUrl: string = "https://us-central1-chatapp-3f829.cloudfunctions.net/getCustomToken"; // Not Required, If you're not using PhoneNumber login
  
  export const homePage = TabsPage;
  export const verificationPage = VerificationPage;
}