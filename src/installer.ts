import path from 'path';
import { execSync } from 'child_process';

export function installRepo(repoUrl: string, projectName: string) {
	const projectPath = path.join(path.resolve(__dirname, ''), projectName);
	try {
		console.log(`Cloning into ${projectPath}`);

		execSync(`git clone ${repoUrl} ${projectName}`, {
			stdio: [0, 1, 2],
			cwd: path.resolve(__dirname, ''),
		});
		console.log(``);
		console.log(`Project cloned into : ${projectPath}`);
		console.log(`Navigate to : ${projectPath} and install dependencies.`);
		console.log(``);
	} catch (error) {
		console.log(`Error : ${error}`);
	}
}
