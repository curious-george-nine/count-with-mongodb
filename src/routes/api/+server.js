import { count } from "$db/count";
import db from "$db/mongo";

const collection = db.collection("count");

async function update() {
  const data = await count
    .find(
      {},
      {
        projection: {
          _id: false,
        },
      }
    )
    .toArray();

  const zrpad = (n, u, x = "0") => n.toString().padStart(u, x);

  collection.updateOne(
    { name: "count" },
    {
      $set: {
        count: data[0].count + 1,
        date: `${zrpad(new Date().getFullYear(), 4)}/${zrpad(
          new Date().getMonth() + 1,
          2
        )}/${zrpad(new Date().getDate(), 2)} ${zrpad(
          new Date().getHours(),
          2
        )}:${zrpad(new Date().getMinutes(), 2)}:${zrpad(
          new Date().getSeconds(),
          2
        )}`,
      },
    }
  );
}

export async function POST() {
  await update();

  const data = await count
    .find(
      {},
      {
        projection: {
          _id: false,
        },
      }
    )
    .toArray();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET() {
  const data = await count
    .find(
      {},
      {
        projection: {
          _id: false,
        },
      }
    )
    .toArray();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
