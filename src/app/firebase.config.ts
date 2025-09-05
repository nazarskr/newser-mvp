import {InjectionToken, Provider} from '@angular/core';
import {initializeApp, FirebaseApp} from 'firebase/app';
import {getFirestore, Firestore} from 'firebase/firestore';
import {environment} from '../environments/environment';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FirebaseApp');
export const FIRESTORE = new InjectionToken<Firestore>('Firestore');

export const appFirebaseConfig: Provider[] = [
  {
    provide: FIREBASE_APP,
    useFactory: () => initializeApp(environment.firebase),
  },
  {
    provide: FIRESTORE,
    useFactory: (app: FirebaseApp) => getFirestore(app),
    deps: [FIREBASE_APP],
  },
];
