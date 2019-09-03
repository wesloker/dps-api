/* eslint-disable no-undef */

/* Start Application */
require('../../');

const fetch = require('node-fetch');

describe('App Request Unit Test', () => {
  test('Get ', async () => {
    const query = `
        query {
          earthquakeReports {
            num
            date
            localtime
            mag
            lat
            lng
            depth
            intensity
          }
        }
      `;
    const response = await fetch('http://localhost:4000/api/v0.1.0beta/earthquake/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data: reports } = await response.json();
    expect(typeof reports).toBe('object');
  });
});
