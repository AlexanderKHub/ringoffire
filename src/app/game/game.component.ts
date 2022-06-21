import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
}) 
export class GameComponent implements OnInit {
  game: Game | any;
  gameid:string = '';
  
  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore) {}
  
  ngOnInit(): void {
    this.newGame();
    this.getGameFromFirestore();
  }

  getGameFromFirestore(){
 
   //subscribes to game url
    this.route.params.subscribe((params)=>{
    this.gameid = params['id'];

    //access to the right game which is stored in firebase
    this.firestore
    .collection('games')
    .doc(this.gameid)
    .valueChanges()
    .subscribe((game:any)=>{
    
      console.log('game update', game);
      //updates the webapp to be synchronized with the database
      this.game.currentPlayer = game.currentPlayer;
      this.game.players = game.players;
      this.game.playerImages = game.playerImages;
      this.game.stack = game.stack;
      this.game.playedCards = game.playedCards;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    })
  })
}

  editUser(playerID:number){
    const dialogRef = this.dialog.open(EditPlayerComponent);
    
    dialogRef.afterClosed().subscribe(change => {
      if(change == 'DELETE'){
        this.game.players.splice(playerID, 1);
        this.game.playerImages.splice(playerID,1);
      }
      else{
        if(change){
        this.game.playerImages[playerID] = change;
        }
      }
      this.updateGameToDB();
    });
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && this.game.players.length < 5){
        this.game.players.push(name);
        this.game.playerImages.push('blank-profile.png');
        document.getElementById('add-player-button')?.classList.remove('blinking-button');
        document.getElementById('dark-overlay')?.classList.add('hide');
        this.updateGameToDB();
      }
    });
  }


  drawCard(){
    if(this.gameExists() && this.noCardAnimation() && this.playersExist()){
      
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGameToDB();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.addToPlayedCards();
        this.updateGameToDB();
      }, 2000); 
    }  else{
        document.getElementById('add-player-button')?.classList.add('blinking-button');
        document.getElementById('dark-overlay')?.classList.remove('hide');
    }
  }


  updateGameToDB(){
    this.firestore
    .collection('games')
    .doc(this.gameid)
    .update(this.game.toJson());
  }

  newGame(){
    this.game = new Game();
  }


  noCardAnimation(){
    return !this.game.pickCardAnimation;
  }


  gameExists(){
    return this.game;
  }


  playersExist(){
    return this.game.players.length > 0;
  }


  addToPlayedCards(){
    this.game.playedCards.push(this.game.currentCard);
  }
}
