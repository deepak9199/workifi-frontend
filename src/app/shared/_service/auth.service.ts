import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import 'firebase/compat/auth'; // Import Firebase Authentication
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { users } from '../model/user';
import { TokenStorageService } from './token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private tokenStorage: TokenStorageService, private toster: ToastrService) { }

  // Sign in with email and password
  signInWithEmailAndPassword(email: string, password: string): Observable<{ userCredential: firebase.default.auth.UserCredential, token: string, uid: string } | null> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        if (!userCredential || !userCredential.user) {
          return of(null);
        }
        return from(userCredential.user.getIdToken()).pipe(
          map(token => ({ userCredential, token, uid: userCredential.user!.uid }))
        );
      }),
      catchError(error => {
        console.error('Error signing in:', error);
        this.toster.error(error.message)
        return of(null);
      })
    );
  }
  // change password
  // Change password with old password, new password, and confirmation
  changePasswordWithConfirmation(oldPassword: string, newPassword: string, confirmPassword: string): Observable<boolean> {
    // Get the current user as a promise
    const currentUserPromise = this.afAuth.currentUser;

    // Convert the promise to an observable
    const currentUser = from(currentUserPromise);

    // Now we can use pipe and switchMap to handle the async operation
    return currentUser.pipe(
      switchMap(user => {
        // Check if user exists
        if (!user) {
          console.error('No user is signed in.');
          return of(false);
        }

        // Check if new password matches confirmation
        if (newPassword !== confirmPassword) {
          console.error('New password does not match confirmation.');
          this.toster.error('New password does not match confirmation.');
          return of(false);
        }

        // Update password after getting user

        return from(user.updatePassword(newPassword)).pipe(
          map(() => true),
          catchError(error => {
            console.error('Error changing password:', error);
            this.toster.error(error.message);
            return of(false);
          })
        );
      }),
      catchError(error => {
        console.error('Error getting current user:', error);
        this.toster.error('Error getting current user.');
        return of(false);
      })
    );
  }

  // Register user with email and password
  registerWithEmailAndPassword(email: string, password: string): Observable<firebase.default.auth.UserCredential | null> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        // console.error('Error registering user:', error.message);
        this.toster.error(error.message)
        return of(null);
      })
    );
  }

  // Function to add a document to a Firestore collection
  addUsers(data: users): Observable<any> {
    return new Observable<any>(observer => {
      this.firestore.collection("users").add(data)
        .then(docRef => {
          observer.next(docRef);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Sign out
  signOut(): Observable<boolean> {
    return from(this.afAuth.signOut()).pipe(
      map(() => true),
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.tokenStorage.signOut();
  }
  // Get the current user
  getCurrentUser(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }
}
