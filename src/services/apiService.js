import config from '../config';
import TokenService from '../services/token-service';

// PUBLIC SIDE

const apiService = {
  getTenTeamsDefault(){
    let error;
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

  getTenTeamsSearch(query){
    let error;
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

  getSetsforTenTeams(){
    let error;
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

  getLikesforOneTeam(team_id){
    let error;
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

  getSetsForOneTeam(team_id){
    let error;
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
  
  getSingleTeam(team_id) {
    let error;
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

  getSingleSet(team_id, set_id) {
    let error;
    return fetch(`${config.API_ENDPOINT}/all/${team_id}/${set_id}`, {
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

  getUserFolders(user_id) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/folders/${user_id}`, {
      method: 'GET',
      headers: {
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

  getUserTeams(user_id) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/teams/${user_id}`, {
      method: 'GET',
      headers: {
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
  getUserSets(user_id) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/sets/${user_id}`, {
      method: 'GET',
      headers: {
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

  getUserFoldersFilter(user_id, query) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/folders/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
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

  getUserTeamsFilter(user_id, query) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/teams/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
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
  getUserSetsFilter(user_id, query) {
    let error;
    return fetch(`${config.API_ENDPOINT}/build/sets/${user_id}/filter${query}`, {
      method: 'GET',
      headers: {
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


  postUserFolder(foldername, userid) {
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

  postUserTeam(body, userid) {
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


  postUserSet(body, userid) {
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
  }
};



export default apiService;