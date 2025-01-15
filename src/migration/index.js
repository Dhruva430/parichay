import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";
import db from "../db.js";

const cwd = path.join(import.meta.dirname);

async function readData() {
  const buffer = await fs.readFile(path.join(cwd, "data.json"));
  return JSON.parse(buffer);
}
async function saveData(data) {
  await fs.writeFile(path.join(cwd, "data.json"), JSON.stringify(data));
}

program.command("create").action(async (args) => {
  const filter = (v) => v.split(/\s+/).join("-").toLowerCase();
  const { name } = await inquirer.prompt([
    {
      name: "name",
      message: "What is name of migration?",
      filter,
      transformer: filter,
    },
  ]);

  // 1__name
  // {id: 1, done: false}
  const data = await readData();
  const id = data.length + 1;
  data.push({ id, done: false, name });
  await fs.writeFile(
    path.join(cwd, `${id}__${name}.sql`),
    `-- Start your sql below`
  );
  await saveData(data);
});

program.command("migrate").action(async () => {
  /**
   *  @type {{id: number, name: string, done: boolean}[]}
   */
  const data = await readData();
  data.sort((a, b) => a.id - b.id);

  const client = await db.connect();
  await client.query("BEGIN");
  try {
    for (var i = 0; i < data.length; i++) {
      const row = data[i];
      if (row.done) {
        continue;
      }
      try {
        const queries = await fs.readFile(
          path.join(cwd, `${row.id}__${row.name}.sql`)
        );

        const result = await client.query(queries.toString());
        console.log(result.rows);
      } catch (e) {
        console.log(`${row.id}__${row.name}.sql errorer out`);
        throw e;
      }
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    await db.end();
  }

  data.forEach((row) => (row.done = true));
  await saveData(data);
});

program.parse();
