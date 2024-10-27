import {z} from "zod";

const signupSchema = z.object({
    firstName: z.string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be 50 characters or less" })
    .regex(/^[A-Za-z]+$/, { message: "First name can only contain alphabetic characters" }),
    
    lastName: z.string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be 50 characters or less" })
    .regex(/^[A-Za-z]+$/, { message: "Last name can only contain alphabetic characters" }),

    email: z.string().email({ message: "Invalid email address" }),
    
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@, $, !, %, *, ?, &)" })
  });


export {signupSchema};