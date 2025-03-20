function opdnHamburgerMenu() {
  const navBar = document.querySelector('.nav-bar');
  navBar.classList.add('active');
}

function closeHamburgerMenu() {
  const navBar = document.querySelector('.nav-bar');
  navBar.classList.remove('active');
}

// Run the code if the user is on 'education-skill.html' page
if (window.location.pathname === '/education-skills.html') {
  fetch('dynamic_blocks_skills.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('skills-container');
    
    // Iterate over each section in the JSON object
    for (const section in data) {
      // Create section wrapper
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('skills-section');

      // Create header for section
      const header = document.createElement('h3');
      header.textContent = section;
      sectionDiv.appendChild(header);

      // Create container for tiles
      const tilesDiv = document.createElement('div');
      tilesDiv.classList.add('tiles');

      // Iterate over the skills in the section
      data[section].forEach(skill => {
        // Create tile
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');

        // Create and append the icon
        const img = document.createElement('img');
        img.src = skill.icon || '../images/placeholder/question_cube.png';
        img.alt = skill.name;
        tileDiv.appendChild(img);

        // Create the tile content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('tile-content');

        // Skill name
        const nameHeading = document.createElement('h4');
        nameHeading.textContent = skill.name;
        contentDiv.appendChild(nameHeading);

        // Skill description
        const descriptionPara = document.createElement('p');
        descriptionPara.textContent = skill.description;
        contentDiv.appendChild(descriptionPara);

        // Append the content to the tile
        tileDiv.appendChild(contentDiv);
        tilesDiv.appendChild(tileDiv);
      });

      // Append the tiles container to the section and the section to the main container
      sectionDiv.appendChild(tilesDiv);
      container.appendChild(sectionDiv);
    }
  })
  .catch(error => {
    console.error('Error fetching skills data:', error);
  });
}