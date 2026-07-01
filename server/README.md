# MongoDB + Mongoose — step by step

One file (`mongoose.js`), run with **Bun**. Work through it **one step at a time** — comment/uncomment the step at the bottom of the file.

## Setup

```bash
cd server
bun install
cp .env.example .env   # only if you need Atlas or a custom URI
bun run demo
```

## How to use the file

Open `mongoose.js`. At the bottom you'll see:

```js
await step1_connect();
// await step2_insertUser();
// ...
```

Only **one** `await stepN()` should be uncommented. Run `bun run demo`, read the console output, then move to the next step.

| Step | What you learn |
| ---- | -------------- |
| 1 | Connect + disconnect (see "Connected" / "Disconnected" logs) |
| 2 | User schema + insert a document |
| 3 | Read all users (`User.find()`) |
| 4 | Update a user |
| 5 | Delete a user |
| 6 | Course schema + insert a course |
| 7 | Update a course |
| 8 | Delete a course |

Check your data anytime in [MongoDB Compass](https://www.mongodb.com/products/compass) using the same URI from `.env` or the default in the file.

## Next step

Add an Express API on top of these models, then call it from React.
