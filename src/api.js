

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

export default createUser;
