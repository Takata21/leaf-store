// authors.ts
import { Hono } from "https://deno.land/x/hono@v4.0.0-rc.2/mod.ts"

 const app = new Hono()

app.post('/login', (c) => {


    return c.json('list authors')
})
app.post('/register', (c) => {
    try {
    } catch (error) {
        
    }
    return c.json('hey')
})
app.post('/profile', (c) => c.json('create an author', 201))
app.post('/verify', (c) => c.json('create an author', 201))
// app.post('/verify', (c) => c.json('create an author', 201))

export default app





// router.post('/auth/login', login);

// router.post('/auth/register', register);

// router.post('/auth/register/admin', verifyToken, verifyAdmin, addAdmin);

// router.get('/auth/profile', verifyToken, profile);
// router.get('/auth/verify', verifyUser);
// router.get('/auth/get-all-users', verifyToken, verifyAdmin, getAllUsers);

