/*eslint-disable*/
import Amplify from 'aws-amplify'

const region = process.env['AWS_REGION']
const userPoolId = process.env['COGNITO_USER_POOL_ID']
const identityPoolId = process.env['COGNITO_IDENTITY_POOL_ID']
const userPoolWebClientId = process.env['COGNITO_APP_CLIENT_ID']

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region,
    userPoolId,
    identityPoolId,
    userPoolWebClientId
  }
})
window.LOG_LEVEL = 'INFO'
