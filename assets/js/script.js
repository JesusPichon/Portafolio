//get projects at server
const getProjects = async () => {
    try {
        const url = "https://objectstorage.sa-santiago-1.oraclecloud.com/n/axtvtikkef9i/b/bucket-projects/o/portafolio-projects.json"
        let requestJSON = await fetch(url);
        let response = await requestJSON.json();

        return response;
    } catch (error) {
        console.error("Error " + error);
    }
}

//show each project as card
const showProjects = async () => {
    try {
        let projects = await getProjects();
        let projectHTML = '';

        projects.forEach(project => {
            const { url, repository, image, name, description, tools } = project;
            let toolsHTML = '';

            if (tools) {
                tools.forEach(tool => {
                    toolsHTML+=`<span class="badge rounded-pill text-bg-${tool.color} m-1">${tool.name}</span>`;
                });
            }

            projectHTML += `
                <div class="col-12 col-sm-4">
                    <div class="card shadow-sm m-2">
                        <img src="${image}" alt="imagen proyecto">
                        <div class="card-body">
                            <p class="h5 fw-bold">${name}</p>
                            <p class="text">${description}</p>
                            <div class="d-flex">
                                ${toolsHTML}
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            ${url ? `<a href="${url}" class="link-offset-2 link-underline link-underline-opacity-0">Ver proyecto</a>` : ''}
                            ${repository ? `<a href="${repository}" class="link-offset-2 link-underline link-underline-opacity-0">Repositorio</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        // Append all projects to the DOM at once
        $('#projects').append(projectHTML);
    } catch (error) {
        console.error('Error fetching projects:', error);
        $('#projects').append('<p>Could not load projects. Please try again later.</p>');
    }
};


$(document).ready(function () {
    showProjects();
});
