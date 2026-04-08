import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const watcher = chokidar.watch([
  './css',
  './gulpfile.js',
  'package*.json',
], {
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: true,
});

console.log('Watching Gulp stuff for changes...');

watcher.on('change', async (path) => {
  console.log(`File changed: ${path}`);

  try {
    await execAsync('npm -s run gulp');
    // console.log('Gulp task completed successfully');
  } catch (error) {
    console.error('Error running gulp task:', error.message);
  }
});

watcher.on('error', (error) => {
  console.error('Watcher error:', error);
});

process.on('SIGINT', () => {
  console.log('\nStopping watcher...');
  watcher.close();
  process.exit(0);
});
