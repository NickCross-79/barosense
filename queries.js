const queries = {
    createTable:`
        CREATE TABLE items (
            name VARCHAR(50) NOT NULL PRIMARY KEY,
            thumbnail VARCHAR(50),
            ducat_price INT NOT NULL,
            credit_price INT NOT NULL,
            last_date DATE NOT NULL
        );
    `
}

export default queries;