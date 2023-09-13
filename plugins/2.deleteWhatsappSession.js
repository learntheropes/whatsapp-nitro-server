
import { promises as fs } from 'fs';

const removeFolderAndContents = async folderPath => {
  try {
    // Read the contents of the folder
    const files = await fs.readdir(folderPath);

    // Iterate through the files and subdirectories
    for (const file of files) {
      const filePath = `${folderPath}/${file}`;
      
      // Check if the item is a file or a subdirectory
      const stat = await fs.lstat(filePath);

      if (stat.isFile()) {
        // If it's a file, unlink (delete) it
        await fs.unlink(filePath);
      } else if (stat.isDirectory()) {
        // If it's a directory, recursively remove it
        await removeFolderAndContents(filePath);
      }
    }

    // After all contents are removed, remove the folder itself
    await fs.rmdir(folderPath);
  } catch (err) {
    console.error(`Error while removing folder '${folderPath}': ${err.message}`);
  }
}
export default defineNitroPlugin((nitro) => {

  nitro.hooks.hook("close", async () => {

    await removeFolderAndContents('.wwebjs_cache');
    await removeFolderAndContents('.wwebjs_auth');
    await removeFolderAndContents('temp');
  });
})