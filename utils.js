import fs from 'fs';
import { spawn } from 'child_process';

export async function getBranches() {
	try {
		const branches = await runGitCommand(['branch', '--list']);
		return branches.split('\n').filter(b => !!b).map(b => b.replace('* ', ''));
	} catch(e) {
		console.log(e);
	}
}

export async function getCommits(branch) {
	try {
		const commits = await runGitCommand(['log', '--oneline', branch]);
		return commits.split('\n').filter(c => !!c);
	} catch(e) {
		console.log(e);
	}
}

const runGitCommand = command => (
  new Promise((resolve, reject) => {
    const git = spawn('git', command);
    const stdOut = [];
    const stdErr = [];

    git.stdout.on('data', data => {
      stdOut.push(data.toString());
    });

    git.stderr.on('data', data => {
      stdErr.push(data.toString());
    });

    git.on('close', code => {
      if (code !== 0) {
        reject(stdErr.join(''));
        return;
      }
      resolve(stdOut.join(''));
    });
  })
); 