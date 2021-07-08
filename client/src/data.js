const char = [
  {
    'id': 0,
    'name': 'Werewolf',
    'img': './img/Werewolf.png',
    'team': 'werewolves',
    'des': 'The Werewolves wake up, along with the other Werewolves, to see who they are. If a Werewolf wakes up and they see no other Werewolves, they are allowed to look at one card in the center.',
    'action': 'Werewolves woke up and looked around to find their target',
    'reveal': false
  },
  {
    'id': 1,
    'name': 'Drunk',
    'img': './img/Drunk.png',
    'team': 'village',
    'des': 'When the Drunk wakes up, they exchange their card with a card in the center. They DO NOT look at their new card.',
    'action': 'Drunk woke up and exchanged his card with one of the center card',
    'reveal': false
  },
  {
    'id': 2,
    'name': 'Mason',
    'img': './img/Mason.png',
    'team': 'village',
    'des': 'There must always be 2 Masons. When they are called to wake up, the Mason(s) look around to see if there are any other Masons. If a Mason does not see another Mason, the Mason knows the other Mason card is in the center with the other two cards.',
    'action': 'Mason woke up and found (or not) the other Mason!',
    'reveal': false
  },
  {
    'id': 3,
    'name': 'Seer',
    'img': './img/Seer.png',
    'team': 'village',
    'des': "When the Seer wakes up, and they can either look at a player's card, or 2 cards in the center.",
    'action': "Seer woke up and chose to look at one player's card or 2 cards in the center",
    'reveal': false
  },
  {
    'id': 4,
    'name': 'Robber',
    'img': './img/Robber.png',
    'team': 'village',
    'des': `When the Robber wakes up, they can trade their card with another player's card, then look at their new card. The Robber will NOT wake up again if the role they view is called.`,
    'action': "Robber woke up and exchanged his card with one of the player's card",
    'reveal': false
  },
  {
    'id': 5,
    'name': 'Troublemaker',
    'img': './img/Troublemaker.png',
    'team': 'village',
    'des': `When the Troublemaker wakes up, they can switch 2 other player's cards, without looking at them. They cannot swap their own card.`,
    'action': "Troublemaker woke up and exchanged two plays' cards",
    'reveal': false
  },
  {
    'id': 6,
    'name': 'Insomniac',
    'img': './img/Insomniac.png',
    'team': 'village',
    'des': `When the Insomniac wakes up, they look at their card to see if it has changed.`,
    'action': 'Insomniac woke up and confirmed her card',
    'reveal': false
  }
];
export default char;