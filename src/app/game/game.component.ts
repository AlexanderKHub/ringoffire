import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
}) 
export class GameComponent implements OnInit {
  
  pickCardAnimation = false;
  game: Game | any;
  currentCard:string = '';
  
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {}
  
  ngOnInit(): void {
    this.newGame();

     //logs the current url after /game/
     this.route.params.subscribe((params)=>{
      console.log('route.params sind', params['id']);

    this.firestore
      .collection('games')
      .doc(params['id'])
      .valueChanges()
      .subscribe((game:any)=>{
        console.log('game update', game);
    })
    })

  
    //subscribes to database games and logs them
    const coll = collection(this.firestore,'games');
    let gameInfo = collectionData(coll);
    console.log('coll ist', coll);
    gameInfo.subscribe((gi) => {
      console.log('current games in DB are', gi);
    })
  }

  newGame(){
    this.game = new Game();
  }

  drawCard(){
    if(this.gameExists() && this.noCardAnimation() && this.playersExist()){
      
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.addToPlayedCards();
      }, 2000); 
    }  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name){
        this.game.players.push(name);
      }
    });
  }

  noCardAnimation(){
    return !this.pickCardAnimation;
  }

  gameExists(){
    return this.game;
  }

  playersExist(){
    return this.game.players.length > 0;
  }

  addToPlayedCards(){
    this.game.playedCards.push(this.currentCard);
  }
}
