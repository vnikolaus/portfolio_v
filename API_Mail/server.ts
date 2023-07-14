import { app } from "./app"

app.listen(process.env.PORT, () => {
    console.log(`API is running...`);
    console.log(`http://localhost:${process.env.PORT}`);
})