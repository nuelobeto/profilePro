const profileSchema = `
    CREATE TABLE IF NOT EXISTS profiles (
        profileId VARCHAR(255) UNIQUE NOT NULL,
        userId VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        address VARCHAR(255),
        country VARCHAR(255),
        state VARCHAR(255),
        city VARCHAR(255),
        zip VARCHAR(255),
        about VARCHAR(255),
        links VARCHAR(255)
    )
`;

module.exports = profileSchema;
