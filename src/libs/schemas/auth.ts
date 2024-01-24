import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";


const authSchema=z.object({

    image:z.string({
        invalid_type_error:"image must be a string",
        required_error:"images is required"
    }),
    name:z.string().min(3),
    
})


// const userSchema = Joi.object({
//     image: Joi.string(),
//     name: Joi.string().min(3),
//     surname: Joi.string().min(3),
//     email: Joi.string().email().required(),
//     phone: Joi.number().min(8),
//     country: Joi.string(),
//     province: Joi.string().min(4),
//     password: Joi.string().required().min(6).max(30),
//     birthday: Joi.string().min(3),
//   });