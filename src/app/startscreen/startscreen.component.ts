import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
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

  newGame(){
    let game = new Game();

    //get collection 'games' from firestore
    const coll = collection(this.firestore, 'games');
    setDoc(doc(coll),(game.toJson()))
    .then((gameinfo:any) => {
      console.log('gameinfo ist' , gameinfo);
      //route to gameid
      this.router.navigateByUrl('/game/' + gameinfo.id);
    });
  }
}
