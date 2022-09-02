import {Auth} from 'aws-amplify';


export default async function getCurrentJwt() {
  const session = await Auth.currentSession();
  const idToken = session.getIdToken();
  const jwt = idToken.getJwtToken();
  return jwt;
}
