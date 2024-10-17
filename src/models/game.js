export default class Game {
  id;
  name;
  difficulty;
  content;
  creator_id;

  constructor({ id, name, difficulty, content, rows_count, columns_count, creator_id }) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.content = content;
    this.rows_count = rows_count;
    this.columns_count = columns_count;
    this.creator_id = creator_id;
  }

}

export const gamesMap = new Map();


export const newGame = (data) => {
  const game = new Game(data);
  gamesMap.set(game.id, game);
  return game;
};


export const getGame = (id) => {
  return gamesMap.get(id);
};


export const deleteGame = (id) => {
  gamesMap.delete(id);
};

export const updateGame = (id, data) => {
  const game = getGame(id);
  game.name = data.name;
  game.difficulty = data.difficulty;
  game.content = data.content;
  game.clues = data.clues;
  game.rows_count = data.rows_count;
  game.columns_count = data.columns_count;
  game.creator_id = data.creator_id;
};