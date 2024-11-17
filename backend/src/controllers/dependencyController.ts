import { Request, Response } from 'express';
import axios from 'axios';
import { GITHUB_API_TOKEN } from '../config';

// Update Dependency interface
interface Dependency {
  name: string;
  version: string | null;
  downloadURL: string;
}

interface DependencyResponse {
  count: number;
  deps: Dependency[];
}

// Define types for SBOM structure
interface Package {
  name: string;
  SPDXID: string;
  versionInfo?: string;
  downloadLocation: string;
}

interface Relationship {
  spdxElementId: string;
  relatedSpdxElement: string;
  relationshipType: string;
}

interface SBOM {
  packages: Package[];
  relationships: Relationship[];
}

export const getDependencies = async (req: Request, res: Response) => {
  const { owner, reponame } = req.params;

  if (typeof owner !== 'string' || typeof reponame !== 'string') {
    return res.status(400).json({ error: 'Invalid owner or repo' });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${reponame}/dependency-graph/sbom`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        },
      }
    );

    const extractDependencies = (sbom: SBOM): DependencyResponse => {
      // Filter out the main package and get only dependencies
      const dependencies = sbom.packages
        .filter(pkg => pkg.SPDXID !== 'SPDXRef-DOCUMENT')
        .map(pkg => ({
          name: pkg.name,
          version: pkg.versionInfo || null,
          downloadURL: pkg.downloadLocation === 'NOASSERTION' 
            ? `https://www.npmjs.com/package/${pkg.name}` // fallback URL
            : pkg.downloadLocation
        }));

      return {
        count: dependencies.length,
        deps: dependencies
      };
    };

    try {
      const dependencyResponse = extractDependencies(response.data.sbom);
      res.json(dependencyResponse);
    } catch (parseError) {
      console.error('Error parsing SBOM:', parseError);
      res.status(500).json({ error: 'Invalid SBOM structure' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'System is offline or failed to fetch data. Please check your internet connection or GitHub API.',
    });
  }
};
