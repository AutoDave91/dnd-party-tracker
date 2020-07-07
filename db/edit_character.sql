-- Allow full edit (other than campaign)
-- Manage damage, heal, temp, lvl
UPDATE character SET
character_name = $1,
class = $2,
party_role = $3,
lvl = $4,
max_hp = $5,
ac = $6,
current_hp = $7,
temp_hp = $8,
strength = $9,
dex = $10,
con = $11,
intel = $12,
wis = $13,
cha = $14,
health = $15,
active = $16,
token = $17
WHERE character_id = $18;
SELECT * FROM character
WHERE campaign_id = $19 AND active = true