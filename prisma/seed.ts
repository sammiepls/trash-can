import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const sammie = await db.clown.create({
    data: {
      name: "sammie",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getJokes().map((joke) => {
      const data = { clownId: sammie.id, ...joke };
      return db.joke.create({ data });
    })
  );
}

seed();

function getJokes() {
  return [
    {
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}
