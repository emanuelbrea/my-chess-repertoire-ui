const createRepertoire = async (accessToken, color) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      color: color,
    }),
  };
  await fetch(process.env.REACT_APP_HOST + '/repertoire', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error creating the repertoire.');
        }
        return res.json();
      });
};

const getRepertoireInfo = async (jwt) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };

  const info = await fetch(process.env.REACT_APP_HOST + '/repertoire/info', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error fetching repertoire data.');
        }
        return res.json();
      });

  return info;
};

const getRepertoireMoves = async (jwt, fen, color) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };
  const moves = await fetch(process.env.REACT_APP_HOST + '/repertoire?' + new URLSearchParams({
    fen: fen,
    color: color,
  }), requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error fetching repertoire data.');
        }
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        throw new Error('There was an error displaying the website.');
      });
  return moves;
};

const updateMove = async (jwt, move, fen, color) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };
  const moves = await fetch(process.env.REACT_APP_HOST + '/repertoire?' + new URLSearchParams({
    fen: fen,
    color: color,
    move: move,
  }), requestOptions)
      .then((res) => res.json());
  return moves;
};

const addMoves = async (jwt, fen, color) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Content-Type': 'application/json',
    },
  };
  const moves = await fetch(process.env.REACT_APP_HOST + '/repertoire?' + new URLSearchParams({
    fen: fen,
    color: color,
  }), requestOptions)
      .then((res) => res.json());
  return moves;
};

const deleteRepertoire = async (accessToken, color) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      color: color,
    }),
  };
  await fetch(process.env.REACT_APP_HOST + '/repertoire', requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('There was an error deleting the repertoire.');
        }
        return res.json();
      });
};

export {createRepertoire, getRepertoireInfo, getRepertoireMoves, updateMove, addMoves, deleteRepertoire};
