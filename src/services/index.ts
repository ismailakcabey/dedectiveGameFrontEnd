const API_PREFIX = '/dedective';
export const APIS = {
  AUTH: {
    LOGIN: API_PREFIX + '/auth/login',
    ME: API_PREFIX + '/auth/me',
  },

  USER: {
    USER: API_PREFIX + '/user',
  },

  EVENT: {
    EVENT: API_PREFIX + '/event',
  },

  CLUE: {
    CLUEEVENT: API_PREFIX + '/clue/event',
    CLUE: API_PREFIX + '/clue',
  },

  EXPRESSION: {
    EXPRESSIONEVENT: API_PREFIX + '/expression/event',
    EXPRESSION: API_PREFIX + '/expression',
  },

  MESSAGE: {
    MESSAGEEVENT: API_PREFIX + '/message/event',
    MESSAGE: API_PREFIX + '/message',
  },

  CARD: {
    CARDEVENT: API_PREFIX + '/card-extra/event',
    CARD: API_PREFIX + '/card-extra',
  },

  REPORT: {
    REPORT: API_PREFIX + '/report',
  },

  TEAMS: {
    TEAMS: API_PREFIX + '/team',
    JOIN: API_PREFIX + '/team/join',
    IN: API_PREFIX + '/team/teams/in/user',
  }

};
