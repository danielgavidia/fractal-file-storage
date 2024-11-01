export type User = {
  // Defaults
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Fields
  firebaseId: String;
  email: String;
};

export type File = {
  // Defaults
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Fields
  fileKey: String;
  bucket: String;
  location: String;
};
