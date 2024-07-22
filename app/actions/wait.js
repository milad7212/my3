export async function wait(milisecound = 1000) {
  await new Promise((resolve) => setTimeout(resolve, milisecound));
  return;
}
