-- receive "select" value ($1) and "name" ($2)
UPDATE character
SET active = $1
WHERE character_name = $2