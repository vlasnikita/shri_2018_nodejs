import { spawn } from 'child_process';
import moment from 'moment';

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
		const commitsData = await runGitCommand(['log', branch]);
    const commitsArray = commitsData.split('commit ')
      .filter(c => !!c)
      .map(c => c.split('\n').filter(c => !!c));

    const commits = commitsArray.map(c => ({
      hash: c[0],
      author: c[1].split(' ')[1],
      date: moment(c[2]).format('H:mm, DD.MM.YYYY')
    }));
    
    return commits;
	} catch(e) {
		console.log(e);
	}
}

export async function getFiles(object) {
  try {
    const files = await runGitCommand(['ls-tree', '-r', object]);
    return files.split('\n').filter(f => !!f).map(f => {
      const fileArray = f.split(/\s/);
      return {
        hash: fileArray[2],
        name: fileArray[fileArray.length - 1]
      }
    });
  } catch(e) {
    console.log(e);
  }
}

export async function getFile(hash) {
  try {
    const file = await runGitCommand(['show', hash]);
    return file;
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