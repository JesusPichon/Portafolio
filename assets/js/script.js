const getProjects = async () => {
    try {
        let requestJSON = await fetch('projects.json');
        let response = await requestJSON.json();

        return response;
    } catch (error) {
        console.error("Error " + error);
    }
}

const showProjects = async () => {
    try {
        let projects = await getProjects();
        let projectHTML = '';

        projects.forEach(project => {
            const { url, repository, image, name, description } = project;

            projectHTML += `
                <div class="col-12 col-sm-4">
                    <div class="card m-2">
                        <img src="${image}" alt="imagen proyecto">
                        <div class="card-body">
                            <p class="text">${name}</p>
                            <p class="text">${description}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-around">
                            ${url ? `<a href="${url}" class="link-offset-2 link-underline link-underline-opacity-0">Ver</a>` : ''}
                            ${repository ? `<a href="${repository}" class="link-offset-2 link-underline link-underline-opacity-0">GitHub</a>` : ''}
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
