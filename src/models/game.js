export default class Game {
  id;
  name;
  difficulty;
  content;
  validContent;

  constructor({ id, name, difficulty, content }) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.content = content;
  }

  getRowsCount() {
    return this.content ? this.content.length : undefined;
  }

  getColumnsCount() {
    if (!this.content) return undefined;
    return this.content.reduce(
      (a, b) => a.length > b.length ? a : b
    ).length;
  }

  areRowsEven() {
    return this.content.filter(
      (row) => row.length !== this.content[0].length
    ).length === 0;
  }

  isValidContent() {
    return (
      this.content !== null
      && this.content !== undefined
      && this.getRowsCount() !== 0
      && this.getColumnsCount() !== 0
      && this.areRowsEven()
    );
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