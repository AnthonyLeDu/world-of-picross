import { getGame } from '../../models/game';


export const getIsLoadingGames = (state) => state.app.isLoadingGames;

export const getAvailableGames = (state) => {
  if (state.app.availableGamesIds === undefined) return undefined;
  return state.app.availableGamesIds.map((gameId) => getGame(gameId));
};

export const getCurrentGameId = (state) => state.app.currentGameId;
