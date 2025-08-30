
import { obtenerGini } from "./services/worldBank.mjs";

const test = async () => {
  const giniArg = await obtenerGini("ARG");
  console.log("GINI Argentina:", giniArg);
};

test();
