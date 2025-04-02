import bcrypt from "bcrypt";

// just for hashing the password 
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};


// comparing the plain password jo vapis likha usko hash karke phichla wala plain ka hased jo tha 

/* 
      Input: Takes two parameters:
password: The plain text password entered by the user (during login).
hashedPassword: The previously hashed password stored in the database.
Comparison: The bcrypt.compare() method:
Hashes the input password internally with the same salt used earlier.
Compares the result with hashedPassword.
Returns:
true if the password matches.
false if it doesn't match.

*/
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
