--user table
CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(200),
    admin BOOLEAN
)

--campaign table
CREATE TABLE campaign (
    campaign_id SERIAL PRIMARY KEY,
    campaign_name VARCHAR(200)
)

--character table
CREATE TABLE character (
    character_id SERIAL PRIMARY KEY,
    campaign_id INT,
    player_id INT,
    character_name VARCHAR(200),
    token TEXT,
    class VARCHAR(200),
    party_role VARCHAR(200),
    lvl INT,
    max_hp INT,
    ac INT,
    current_hp INT,
    temp_hp INT,
    strength INT,
    dex INT,
    con INT,
    intel INT,
    wis INT,
    cha INT,
    health VARCHAR(10),
    active BOOLEAN,
    FOREIGN KEY (campaign_id) REFERENCES campaign(campaign_id),
    FOREIGN KEY (player_id) REFERENCES users(users_id)
)