UPDATE character SET
lvl = $1,
current_hp = $2,
temp_hp = $3,
health = $4
WHERE character_id = $5;
SELECT * FROM character
WHERE campaign_id = $6 AND active = true