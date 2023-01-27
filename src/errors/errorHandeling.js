//User errors

export const inValidUserInput = (error) => {
  if (error.hasOwnProperty("keyValue"))
    return `Email already exists: ${error["keyValue"]["email"]}`;

  if (error.hasOwnProperty("errors")) {
    if (error["errors"].hasOwnProperty("password"))
      return error["errors"]["password"].message + " ";
    else if (error["errors"].hasOwnProperty("name"))
      return error["errors"]["name"].message;
  }
};

export const inValidUpdateInput = (body = {}, allowedUpdates = []) =>
  Object.keys(body).every((allowed) => allowedUpdates.includes(allowed));

//Task Errors

export const inValidTaskInput = (error) =>
  error["errors"]["description"].message;
