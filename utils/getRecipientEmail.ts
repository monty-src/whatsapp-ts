const getRecipientEmail = (users: any, userLoggedIn: any) => {
  return users?.filter((userToFilter: any) => userToFilter !== userLoggedIn?.email);
};

export default getRecipientEmail;