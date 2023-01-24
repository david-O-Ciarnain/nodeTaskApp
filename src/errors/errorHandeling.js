//User errors

export const inValidUserInput = (error) => {
  if (error["errors"].hasOwnProperty("password"))
    return error["errors"]["password"].message;
  else if (error["errors"].hasOwnProperty("name"))
    return error["errors"]["name"].message;
  else if (error["errors"].hasOwnProperty("email"))
    return error["errors"]["email"].message;
};

export const inValidUpdateInput = (body = {}, allowedUpdates = []) =>
  Object.keys(body).every((allowed) => allowedUpdates.includes(allowed));

export const inValidPatchInput = (error) => {
  if (error["keyValue"].hasOwnProperty("email")) return "Email Already Taken";
  else if (error["errors"].hasOwnProperty("password"))
    return error["errors"]["password"].message;
  else if (error["errors"].hasOwnProperty("name"))
    return error["errors"]["name"].message;
};

//Task Errors

export const inValidTaskInput = (error) =>
  error["errors"]["description"].message;
