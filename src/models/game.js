/**
 * Return the last key of a given object.
 * @param {Object} obj 
 */
const getMaxKey = (obj) => {
  return Math.max(...Object.keys(obj));
};

export default class Game {
  id;
  name;
  difficulty;
  dbContent;
  table;
  creator_id;
  validContent;

  constructor({ id, name, difficulty, content, creator_id }) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.dbContent = content;
    this.creator_id = creator_id;
    this.table = this.asFullTable();
  }

  getRowsCount() {
    return this.table ? this.table.length : undefined;
  }

  getColumnsCount() {
    if (!this.table) return undefined;
    return this.table.reduce(
      (a, b) => a.length > b.length ? a : b
    ).length;
  }

  areRowsEven() {
    return this.table.filter(
      (row) => row.length !== this.table[0].length
    ).length === 0;
  }

  isValidContent() {
    return (
      this.table !== null
      && this.table !== undefined
      && this.getRowsCount() !== 0
      && this.getColumnsCount() !== 0
      && this.areRowsEven()
    );
  }

  /**
   * Content object coming from database has no data for empty rows or columns.
   * This function converts it to a full table with every rows and colums.
   */
  asFullTable() {
    const rowsCount = this.dbContent ? getMaxKey(this.dbContent) + 1 : undefined;
    let columnsCount = undefined;
    if (this.dbContent) {
      columnsCount = 0;
      for (const row in this.dbContent) {
        columnsCount = Math.max(columnsCount, getMaxKey(this.dbContent[row]) + 1);
      }
    }
    if (rowsCount === undefined || columnsCount === undefined) {
      return undefined;
    }

    const fullContent = [];
    for (let row = 0; row < rowsCount; row++) {
      fullContent.push([]);
      for (let col = 0; col < columnsCount; col++) {
        fullContent[row].push(
          this.dbContent[row] ? (
            this.dbContent[row][col] ? this.dbContent[row][col] : null
          ) : null
        );
      }
    }
    return fullContent;
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