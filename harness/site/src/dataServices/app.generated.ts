/* This file was generated by https://github.com/dested/serverless-client-builder */
/* tslint:disable */
import {ClientTransformOptions, ClientOptions, ClientSocketOptions, ControllerOptions} from './baseClient';
declare type ObjectId = string;

export class GameClient {
  static async serverUpdated<TPromise = VoidResponse>(
    model: VoidRequest,
    handle: {200?: (result: VoidResponse) => void; 500?: (result: string) => void; 401?: (error: string) => void}
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game/server-updated?';

    return makeRequest(url, model, 'POST', handle);
  }

  static async newGame<TPromise = NewGameResponse>(
    model: NewGameRequest,
    handle: {200?: (result: NewGameResponse) => void; 500?: (result: string) => void; 401?: (error: string) => void}
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game/new-game?';

    return makeRequest(url, model, 'POST', handle);
  }
}

export class GameDetailsClient {
  static async getGames<TPromise = GetGamesResponse>(
    model: VoidRequest,
    handle: {200?: (result: GetGamesResponse) => void; 500?: (result: string) => void; 401?: (error: string) => void}
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game-details/?';

    return makeGetRequest(url, model, 'GET', handle);
  }

  static async getGameDetails<TPromise = GetGameDetailsResponse>(
    model: GetGameDetailsRequest,
    handle: {
      200?: (result: GetGameDetailsResponse) => void;
      500?: (result: string) => void;
      400: (result: {error: string}) => void;
      401?: (error: string) => void;
    }
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game-details/details?';

    return makeGetRequest(url, model, 'GET', handle);
  }

  static async joinLobby<TPromise = JoinLobbyResponse>(
    model: JoinLobbyRequest,
    handle: {
      200?: (result: JoinLobbyResponse) => void;
      500?: (result: string) => void;
      400: (result: {error: string}) => void;
      401?: (error: string) => void;
    }
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game-details/join-lobby?';

    return makeRequest(url, model, 'POST', handle);
  }

  static async joinGame<TPromise = JoinLobbyResponse>(
    model: JoinLobbyGameRequest,
    handle: {
      200?: (result: JoinLobbyResponse) => void;
      500?: (result: string) => void;
      400: (result: {error: string}) => void;
      401?: (error: string) => void;
    }
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game-details/join-lobby-game?';

    return makeRequest(url, model, 'POST', handle);
  }

  static async startPrivateLobby<TPromise = JoinLobbyResponse>(
    model: StartPrivateLobbyRequest,
    handle: {
      200?: (result: JoinLobbyResponse) => void;
      500?: (result: string) => void;
      400: (result: {error: string}) => void;
      401?: (error: string) => void;
    }
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/game-details/start-private-lobby?';

    return makeRequest(url, model, 'POST', handle);
  }
}

export class PlayerClient {
  static async getPlayerDetails<TPromise = LoginResponse>(
    model: VoidRequest,
    handle: {200?: (result: LoginResponse) => void; 500?: (result: string) => void; 401?: (error: string) => void}
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/player/details?';

    return makeGetRequest(url, model, 'GET', handle);
  }

  static async playAnon<TPromise = LoginResponse>(
    model: VoidRequest,
    handle: {
      200?: (result: LoginResponse) => void;
      500?: (result: string) => void;
      400: (result: {error: string}) => void;
      401?: (error: string) => void;
    }
  ): Promise<TPromise | undefined> {
    let url = ClientOptions.baseUrl + '/player/anon?';

    return makeRequest(url, model, 'POST', handle);
  }
}

export interface VoidRequest {}

export interface VoidResponse {}

export interface NewGameRequest {
  numberOfPlayers: number;
  gameRules: GameRules;
}

export type GameRules = {
  items: {key: string; value: string}[];
};

export interface NewGameResponse {
  error?: string;
}

export interface GetGamesResponse {
  games: HttpGameDetailLight[];
}

export interface HttpGameDetailLight {
  id: string;
  logo: string;
  name: string;
  description: string;
}

export interface GetGameDetailsRequest {
  gameId: string;
}

export interface GetGameDetailsResponse {
  details: HttpGameDetail;
}

export interface HttpGameDetail {
  id: string;
  logo: string;
  name: string;
  description: string;
  author: string;
  numberOfActivePlayers: number;

  gameRulesSchema: GameRulesSchema;
  gameRulesDefault: GameRules;
}

export type GameRulesSchema = {
  items: {
    key: string;
    option:
      | {type: 'text'; minLength: number; maxLength: number}
      | {type: 'number'; minValue: number; maxValue: number}
      | {type: 'switch'}
      | {type: 'options'; options: {label: string; value: string}[]};
  }[];
};

export interface JoinLobbyRequest {
  gameId: string;
  rules: GameRules;
}

export interface JoinLobbyResponse {
  lobbyId: string;
}

export interface JoinLobbyGameRequest {
  gameId: string;
  lobbyCode: string;
}

export interface StartPrivateLobbyRequest {
  gameId: string;
  rules: GameRules;
}

export interface LoginResponse {
  jwt: string;
  player: HttpPlayerModel;
}

export type HttpPlayerModel = {
  playerId: string;
  name: string;
  email: string;
  anon: boolean;
};

async function handleResponse(responseText: string, status: number, handle: any) {
  try {
    if (handle[status]) {
      const val = responseText === '' ? null : JSON.parse(responseText);
      await handle[status](val);
      return undefined;
    } else {
      switch (status) {
        case 200: {
          return JSON.parse(responseText);
        }
        case 401: {
          ClientOptions.handleUnauthorized(responseText);
          break;
        }
        case 500: {
          const body = JSON.parse(responseText);
          ClientOptions.handleError(body.error || responseText);
          break;
        }
      }
    }
  } catch (ex) {
    if (!handle[500]) {
      ClientOptions.handleError(ex.toString());
    } else {
      await handle[500](ex.toString());
    }
  }
}
async function makeRequest(url: string, model: any, method: string, handle: any) {
  try {
    const options = {
      method,
    } as RequestInit;

    options.body = JSON.stringify(model);

    const response = await fetch(url, ClientTransformOptions(options));
    const status = response.status;
    const responseText = await response.text();
    return handleResponse(responseText, status, handle);
  } catch (ex) {
    return handleResponse(ex.toString(), 500, handle);
  }
}

async function makeGetRequest(url: string, model: any, method: string, handle: any) {
  try {
    const options = {
      method,
    } as RequestInit;
    url += Object.keys(model)
      .filter(key => !!(model as any)[key])
      .map(key => `${key}=${encodeURIComponent((model as any)[key])}`)
      .join('&');

    const response = await fetch(url, ClientTransformOptions(options));
    const status = response.status;
    const responseText = await response.text();
    return handleResponse(responseText, status, handle);
  } catch (ex) {
    return handleResponse(ex.toString(), 500, handle);
  }
}
