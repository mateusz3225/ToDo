export function saveProjectsToLocalStorage(ProjectStorage) {
    localStorage.setItem('projects', JSON.stringify(ProjectStorage));
}

export function getProjectsFromLocalStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}
