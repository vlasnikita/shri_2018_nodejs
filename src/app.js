import express from 'express';
import { getBranches, getCommits, getFiles, getFile } from './utils.js';

const app = express();

app.set('view engine', 'hbs');
app.get('/', async (req, res) => {
	const branches = await getBranches();
	res.render('main.hbs', {
		title: 'Main',
		branches: branches
	});
});

app.get('/:branch', async ({params: { branch }}, res) => { 
	const commits = await getCommits(branch);
	res.render('branch.hbs', {
		branch: branch,
		commits: commits
	});
});

app.get('/filetree/:object', async ({params: { object }}, res) => { 
	const files = await getFiles(object);
	res.render('fileTree.hbs', {
		object: object,
		files: files
	});
});

app.get('/file/:hash', async ({params: { hash }}, res) => { 
	const file = await getFile(hash);
	res.render('file.hbs', {
		hash: hash,
		file: file
	});
});

app.listen(3000);