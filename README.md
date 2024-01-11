<h1 align="center">
   Exploding Kittens :cat:
</h1>
<p align="center"> A web-based card game</p>

# Warning: Backend-down, scores won't be saved.

## Instructions for running the game locally

1. `cd` into your downloads directory where `exploding-kittens.tar.gz` is located.
2. Run the command to extract the files

```
tar -xzvf exploding-kittens.tar.gzip
```

3. Go to the directory exploding-kittens

```
cd exploding-kittens
```

4. Start the server

   1. Setting up your environment
      ```
      cd server
      touch .env
      echo "PORT=(The port your want to run)" >> .env
      echo "REDIS_URL=(your redis URI)" >> .env
      ```
   2. To start in development mode

      ```
      npm install
      npm run start:dev
      ```

      <p align="center">OR</p>

   3. To build the server
      ```
      npm run build
      npm start
      ```

5. Start the client
   1. Setting up your environment
      ```
      cd ..
      cd client
      touch .env
      echo "VITE_API_URL=http://localhost:(PORT)" >> .env
      npm install
      ```
   2. To run in development mode
      ```
      npm run dev
      ```
      <p align="center">OR</p>
   3. To build the app
      ```
      npm run build
      npm run preview
      ```
6. Press <kbd>O</kbd> to open the game the in the browser

## Game Instructions

The game deck consists of 4 different types of cards

- Cat card :cat:
- Defuse card :no_good:
- Shuffle card :twisted_rightwards_arrows:
- Exploding kitten card :bomb:

When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.

## Rules

- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

## Assumptions

- The game currently doesn't have an any User authentication. You can play as any player you want.
- On startup the game assign you a Random username, if you don't change/confirm this username your score won't be saved.
- If you choose a username that doesn't already exists, a new user will created.
- The games polls the database every 8 seconds to provide real time update in the leaderboard table.
