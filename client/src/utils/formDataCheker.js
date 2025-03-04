export const formDataCheker = (email, username, password) => {
  // Check the email
  if (email.length < 8) {
    throw new Error("Email must be at least 8 characters");
  }
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }

  // Check the username
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }

  // Chek the password
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }
};
