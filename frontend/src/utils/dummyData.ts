import { File } from "@/types/types";

export const dummyFiles: File[] = [
  {
    id: "1",
    createdAt: new Date("2024-03-20T10:30:00Z"),
    updatedAt: new Date("2024-03-20T10:30:00Z"),
    userId: "user123",
    fileKey: "document.pdf",
    bucket: "my-bucket",
    location: "https://example.com/files/document.pdf",
  },
  {
    id: "2",
    createdAt: new Date("2024-03-19T15:45:00Z"),
    updatedAt: new Date("2024-03-19T15:45:00Z"),
    userId: "user123",
    fileKey: "image.jpg",
    bucket: "my-bucket",
    location: "https://example.com/files/image.jpg",
  },
  {
    id: "3",
    createdAt: new Date("2024-03-18T09:15:00Z"),
    updatedAt: new Date("2024-03-18T09:15:00Z"),
    userId: "user123",
    fileKey: "spreadsheet.xlsx",
    bucket: "my-bucket",
    location: "https://example.com/files/spreadsheet.xlsx",
  },
];
