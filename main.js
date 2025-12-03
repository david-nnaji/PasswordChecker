console.log("This is a sample JavaScript file.");

// main.js

document.addEventListener("DOMContentLoaded", () => {
    setupPasswordStrengthChecker();
    renderSectionsFromData();
    setupPrivacyModal();   // added modal handler
});

/* password strength */
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

/* render data obj */
function renderSectionsFromData() {
    if (!window.pageContent || !Array.isArray(pageContent.sections)) return;

    const main =
        document.querySelector("main.wrap.sections-grid") ||
        document.querySelector("main");

    const paragraphTemplate = document.getElementById("section-paragraph-template");
    const listTemplate = document.getElementById("section-list-template");

    if (!main || !paragraphTemplate || !listTemplate) return;

    pageContent.sections.forEach((sectionData) => {
        const template = sectionData.type === "list"
            ? listTemplate
            : paragraphTemplate;

        const fragment = template.content.cloneNode(true);
        const section = fragment.querySelector("section");

        // Section base info
        section.id = sectionData.id;
        section.querySelector("h2").textContent = sectionData.title;

        // Image handling
        const img = section.querySelector("img");
        img.src = sectionData.image.src;
        img.alt = sectionData.image.alt;

        if (sectionData.image.className) {
            img.classList.add(sectionData.image.className);
        }

        // Paragraph / List
        if (sectionData.type === "paragraph") {
            section.querySelector("p").textContent = sectionData.text;
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

        // Add to DOM
        main.appendChild(fragment);
    });
}

/*modal info*/
function setupPrivacyModal() {
    const modal = document.getElementById("privacyModal");
    const btn = document.getElementById("privacyBtn");
    const closeBtn = document.querySelector(".modal .close");

    if (!modal || !btn || !closeBtn) return;

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });

   
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });


    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}
