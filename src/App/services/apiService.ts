import config from '../../config';
import {
  PokemonFolder,
  PokemonTeam,
  PokemonSet,
  PokemonTeamPost,
} from '../@types';
import TokenService from './token-service';

// PUBLIC SIDE

type Error = {
  code: number;
  message?: string;
};

const getAPIData = (
  uri: string,
  headers: string[][] | Record<string, string>
) => {
  let error: Error;
  return fetch(`${config.API_ENDPOINT}${uri}`, {
    method: 'GET',
    headers: headers,
  })
    .then((res) => {
      if (!res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const postAPIData = (uri: string, body: string) => {
  return fetch(`${config.API_ENDPOINT}${uri}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
    body: body,
  }).then((res) =>
    !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  );
};

const patchAPIData = (uri: string, body: string) => {
  return fetch(`${config.API_ENDPOINT}${uri}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
    body: body,
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res;
  });
};

const deleteAPIData = (uri: string) => {
  return fetch(`${config.API_ENDPOINT}${uri}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    },
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res;
  });
};

const apiService = {
  getTenTeamsDefault(): Promise<PokemonTeam[]> {
    return getAPIData(`/all`, {});
  },

  getTenTeamsSearch(query: string): Promise<PokemonTeam[]> {
    return getAPIData(`/all/search${query}`, {});
  },

  getSetsforTenTeams(): Promise<PokemonSet[]> {
    return getAPIData(`/all/sets`, {});
  },

  getLikesforOneTeam(team_id: number): Promise<unknown> {
    // Not sure what this returns rn
    return getAPIData(`/all/${team_id}/likes`, {});
  },

  getSetsForOneTeam(team_id: number): Promise<PokemonSet[]> {
    return getAPIData(`/all/${team_id}/sets`, {});
  },

  getTeamsForOneFolder(folder_id: number): Promise<PokemonTeam[]> {
    return getAPIData(`/all/${folder_id}/teams`, {});
  },

  getSingleTeam(team_id: number): Promise<PokemonTeam> {
    return getAPIData(`/all/${team_id}`, {});
  },

  getSingleSet(set_id: number): Promise<PokemonSet> {
    return getAPIData(`/all/set/${set_id}`, {});
  },

  // USER SIDE

  // GET

  getSingleFolder(folder_id: number): Promise<PokemonFolder> {
    return getAPIData(`/build/folder/${folder_id}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getSingleFolderPublic(folder_id: number): Promise<PokemonFolder> {
    return getAPIData(`/all/folderpublic/${folder_id}`, {});
  },

  getUserFolders(user_id: number): Promise<PokemonFolder[]> {
    return getAPIData(`/build/folders/${user_id}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getUserTeams(user_id: number): Promise<PokemonTeam[]> {
    return getAPIData(`/build/teams/${user_id}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getUserSets(user_id: number): Promise<PokemonSet[]> {
    return getAPIData(`/build/sets/${user_id}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getUserFoldersFilter(
    user_id: number,
    query: string
  ): Promise<PokemonFolder[]> {
    return getAPIData(`/build/folders/${user_id}/filter${query}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getUserTeamsFilter(user_id: number, query: string): Promise<PokemonTeam[]> {
    return getAPIData(`/build/teams/${user_id}/filter${query}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  getUserSetsFilter(user_id: number, query: string): Promise<PokemonSet[]> {
    return getAPIData(`/build/sets/${user_id}/filter${query}`, {
      'content-type': 'application/json',
      authorization: `bearer ${TokenService.getAuthToken()}`,
    });
  },

  // POST

  postUserFolder(foldername: string, userid: number): Promise<PokemonFolder> {
    return postAPIData(
      `/build/folders/${userid}`,
      JSON.stringify({
        folder_name: foldername,
        user_id: userid,
      })
    );
  },

  postUserTeam(body: PokemonTeamPost, userid: number): Promise<PokemonTeam> {
    return postAPIData(`/build/teams/${userid}`, JSON.stringify(body));
  },

  postUserSet(body: PokemonSet, userid: number): Promise<PokemonSet> {
    return postAPIData(`/build/sets/${userid}`, JSON.stringify(body));
  },

  // PATCH

  patchUserFolder(
    foldername: string,
    iden: string,
    userid: number
  ): Promise<Response> {
    return patchAPIData(
      `/build/folders/${userid}`,
      JSON.stringify({
        id: iden,
        folder_name: foldername,
        user_id: userid,
      })
    );
  },

  patchUserTeam(
    body: Record<string, unknown>,
    userid: number
  ): Promise<Response> {
    return patchAPIData(`/build/teams/${userid}`, JSON.stringify(body));
  },

  patchUserSet(
    body: Record<string, unknown>,
    userid: number
  ): Promise<Response> {
    return patchAPIData(`/build/sets/${userid}`, JSON.stringify(body));
  },

  // DELETE

  deleteUserFolder(folder_id: number): Promise<Response> {
    return deleteAPIData(`/build/folder/${folder_id}`);
  },

  deleteUserTeam(team_id: number): Promise<Response> {
    return deleteAPIData(`/build/team/${team_id}`);
  },

  deleteUserSet(team_id: number, set_id: number): Promise<Response> {
    return deleteAPIData(`/build/set/${team_id}/${set_id}`);
  },
};

export default apiService;
