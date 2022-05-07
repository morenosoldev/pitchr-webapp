const axios = require('axios');
const qs = require('query-string');

// Constand
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile ='https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))'
const urlToGetUserEmail = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';

const getProfile = async(req,res) => {
  const user = {};
  const { code } = req.params;
  const accessToken = await getAccessToken(code);
  const userProfile = await getUserProfile(accessToken);
  const userEmail = await getUserEmail(accessToken);
  let resStatus = 400;
  if(!(accessToken === null || userProfile === null || userEmail === null)) {
    user = await userBuilder(userProfile, userEmail);
    resStatus = 200;
  }
  // Here, you can implement your own login logic 
  // to authenticate new user or register him
  res.status(resStatus).json({ user });
}


/**
 * Get access token from LinkedIn
 * @param code returned from step 1
 * @returns accessToken if successful or null if request fails 
 */
async function getAccessToken(code) {
  const config = {
    headers: { "Content-Type": 'application/x-www-form-urlencoded' }
  };
  const parameters = {
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": 'http://localhost:3000/linkedin',
    "client_id": '78cibhtx1urz7y',
    "client_secret": '8Syddg9Sp83fHLzC',
  };

    try {
      const res = await axios.post(
      urlToGetLinkedInAccessToken,
      qs.stringify(parameters),
      config);
      return res.data.access_token
    } catch (error) {
        console.log(error);
        console.log("Error getting LinkedIn access token");
    }
}

/**
 * Get user first and last name and profile image URL
 * @param accessToken returned from step 2
 */
function getUserProfile(accessToken) {
    console.log("får token med", accessToken);
  let userProfile = {"firstName": '', "lastName": '', "profileImageURL": ''}
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }
  axios
    .get(urlToGetUserProfile, config)
    .then(response => {
      userProfile.firstName = response.data.localizedFirstName;
      userProfile.lastName = response.data.localizedLastName
      userProfile.id = response.data.id;
      // I mean, couldn't they have burried it any deeper?
    })
    .catch(error => console.log(error))
  return userProfile;
}


/**
 * Get user email
 * @param accessToken returned from step 2
 */
function getUserEmail(accessToken) {
  const email = null;
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  };
  axios
    .get(urlToGetUserEmail, config)
    .then(response => {
      console.log("HER",response);
      email = response.data.elements[0]["handle~"];
    })
    .catch(error => console.log(error));

  return email;
}

/**
 * Build User object
 */
function userBuilder(userProfile, userEmail) {
  return {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profileImageURL: userProfile.profileImageURL,
    email: userEmail
  }
}


module.exports = {getProfile}