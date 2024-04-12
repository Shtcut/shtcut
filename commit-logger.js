const child = require('child_process');
const fs = require('fs');

const output = child.execSync('git log --format=%B%H----DELIMITER----').toString('utf-8');

const commitsArray = output
    .split('----DELIMITER----\n')
    .map((commit) => {
        const [message, sha] = commit.split('\n');
        return { sha, message };
    })
    .filter((commit) => Boolean(commit.sha));

const currentChangeLog = fs.readFileSync('./CHANGELOG.md', 'utf-8');
const currentVersion = Number(require('./package.json').version);
const newVersion = currentVersion + 1;
let newChangeLog = `# Version ${newVersion} (${new Date().toISOString().split('T')[0]})\n\n`;

const features = [];
const chores = [];

commitsArray.forEach((commit) => {
    if (commit.message.startsWith('feature: ')) {
        features.push(
            `* ${commit.message.replace('feature: ', '')} ([${commit.sha.substring(
                0,
                6,
            )}](https://github.com/Shtcut/shtcut/commit/${commit.sha}))\n`,
        );
    }
    if (commit.message.startsWith('chore: ')) {
        chores.push(
            `* ${commit.message.replace('chore: ', '')} ([${commit.sha.substring(
                0,
                6,
            )}](https://github.com/Shtcut/shtcut/commit/${commit.sha}))\n`,
        );
    }
});

if (features.length) {
    newChangeLog += `## Features\n`;
    features.forEach(feature => {
        newChangeLog += feature;
    });
    newChangeLog += '\n';
}

if (chores.length) {
    newChangeLog += `## Chores\n`;
    chores.forEach(chore => {
        newChangeLog += chore;
    });
    newChangeLog += '\n';
}

fs.writeFileSync("./CHANGELOG.md", `${newChangeLog}${currentChangeLog}`);