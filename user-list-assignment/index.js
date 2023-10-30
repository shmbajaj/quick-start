import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
const tableBody = document.querySelector("#data-table tbody");
const addUserButton = document.getElementById("addUserButton");
let users = [];

/**
 * id: string
 * name: string
 * email: string
 * profilePitcureURL: string
 */

async function getUsers() {
  return Array.from({ length: 5 }, () => {
    const id = generateUserId();
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name });
    const profilePitcureURL = faker.image.urlLoremFlickr({
      category: "people",
    });
    return {
      id,
      name,
      email,
      profilePitcureURL,
    };
  });
}

async function populateTable() {
  users = await getUsers();

  for (const user of users) {
    const row = document.createElement("tr");
    row.dataset.userId = user.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;

    const profilePictureCell = document.createElement("td");
    const profileImage = document.createElement("img");
    profileImage.src = user.profilePitcureURL;
    profileImage.width = 100;
    profileImage.height = 100;
    profilePictureCell.appendChild(profileImage);

    const actionsCell = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", function () {
      openUserModal(user);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      const userId = row.dataset.userId;
      console.log({ userId });
      const index = users.findIndex((user) => user.id === userId);

      // remove the user from records array
      if (index !== -1) {
        users.splice(index, 1);
      }

      tableBody.removeChild(row);
    });

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(profilePictureCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  }
}

function generateUserId() {
  return `USER-${faker.number.int({ min: 1000, max: 9999 })}`;
}

// Function to open the modal for updating user details
function openUserModal(user) {
  const modal = document.getElementById("userModal");
  const updateForm = document.getElementById("updateForm");
  const updateName = document.getElementById("updateName");
  const updateEmail = document.getElementById("updateEmail");
  const updateProfilePicture = document.getElementById("updateProfilePicture");
  const profilePicturePreview = document.getElementById(
    "profilePicturePreview"
  );
  const errorMessage = document.getElementById("error-message-1");

  updateName.value = user.name;
  updateEmail.value = user.email;
  updateProfilePicture.value = "";
  profilePicturePreview.src = user.profilePitcureURL;
  profilePicturePreview.style.display = user.profilePitcureURL
    ? "block"
    : "none";

  updateProfilePicture.addEventListener("change", function () {
    // Preview the selected image
    const file = updateProfilePicture.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicturePreview.src = e.target.result;
        profilePicturePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  updateForm.onsubmit = function (e) {
    e.preventDefault();

    user.name = updateName.value;
    user.email = updateEmail.value;
    if (profilePicturePreview.style.display === "block") {
      user.profilePictureURL = profilePicturePreview.src;
    }

    // Email format validation
    if (!validateEmail(user.email)) {
      errorMessage.textContent =
        "Invalid email format. Please enter a valid email address.";
      errorMessage.style.display = "block";
      return;
    }

    // Update the table cell with the new user data
    const userId = user.id;
    const row = document.querySelector(`[data-user-id="${userId}"]`);
    if (row) {
      const nameCell = row.querySelector("td:nth-child(1)");
      const emailCell = row.querySelector("td:nth-child(2)");
      const profilePictureCell = row.querySelector("td:nth-child(3)");

      nameCell.textContent = user.name;
      emailCell.textContent = user.email;
      profilePictureCell.firstChild.src = user.profilePictureURL;
    }

    closeModal();
  };

  const updateCancel = document.getElementById("updateCancel");
  updateCancel.onclick = closeModal;

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("userModal");
  modal.style.display = "none";
}

function closeAddModal() {
  const modal = document.getElementById("addUserModal");
  modal.style.display = "none";
}

// Function to open the modal for adding a new user
function openAddUserModal() {
  const modal = document.getElementById("addUserModal");
  const addForm = document.getElementById("addForm");
  const addName = document.getElementById("addName");
  const addEmail = document.getElementById("addEmail");
  const addProfilePicture = document.getElementById("addProfilePicture");
  const addProfilePicturePreview = document.getElementById(
    "addProfilePicturePreview"
  );
  const errorMessage = document.getElementById("error-message-2");
  const confirmationMessage = document.getElementById("confirmation-message-2"); // Confirmation message element

  addName.value = "";
  addEmail.value = "";
  addProfilePicture.value = "";
  addProfilePicturePreview.style.display = "none";

  addProfilePicture.addEventListener("change", function () {
    // Preview the selected image
    const file = addProfilePicture.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        addProfilePicturePreview.src = e.target.result;
        addProfilePicturePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  addForm.onsubmit = function (e) {
    e.preventDefault();

    const newUser = {
      id: generateUserId(),
      name: addName.value,
      email: addEmail.value,
    };

    if (addProfilePicturePreview.style.display === "block") {
      newUser.profilePictureURL = addProfilePicturePreview.src;
    }

    // Email format validation
    if (!validateEmail(newUser.email)) {
      errorMessage.textContent =
        "Invalid email format. Please enter a valid email address.";
      errorMessage.style.display = "block";
      return;
    }

    console.log({ newUser });
    // users.push(newUser);
    // populateTable();

    // Add the new user to the table
    const tableBody = document.querySelector("#data-table tbody");
    const row = document.createElement("tr");
    row.dataset.userId = newUser.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = newUser.name;

    const emailCell = document.createElement("td");
    emailCell.textContent = newUser.email;

    const profilePictureCell = document.createElement("td");
    const profileImage = document.createElement("img");
    profileImage.src = newUser.profilePictureURL;
    profileImage.width = 100;
    profileImage.height = 100;
    profilePictureCell.appendChild(profileImage);

    const actionsCell = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";

    updateButton.addEventListener("click", function () {
      openUserModal(newUser);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      // Get user ID from the row's data attribute
      const userId = row.dataset.userId;

      // Remove the user from the records array
      const index = users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.splice(index, 1);
      }

      // Remove the table row from the DOM
      tableBody.removeChild(row);
    });

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(profilePictureCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);

    // Display confirmation message
    confirmationMessage.textContent = "User added successfully.";
    confirmationMessage.style.display = "block";

    // Clear the form fields
    addName.value = "";
    addEmail.value = "";
    addProfilePicture.value = "";
    addProfilePicturePreview.style.display = "none";

    closeAddModal();
  };

  const addCancel = document.getElementById("addCancel");
  addCancel.onclick = closeAddModal;

  modal.style.display = "block";
}

// Email format validation function
function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
}

addUserButton.addEventListener("click", openAddUserModal);
populateTable();
