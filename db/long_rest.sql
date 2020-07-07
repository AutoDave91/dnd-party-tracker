-- receives campaign id, sets each current HP to max
UPDATE character
SET current_hp = max_hp
WHERE campaign_id = $1 AND active = true;
SELECT * FROM character
WHERE campaign_id = $1 AND active = true;