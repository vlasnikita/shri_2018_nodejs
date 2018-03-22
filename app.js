import express from 'express';
import { getBranches, getCommits } from './utils.js';

const app = express();

app.set('view engine', 'hbs');
app.get('/', async (req, res) => {
	const branches = await getBranches();
	console.log(typeof branches === 'string')
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

app.listen(3000);