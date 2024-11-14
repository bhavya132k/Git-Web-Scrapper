// Define the SBOM structure in JavaScript
const sbom = {
    "sbom": {
        "spdxVersion": "SPDX-2.3",
        "dataLicense": "CC0-1.0",
        "SPDXID": "SPDXRef-DOCUMENT",
        "name": "com.github.canonical/sphinx-docs-starter-pack",
        "documentNamespace": "https://spdx.org/spdxdocs/protobom/bd363291-b3aa-478a-91b9-d2a76c20a3b0",
        "comment": "Exact versions could not be resolved for some packages. For more information: https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph#dependencies-included.",
        "creationInfo": {
            "creators": [
                "Tool: protobom-devel",
                "Tool: GitHub.com-Dependency-Graph"
            ],
            "created": "2024-11-14T04:37:53Z"
        },
        "packages": [
            {
                "name": "sphinx-autobuild",
                "SPDXID": "SPDXRef-pypi-sphinx-autobuild-7b26ed",
                "downloadLocation": "NOASSERTION",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:pypi/sphinx-autobuild"
                    }
                ]
            },
            {
                "name": "sphinxcontrib-svg2pdfconverter",
                "SPDXID": "SPDXRef-pypi-sphinxcontrib-svg2pdfconverter-d87ce5",
                "downloadLocation": "NOASSERTION",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:pypi/sphinxcontrib-svg2pdfconverter"
                    }
                ]
            },
            {
                "name": "canonical/documentation-workflows/.github/workflows/documentation-checks.yaml",
                "SPDXID": "SPDXRef-githubactions-canonicaldocumentation-workflows.githubworkflows-documentation-checks.yaml-main-41e328",
                "versionInfo": "main",
                "downloadLocation": "NOASSERTION",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:githubactions/canonical/documentation-workflows/.github/workflows/documentation-checks.yaml@main"
                    }
                ]
            },
            {
                "name": "actions/github-script",
                "SPDXID": "SPDXRef-githubactions-actions-github-script-7..-613322",
                "versionInfo": "7.*.*",
                "downloadLocation": "NOASSERTION",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:githubactions/actions/github-script@7.%2A.%2A"
                    }
                ]
            },
            {
                "name": "actions/checkout",
                "SPDXID": "SPDXRef-githubactions-actions-checkout-4..-c8865b",
                "versionInfo": "4.*.*",
                "downloadLocation": "NOASSERTION",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:githubactions/actions/checkout@4.%2A.%2A"
                    }
                ]
            },
            {
                "name": "com.github.canonical/sphinx-docs-starter-pack",
                "SPDXID": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "versionInfo": "main",
                "downloadLocation": "git+https://github.com/canonical/sphinx-docs-starter-pack",
                "filesAnalyzed": false,
                "externalRefs": [
                    {
                        "referenceCategory": "PACKAGE-MANAGER",
                        "referenceType": "purl",
                        "referenceLocator": "pkg:github/canonical/sphinx-docs-starter-pack@main"
                    }
                ]
            }
        ],
        "relationships": [
            {
                "spdxElementId": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relatedSpdxElement": "SPDXRef-pypi-sphinx-autobuild-7b26ed",
                "relationshipType": "DEPENDS_ON"
            },
            {
                "spdxElementId": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relatedSpdxElement": "SPDXRef-pypi-sphinxcontrib-svg2pdfconverter-d87ce5",
                "relationshipType": "DEPENDS_ON"
            },
            {
                "spdxElementId": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relatedSpdxElement": "SPDXRef-githubactions-canonicaldocumentation-workflows.githubworkflows-documentation-checks.yaml-main-41e328",
                "relationshipType": "DEPENDS_ON"
            },
            {
                "spdxElementId": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relatedSpdxElement": "SPDXRef-githubactions-actions-github-script-7..-613322",
                "relationshipType": "DEPENDS_ON"
            },
            {
                "spdxElementId": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relatedSpdxElement": "SPDXRef-githubactions-actions-checkout-4..-c8865b",
                "relationshipType": "DEPENDS_ON"
            },
            {
                "spdxElementId": "SPDXRef-DOCUMENT",
                "relatedSpdxElement": "SPDXRef-github-canonical-sphinx-docs-starter-pack-main-1fcc87",
                "relationshipType": "DESCRIBES"
            }
        ]
    }
}


// Generate the SBOM and create a dependency tree from the SBOM
// I want dependencyTree to be a tree structure that looks like this:
//  rootnode - sphinx-docs-starter-pack (5)
//      - sphinx-autobuild (0)
//      - sphinxcontrib-svg2pdfconverter (0)
//      - documentation-checks.yaml (0)
//      - actions-github-script (0)
//      - actions-checkout (0)
//



// I want to be able to access the tree structure like this:
// dependencyTree.rootnode.children[0].name
// dependencyTree.rootnode.children[0].children[0].name
// dependencyTree.rootnode.children[0].children[1].name
// dependencyTree.rootnode.children[0].children[2].name
// dependencyTree.rootnode.children[0].children[3].name
// dependencyTree.rootnode.children[0].children[4].name

// I want to create a function that will return the tree structure

function createDependencyTree(sbom) {
    let dependencyTree = {
        rootnode: {
            name: sbom.sbom.name,
            children: []
        }
    }

    sbom.sbom.packages.forEach((package) => {
        let childNode = {
            name: package.name,
            children: []
        }
        dependencyTree.rootnode.children.push(childNode)
    })

    return dependencyTree
}

let dependencyTree = createDependencyTree(sbom)