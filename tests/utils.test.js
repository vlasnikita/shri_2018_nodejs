import { spawn } from 'child_process';
import moment from 'moment';
import { getBranches, getCommits, getFiles, getFile } from '../src/utils.js';

test('проверка наличия ветки master', async () => {
  const branches = await getBranches();
  expect(branches).toContain('master');
});

test('проверка структуры коммита', async () => {
  const commits = await getCommits('master');
  expect(Object.keys(commits[0])).toEqual(expect.arrayContaining(['hash', 'author', 'date']));
});