import { z } from "zod";

const UUID = () =>
    z.uuid("Invalid UUID format. Expected a valid UUID string.");

const SKU = () =>
    z
        .string()
        .min(1, "SKU cannot be empty.")
        .max(50, "SKU cannot exceed 50 characters.");

const PHONE = () =>
    z
        .string()
        .regex(/^\+\d{2}-\d{10}$/, "Invalid phone format. Use +xx-xxxxxxxxxx");

const PERCENT = () =>
    z
        .number()
        .min(0, "Percentage cannot be below 0%.")
        .max(100, "Percentage cannot exceed 100%.");

const EMAIL = () =>
    z
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format. Use a valid address like name@example.com");

const PINCODE = () =>
    z
        .string()
        .regex(/^[1-9][0-9]{5}$/, "Invalid PIN code. Must be a 6-digit Indian PIN (e.g., 226001).");
const CITY = () =>
    z
        .string()
        .min(1, "City name cannot be empty.")
        .max(50, "City name cannot exceed 50 characters.");

const ADDRESS = () =>
  z
    .string()
    .trim()
    .min(1, "Address cannot be empty.")
    .max(200, "Address cannot exceed 200 characters.")
    .regex(
      /^[A-Za-z0-9,\-\s\n\r]+$/,
      "Address may contain only letters, numbers, spaces, commas, hyphens, and line breaks."
    )

const BASEACTIVESTATUS = () =>
  z
    .enum(["active", "inactive"], "Invalid status. Must be either 'active' or 'inactive'.")

const ADMINACTIVESTATUS = () =>
  z
    .enum(["active", "inactive", "blocked"], "Invalid status. Must be either 'active', 'inactive', or 'blocked'.")


export { UUID, SKU, PHONE, PERCENT, EMAIL, PINCODE, CITY, ADDRESS, BASEACTIVESTATUS, ADMINACTIVESTATUS};
