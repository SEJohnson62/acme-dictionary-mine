const { Client } = require('pg');
const faker = require('faker');
const client = new Client('postgres://localhost/acme_dictionary');
client.connect();

const sync = async()=> {
  //DROP AND RECREATE TABLES
  const SQL = `
  DROP TABLE IF EXISTS nouns;
  DROP TABLE IF EXISTS adjectives;
  DROP TABLE IF EXISTS verbs;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE nouns(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100);
  );

  CREATE TABLE adjectives(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100);
  );

  CREATE TABLE verbs(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100);
  );
  `;
  await client.query(SQL);
  await Promise.all([
    createNoun(),
    createVerb(),
    createAdjective()
  ]);
};

//CRUD
//Create tables
//Create nouns, verbs, adjectives
const createNoun = async()=> {
  const SQL = 'INSERT INTO nouns(name) values($1) returning *';
  return (await client.query(SQL, [faker.hacker.noun()] )).rows[0];
};
const createVerb = async()=> {
  const SQL = 'INSERT INTO verbs(name) values($1) returning *';
  return (await client.query(SQL, [faker.hacker.verb()] )).rows[0];
}
const createAdjective = async()=> {
  const SQL = 'INSERT INTO adjectives(name) values($1) returning *';
  return (await client.query(SQL, [faker.hacker.adjective()] )).rows[0];
}

//Read nouns, verbs, adjectives
const readNouns = async()=> {
  return (await client.query('SELECT * FROM nouns')).rows;
}
const readVerbs = async()=> {
  return (await client.query('SELECT * FROM verbs')).rows;
}
const readAdjectives = async()=> {
  return (await client.query('SELECT * FROM adjectives')).rows;
}

module.exports = {
  sync,
  createNouns,
  createVerbs,
  createAdjectives,
  readNouns,
  readVerbs,
  readAdjectives
}