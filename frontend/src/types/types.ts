export type User = {
  // Defaults
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Fields
  firebaseId: string;
  email: string;
};

export type File = {
  // Defaults
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Fields
  fileKey: string;
  bucket: string;
  location: string;
};
