const message = {
  commonMsg: {
    somethingWentWrong: 'Something went wromg!!',
    apiReqNotFound: 'API Request not found!',
  },
  jwtToken: {
    inValidToken: 'Unauthorized token',
    tokenRequired: 'Token is required',
    sessionExpire: 'Session is expire.',
  },
  database: {
    connectionSuccess: 'Database connected successfully',
  },
  auth: {
    emailAlreadyExits: 'Email already exist',
    registerSuccess: 'Rregistered successfully.',
    verifyEmail: 'Please verify your email',
    loginSuccess: 'Login successful',
    incorrectEmail: 'Email not found',
    incorrectPassword: 'Password is incorrect',
  },
  user: {
    accessDenaied: 'Access denied',
    adminAlreadyExits: 'Admin user already exist.',
    userGetSuccess: 'Data get successfully.',
    adminCreateSuccess: 'Admin User created successfully.',
    userUpdated: 'User updated successfully.',
    userStatusChanges: 'User status changed successfully.',
    profileImageUpdated: 'Profile Image updated successfully.',
    notFound: 'User not found',
  },
  file: {
    fileTypeInvalid: 'File type is invalid, file format should be PNG,JPG,JPEG',
    fileTooBig: 'File is too big, file must be less then 5MB ',
    fileUploadfailed: 'File upload failed',
  },
};

module.exports = message;
