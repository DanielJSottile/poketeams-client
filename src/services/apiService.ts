import config from '../config';
import TokenService from './token-service';

// PUBLIC SIDE

const apiService = {
  getTenTeamsDefault(): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getTenTeamsSearch(query: string): Promise<any>{
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/search${query}`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getSetsforTenTeams(): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/sets`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getLikesforOneTeam(team_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/${team_id}/likes`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getSetsForOneTeam(team_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/${team_id}/sets`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },
  
  getSingleTeam(team_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/${team_id}`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getSingleSet(set_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/all/set/${set_id}`, {
      method: 'GET',
      headers: {}
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  // USER SIDE

  // GET

  getSingleFolder(folder_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/folder/${folder_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },
 
  getUserFolders(user_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/folders/${user_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getUserTeams(user_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/teams/${user_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },
  getUserSets(user_id: number): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/sets/${user_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getUserFoldersFilter(user_id: number, query: string): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/folders/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  getUserTeamsFilter(user_id: number, query: string): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/teams/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },
  getUserSetsFilter(user_id: number, query: string): Promise<any> {
    let error: any;
    return fetch(`${config.API_ENDPOINT}/build/sets/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data})
  },

  // POST


  postUserFolder(foldername: string, userid: number): Promise<any>  {
    return fetch(`${config.API_ENDPOINT}/build/folders/${userid}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        folder_name: foldername,
        user_id: userid
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postUserTeam(body: object, userid: number): Promise<any>  {
    return fetch(`${config.API_ENDPOINT}/build/teams/${userid}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },


  postUserSet(body: object, userid: number): Promise<any>  {
    return fetch(`${config.API_ENDPOINT}/build/sets/${userid}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  // PATCH

  patchUserFolder(foldername: string, iden: number, userid: number): Promise<any> {
    return fetch(`${config.API_ENDPOINT}/build/folders/${userid}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        id: iden,
        folder_name: foldername,
        user_id: userid
      }),
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },

  patchUserTeam(body: object, userid: number): Promise<any>  {
    return fetch(`${config.API_ENDPOINT}/build/teams/${userid}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },


  patchUserSet(body: object, userid: number): Promise<any> {
    return fetch(`${config.API_ENDPOINT}/build/sets/${userid}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },

  // DELETE

  deleteUserFolder(folder_id: number): Promise<any> {
    return fetch(`${config.API_ENDPOINT}/build/folder/${folder_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e))
        return res
      })
  },
  
  deleteUserTeam(team_id: number): Promise<any> {
    return fetch(`${config.API_ENDPOINT}/build/team/${team_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },

  deleteUserSet(team_id: number, set_id: number): Promise<any> {
    return fetch(`${config.API_ENDPOINT}/build/set/${team_id}/${set_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },
};

export default apiService;