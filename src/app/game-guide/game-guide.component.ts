import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-guide',
  templateUrl: './game-guide.component.html',
  styleUrls: ['./game-guide.component.scss']
})
export class GameGuideComponent implements OnInit,OnChanges {

  constructor() { }

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You choose a person that has to drink a shot.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls must drink a shot.' },
    { title: 'Heaven', description: 'Throw your hands in the air! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: 'The player who drew the card says a word and you go around the circle rhyming with that word until someone messes up and has to drink.' },
    { title: 'Men', description: 'All men must drink a shot.' },
    { title: 'Sport', description: 'Do 5 push-ups or drink a shot.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule Maker', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title:string = 'Welcome to the Ring of Fire!';
  description:string = 'Requires atleast 1 player. Players must first be added through the top left button.';
  @Input() card:string = '';

  ngOnInit(): void {
    
  }

  ngOnChanges():void{
    if(this.card){
      console.log(this.card.split('_'));
      let cardNumber = +this.card.split('_')[1];
      console.log(cardNumber);
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
    
  }

}
