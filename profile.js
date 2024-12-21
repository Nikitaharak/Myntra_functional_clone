document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.querySelector('.edit-profile-btn');
    const profileDetails = document.querySelector('.profile-details');

    editButton.addEventListener('click', () => {
        // Create an editable form
        const name = profileDetails.querySelector('p:nth-child(1)').textContent.split(': ')[1];
        const email = profileDetails.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const phone = profileDetails.querySelector('p:nth-child(3)').textContent.split(': ')[1];

        profileDetails.innerHTML = `
            <form id="edit-profile-form">
                <label>
                    Name: <input type="text" id="edit-name" value="${name}">
                </label>
                <label>
                    Email: <input type="email" id="edit-email" value="${email}">
                </label>
                <label>
                    Phone: <input type="tel" id="edit-phone" value="${phone}">
                </label>
                <button type="submit" class="save-profile-btn">Save</button>
                <button type="button" class="cancel-profile-btn">Cancel</button>
            </form>
        `;

        // Handle Save Button
        document.querySelector('.save-profile-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const updatedName = document.getElementById('edit-name').value;
            const updatedEmail = document.getElementById('edit-email').value;
            const updatedPhone = document.getElementById('edit-phone').value;

            profileDetails.innerHTML = `
                <p><strong>Name:</strong> ${updatedName}</p>
                <p><strong>Email:</strong> ${updatedEmail}</p>
                <p><strong>Phone:</strong> ${updatedPhone}</p>
                <button class="edit-profile-btn">Edit Profile</button>
            `;

            // Re-attach the edit button functionality
            const newEditButton = profileDetails.querySelector('.edit-profile-btn');
            newEditButton.addEventListener('click', () => editButton.click());
        });

        // Handle Cancel Button
        document.querySelector('.cancel-profile-btn').addEventListener('click', () => {
            profileDetails.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <button class="edit-profile-btn">Edit Profile</button>
            `;

            // Re-attach the edit button functionality
            const newEditButton = profileDetails.querySelector('.edit-profile-btn');
            newEditButton.addEventListener('click', () => editButton.click());
        });
    });
});
