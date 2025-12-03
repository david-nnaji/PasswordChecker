console.log("This is a sample JavaScript file.");

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupPasswordStrengthChecker();
  renderSectionsFromData();
});

function setupPasswordStrengthChecker() {
  const passwordInput = document.getElementById("passwordInput");
  const strengthMessage = document.getElementById("strengthMessage");

  if (!passwordInput || !strengthMessage) return;

  function getStrengthLabel(value) {
    if (!value) return "Strength:";

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) return "Strength: Weak";
    if (score === 3) return "Strength: Medium";
    if (score === 4) return "Strength: Strong";
    return "Strength: Very strong";
  }

  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    strengthMessage.textContent = getStrengthLabel(value);
  });
}

function renderSectionsFromData() {
  // pageContent comes from data/content.js
  if (!window.pageContent || !Array.isArray(pageContent.sections)) return;

  const main =
    document.querySelector("main.wrap.sections-grid") ||
    document.querySelector("main");

  if (!main) return;

  const paragraphTemplate = document.getElementById(
    "section-paragraph-template"
  );
  const listTemplate = document.getElementById("section-list-template");

  if (!paragraphTemplate || !listTemplate) return;

  // For each section in the data object, clone the right template and fill it
  pageContent.sections.forEach((sectionData) => {
    const template =
      sectionData.type === "list" ? listTemplate : paragraphTemplate;

    const fragment = template.content.cloneNode(true);
    const section = fragment.querySelector("section");

    // Basic section info
    section.id = sectionData.id;
    section.querySelector("h2").textContent = sectionData.title;

    // Image
    const img = section.querySelector("img");
    img.src = sectionData.image.src;
    img.alt = sectionData.image.alt;
    if (sectionData.image.className) {
      img.classList.add(sectionData.image.className);
    }

    // Paragraph or list content
    if (sectionData.type === "paragraph") {
      const p = section.querySelector("p");
      p.textContent = sectionData.text;
    } else if (sectionData.type === "list") {
      const ul = section.querySelector("ul");
      if (sectionData.listClass) {
        ul.classList.add(sectionData.listClass);
      }

      sectionData.items.forEach((itemText) => {
        const li = document.createElement("li");
        li.textContent = itemText;
        ul.appendChild(li);
      });
    }

    // Add finished section into <main>
    main.appendChild(fragment);
  });
}
