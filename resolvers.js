import db from "./_db.js";

export const resolvers = {
  Query: {
    games: () => {
      return db.games;
    },
    game: (_, args) => {
      return db.games.find((game) => game.id === args.id);
    },
    reviews: () => {
      return db.reviews;
    },
    review: (_, args) => {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors: () => {
      return db.authors;
    },
    author: (_, args) => {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews: (parent) => {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      console.log(parent);
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author: (parent) => {
      console.log(parent);
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game: (parent) => {
      console.log(parent, "parent");
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame: (_, args) => {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame: (_, args) => {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      db.games.push(game);
      return game;
    },
  },
};
