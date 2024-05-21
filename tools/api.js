class API {
  static server = 'http://localhost:3000';
    
  constructor() { throw new Error('not instance') }
  
  /**
   * 
   * @param {string} dateData - year/month/day
   * @returns - promise
   */
  static async checkFreeDays(dateData) {
    return fetch(`${API.server}/reqAccept`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ date: dateData }),
    })
    .then(r => r.json())
  }
}

export default API;
