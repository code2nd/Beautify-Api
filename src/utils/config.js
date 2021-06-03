const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = '383ac64a98fca7cdd347'
const baseUrl = process.env.NODE_ENV === 'development' ? `/v1` : `/api/v1`;

const Config = {
  baseUrl,
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
  expires: 60*60*24*365, // 缓存有效期1年
}


export default Config