require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER, TEST_CLIENT_ID, TEST_CLIENT_SECRET, DEFAULT_SCOPE } = process.env

const test = async () => {
  const token = btoa(`0oa64oe0q6UzHfEnJ5d7:fAk_hmtFY1GJDLEOT0OV_KJ-oGMLIW3qmENcpk8A`)
  try {
    const { token_type, access_token } = await request({
      uri: `https://dev-19137776.okta.com/oauth2/aus64oa59qaMt00H45d7/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials',
        scope: 'such_scope',
      },
    })

    const response = await request({
      uri: 'http://localhost:8000',
      json: true,
      headers: {
        authorization: [token_type, access_token].join(' '),
      },
    })

    console.log(response)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

test()