export const inValidUserInput = (error) => {
  if (error["errors"].hasOwnProperty("password"))
    return error["errors"]["password"].message;
  else if (error["errors"].hasOwnProperty("name"))
    return error["errors"]["name"].message;
  else if (error["errors"].hasOwnProperty("email"))
    return error["errors"]["email"].message;
};
