const app = require("./app");
const PORT = 4001;
const localURL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`Server is running at ${localURL}`);
});
