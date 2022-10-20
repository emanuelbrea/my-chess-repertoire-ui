const getCurrentUser = async (jwt) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };
  const user = await fetch(process.env.REACT_APP_HOST + '/user', requestOptions)
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
  await fetch(process.env.REACT_APP_HOST + '/user', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error updating user data.');
        }
        return res.json();
      });
};

const addFavoriteMove = async (jwt, fen, move) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fen: fen,
      move: move,
    }),
  };
  await fetch(process.env.REACT_APP_HOST + '/user/favorite', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error updating user data.');
        }
        return res.json();
      });
};

const addNewContact = async (email, name, message, rating) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      message: message,
      rating: rating,
    }),
  };
  await fetch(process.env.REACT_APP_HOST + '/user/message', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error storing the message.');
        }
        return res.json();
      });
};


export {getCurrentUser, updateUser, addFavoriteMove, addNewContact};
