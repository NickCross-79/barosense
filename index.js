import pg from 'pg';

const client = new pg.Client({
    user: 'postgres',
    host: 'localHost',
    database: 'test',
    password: '',
    port: 5432,
});

const query = `
    DROP TABLE IF EXISTS person;
    CREATE TABLE person (
        id INT NOT NULL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        date_of_birth DATE NOT NULL
    );
`;

client.connect().then( () => {
    console.log("connected");
    client.query(query, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res.rows)
        }
        client.end();
    })
}).catch(error => {
    console.log(error);
});