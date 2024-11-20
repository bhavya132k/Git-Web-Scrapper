import puppeteer, { Page } from "puppeteer";
import { Request, Response } from "express";

interface Dependency {
  name: string;
  version: string;
  url: string;
}



export const getDependencies = async (req: Request, res: Response) => {
  const { owner, repoName } = req.params; // Get repo owner and name from route params

  if (!owner || !repoName) {
    return res.status(400).json({ error: "Owner and repoName are required" });
  }

  const BASE_URL = `https://github.com/${owner}/${repoName}/network/dependencies`;

  try {
    const all_dependencies = await scrapeDependencies(BASE_URL);
    // remove duplicates from dependencies
    const dependencies = removeDuplicates(all_dependencies);
    res.json({
      totalCount: dependencies.length,
      dependencies: dependencies,
    });
  } catch (error) {
    console.error("Error scraping dependencies:", error);
    res.status(500).json({ error: "Failed to scrape dependencies" });
  }
};

async function scrapeDependencies(BASE_URL: string): Promise<Dependency[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(BASE_URL, { waitUntil: "networkidle2" });

  let allDependencies: Dependency[] = [];
  let hasNextPage: boolean = true;

  while (hasNextPage) {
    const dependencies = await getDependenciesFromPage(page);
    allDependencies = allDependencies.concat(dependencies);

    hasNextPage = await checkForNextPage(page);

    if (hasNextPage) {
      await goToNextPage(page);
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }
  }

  await browser.close();
  return allDependencies;
}

// Function to extract dependency name, version, and href from a single page
async function getDependenciesFromPage(page: Page): Promise<Dependency[]> {
  return page.evaluate(() => {
    const dependencies: Dependency[] = [];

    const listItems = document.querySelectorAll(
      'li[data-view-component="true"].Box-row'
    );

    listItems.forEach((item) => {
      const nameElement = item.querySelector("a.h4.Link--primary.Link");
      const versionElement = item.querySelector(
        "span.ml-2.color-fg-muted.text-mono.text-small"
      );

      if (nameElement && versionElement) {
        const name = nameElement.textContent?.trim() || "N/A";
        const version = versionElement.textContent?.trim() || "N/A";
        const href = nameElement.getAttribute("href");

        if (href) {
          dependencies.push({
            name,
            version,
            url: `https://github.com${href}`,
          });
        }
      }
    });
    console.log("Dependencies:", dependencies);

    return dependencies;
  });
}

async function checkForNextPage(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const nextPageButton = document.querySelector(".next_page");

    return nextPageButton
      ? !nextPageButton.classList.contains("disabled")
      : false;
  });
}

async function goToNextPage(page: Page): Promise<void> {
  await page.click(".next_page");

  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
}


function removeDuplicates(dependencies: Dependency[]): Dependency[] {
  return dependencies.filter((dep, index, self) => {
    const firstIndex = self.findIndex((d) => d.name === dep.name);
    return firstIndex === index;
  });
}