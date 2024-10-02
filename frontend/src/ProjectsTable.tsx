// src/ProjectsTable.tsx
import React from 'react';
import './App.css';

const ProjectsTable: React.FC = () => {
  const sample_Projects = [
    { name: 'Project 1', date: 'Jul 9', author: 'NM' },
    { name: 'Project 2', date: 'Aug 9', author: 'KK' },
    // Add more mock data as needed
  ];

  return (
    <div className="app-container">
      <h1>Git Web Scrapper</h1>
      <div className="project-table">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Last Updated</th>
              <th>Created by</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {sample_Projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.date}</td>
                <td>{project.author}</td>
                <td>
                  <a href="#">More Details</a> | <a href="#">Dependency Graph</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;
