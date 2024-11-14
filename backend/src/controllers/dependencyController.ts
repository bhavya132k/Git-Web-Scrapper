import { Request, Response } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export const generateDependencyTree = async (req: Request, res: Response) => {
  const { repositoryUrl } = req.body;

  if (!repositoryUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  const tempRepoPath = path.join(__dirname, '../../temp-repo');

  try {
     // Delete the temp-repo directory if it exists
     if (fs.existsSync(tempRepoPath)) {
      await execAsync(`rm -rf ${tempRepoPath}`);
      console.log('Deleted existing temp-repo directory');
    }

    console.log(`Cloning repository from ${repositoryUrl} to ${tempRepoPath}`);
    // Clone the repository
    await execAsync(`git clone ${repositoryUrl} ${tempRepoPath}`);
    
    // Change directory to the cloned repository
    process.chdir(tempRepoPath);
    console.log(`Changed directory to ${tempRepoPath}`);

    // Log the contents of the package.json file
    const packageJsonPath = path.join(tempRepoPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
      console.log('package.json contents:', packageJson);
    } else {
      console.error('package.json file not found');
      throw new Error('package.json file not found');
    }

    // Install dependencies using yarn
    await execAsync('yarn install');
    console.log('Dependencies installed');

    // Get the dependency tree
    const { stdout } = await execAsync('yarn list --json');
    console.log('Dependency tree generated');

    // Parse the dependency tree
    const dependencyTree = JSON.parse(stdout);
    console.log(dependencyTree)
    // Format the dependency tree
    const formattedTree = formatDependencyTree(dependencyTree);

    // Change back to the original directory and remove the cloned repository
    process.chdir('..');
    await execAsync(`rm -rf ${tempRepoPath}`);
    console.log('Cleaned up temporary repository');

    res.json(formattedTree);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate dependency tree' });
  }
};

const formatDependencyTree = (tree: any) => {
  const formattedTree: any = { directDependencies: {} };

  const traverseDependencies = (dependencies: any, parent: any) => {
    if (!dependencies) {
      return;
    }

    for (const [name, info] of Object.entries(dependencies)) {
      if (!parent[name]) {
        parent[name] = { count: 0, version: (info as any).version };
      }
      parent[name].count += 1;

      if ((info as any).dependencies) {
        traverseDependencies((info as any).dependencies, parent);
      }
    }
  };

  traverseDependencies(tree.devDependencies, formattedTree.directDependencies);

  return formattedTree;
};