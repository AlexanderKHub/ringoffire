import { Component, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {


  constructor(public firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }

 async newGame(){
    let game = new Game();
  /*
    //get collection 'games' from firestore
    const coll = collection(this.firestore, 'games');
    const docRef:any = await setDoc(doc(coll),(game.toJson()))
      //this.router.navigateByUrl('/game/' + dbRef.id);
      console.log(docRef);
*/

     const dbRef2:any = await addDoc(collection(this.firestore, 'games'), (game.toJson()));
     console.log("Document2 written with ID: ", dbRef2.id);
     this.router.navigateByUrl('/game/' + dbRef2.id);
  }
};
