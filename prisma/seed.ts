import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getJokes().map((joke) => {
      return db.joke.create({ data: joke });
    })
  );
}

seed();

function getJokes() {
  return [
    {
      clown: "Jin",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      clown: "Sammie",
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      clown: "Jin",
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      clown: "Sammie",
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      clown: "Jin",
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      clown: "Sammie",
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      clown: "Jin",
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}
