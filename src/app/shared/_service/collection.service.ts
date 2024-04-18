import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private firestore: AngularFirestore) { }

  getData(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as any;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDocumentById(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).valueChanges();
  }

  // Function to add a document to a Firestore collection
  addDocumnet(collectionName: string, data: any): Observable<any> {
    return new Observable<any>(observer => {
      this.firestore.collection(collectionName).add(data)
        .then(docRef => {
          observer.next(docRef);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  deleteDocument(collectionName: string, docId: string): Observable<void> {
    return new Observable<void>(observer => {
      this.firestore.collection(collectionName).doc(docId).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  updateDocument(collectionName: string, docId: string, data: any): Observable<void> {
    return new Observable<void>(observer => {
      this.firestore.collection(collectionName).doc(docId).update(data)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
