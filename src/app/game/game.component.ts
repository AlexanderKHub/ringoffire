import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  pickCardAnimation = false;
  game: Game | any;
  currentCard:string = '';

  
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name){
        this.game.players.push(name);
      }
    });
  }


  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
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
