import {DbAnalyticsEventModel} from './dbAnalyticsEvent';
import {DbErrorModel} from './dbError';
import {DocumentManager} from '../services/db/dataManager';
import {DbPlayerModel} from './dbPlayer';
import {DbGameModel} from './dbGame';
import {DbLobbyModel, DbLobbyPlayerModel} from './dbLobby';
import {DbLiveGameModel, DbLiveGamePlayerModel} from './dbLiveGame';

export class DbModels {
  static analyticEvent = new DocumentManager<DbAnalyticsEventModel>('qg-analytic-event');
  static error = new DocumentManager<DbErrorModel>('qg-error');
  static player = new DocumentManager<DbPlayerModel>('qg-player');
  static game = new DocumentManager<DbGameModel>('qg-game');
  static liveGame = new DocumentManager<DbLiveGameModel>('qg-live-game');
  static liveGamePlayer = new DocumentManager<DbLiveGamePlayerModel>('qg-live-game-player');
  static lobby = new DocumentManager<DbLobbyModel>('qg-lobby');
  static lobbyPlayer = new DocumentManager<DbLobbyPlayerModel>('qg-lobby-player');
}
