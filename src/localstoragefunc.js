export function saveProjectsToLocalStorage(ProjectName,ProjectStorage) {
    const findProject = Object.keys(ProjectStorage).find(key => key === ProjectName);
    console.log(findProject);

    if (findProject) {
        localStorage.setItem(JSON.stringify(ProjectName), JSON.stringify(ProjectStorage[findProject]));
    }
}

