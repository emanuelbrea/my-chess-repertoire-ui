const createUser = async (email, firstName, lastName) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
    }),
  };
  const userCreated = await fetch('/api/user', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error creating the account. Please try again later.');
        }
        return res.json();
      } );
  return userCreated;
};


const getCurrentUser = async (jwt) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };
  const user = await fetch('/api/user', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error fetching user data.');
        }
        return res.json();
      });
  return user;
};

const updateUser = async (jwt, user, style) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      playing_since: user.playing_since,
      popularity: style.popularity,
      fashion: style.fashion,
      risk: style.risk,
      rating: style.rating,
    }),
  };
  await fetch('/api/user', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error updating user data.');
        }
        return res.json();
      });
};


export {createUser, getCurrentUser, updateUser};
