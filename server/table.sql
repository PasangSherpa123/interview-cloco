CREATE TYPE gender_enum AS ENUM ('m', 'f', 'o');
CREATE TYPE genre_enum AS ENUM('rnb', 'country', 'classic', 'rock', 'jazz');
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,           
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    dob DATE,
    gender gender_enum DEFAULT 'o',
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE IF NOT EXISTS artist (
    id SERIAL PRIMARY KEY,           
    name VARCHAR(255) NOT NULL,
    dob DATE,
    gender gender_enum DEFAULT 'o',
    address VARCHAR(255) NOT NULL,
    first_release_year SMALLINT NOT NULL
    no_of_albums_release INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS music (
    id SERIAL PRIMARY KEY,
    artist_id INT NOT NULL REFERENCES artist(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    album_name VARCHAR(255),
    genre genre_enum NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
