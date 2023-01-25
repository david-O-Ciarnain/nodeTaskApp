//User errors

export const inValidUserInput = (error) => {
  console.log(error);

  let message = ""
  if (error.hasOwnProperty("keyValue"))
    return `Email already exists: ${ error["keyValue"]["email"]}`;
    
  if (error["errors"].hasOwnProperty("password"))
    message += error["errors"]["password"].message + " ";
  else if (error["errors"].hasOwnProperty("name"))
    message += error["errors"]["name"].message;
  
  return message
};

export const inValidUpdateInput = (body = {}, allowedUpdates = []) =>
  Object.keys(body).every((allowed) => allowedUpdates.includes(allowed));



//Task Errors

export const inValidTaskInput = (error) =>
  error["errors"]["description"].message;
