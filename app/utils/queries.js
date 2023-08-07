const queries = {
    createTable:`
        CREATE TABLE items (
            name VARCHAR(100) NOT NULL PRIMARY KEY,
            thumbnail TEXT,
            ducat_price VARCHAR(100) NOT NULL,
            credit_price VARCHAR(100) NOT NULL,
            last_date DATE
        );
    `,
    dropTable:`
        DROP TABLE IF EXISTS items;
    `,
    insertItem:`
        INSERT INTO items (
            name,
            thumbnail,
            ducat_price,
            credit_price,
            last_date)
        VALUES ($1, $2, $3, $4, $5);
    `,
    findItem:`
        SELECT * FROM items
        WHERE name = $1;
    `,
    getItems:`
        SELECT * FROM items;
    `
}

export default queries;