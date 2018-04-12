import Config from '@/config'

// eslint-disable-next-line
const boxcast = window.boxcast
if (!boxcast) {
  alert('BoxCast JavaScript library not found. Application will not function.')
}
if (!Config || !Config.accountId || !Config.channelId) {
  alert('BoxCast application portal not configured. Please ensure you have added your config.js')
}

const API_ROOT = 'https://api.boxcast.com'

function parseJson (r) {
  return r.json()
}

class Cache {
  _data = {}

  set (k, v) {
    this._data[k] = v
  }

  get (k) {
    return this._data[k]
  }
}

let cache = new Cache()

// Access BoxCast API with proper caching and memoization
export default {
  getAccountChannelId: function () {
    return Config.channelId
  },
  getAccount: function () {
    let k = `account:${Config.accountId}`
    if (cache.get(k)) { return Promise.resolve(cache.get(k)) }
    return boxcast.utils.fetch(`${API_ROOT}/accounts`)
      .then(parseJson)
      .then((a) => {
        cache.set(k, a)
        return a
      })
  },
  getChannels: function () {
    let k = `channels:${Config.accountId}`
    if (cache.get(k)) { return Promise.resolve(cache.get(k)) }
    return boxcast.utils.fetch(`${API_ROOT}/accounts/${Config.accountId}/channels`)
      .then(parseJson)
      .then((channels) => {
        if (Config.channelFilter) {
          return channels.filter(Config.channelFilter)
        } else {
          return channels
        }
      })
      .then((channels) => {
        cache.set(k, channels)
        return channels
      })
  },
  getChannelById: function (channelId) {
    let k = `channel:${channelId}`
    if (cache.get(k)) { return Promise.resolve(cache.get(k)) }
    return boxcast.utils.fetch(`${API_ROOT}/channels/${channelId}`)
      .then(parseJson)
      .then((a) => {
        cache.set(k, a)
        return a
      })
  },
  getChannelBroadcasts: function (channelId, args) {
    // No caching here, keep it fresh, but do handle pagination
    let pagination = {}
    let qs = args ? `?${boxcast.utils.Util.qsFromObj(args)}` : ''
    return boxcast.utils.fetch(`${API_ROOT}/channels/${channelId}/broadcasts${qs}`)
      .then((r) => {
        pagination = JSON.parse(r.headers.get('X-Pagination'))
        return r
      })
      .then(parseJson)
      .then((broadcasts) => {
        return { broadcasts, pagination }
      })
  },
  getChannelHighlights: function (channelId, args) {
    // No caching here, keep it fresh, but do handle pagination
    let pagination = {}
    let qs = args ? `?${boxcast.utils.Util.qsFromObj(args)}` : ''
    return boxcast.utils.fetch(`${API_ROOT}/channels/${channelId}/highlights${qs}`)
      .then((r) => {
        pagination = JSON.parse(r.headers.get('X-Pagination'))
        return r
      })
      .then(parseJson)
      .then((highlights) => {
        return { highlights, pagination }
      })
  },
  utils: {
    // Parse start/stop to determine current/future/recently-ended/past
    timeframe: (broadcast) => boxcast.utils.broadcast.timeframe(broadcast),
    // h:mm:ss formatted duration
    formatDuration: (broadcast) => boxcast.utils.broadcast.duration(broadcast),
    // Pretty string, e.g. 10 minutes ago
    formatRelative: (dateString, prefix = '', suffix = '') => {
      let str = boxcast.utils.Clock.formatRelative(new Date(dateString))
      if (str.indexOf('/') > -1) {
        return str
      } else {
        return `${prefix} ${str} ${suffix}`.trim()
      }
    }
  }
}
