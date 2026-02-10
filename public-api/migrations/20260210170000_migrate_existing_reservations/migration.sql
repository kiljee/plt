-- Migracija postojećih rezervacija:
-- Stare rezervacije su kreirane kao N redova (po jedan red po mestu) kada je korisnik rezervisao N mesta.
-- Spajamo ih u jedan red sa seats = N.

WITH duplicates AS (
  SELECT
    id,
    "eventId",
    email,
    date_trunc('minute', "createdAt") AS created_minute,
    COUNT(*) OVER (PARTITION BY "eventId", email, date_trunc('minute', "createdAt")) AS grp_count,
    ROW_NUMBER() OVER (PARTITION BY "eventId", email, date_trunc('minute', "createdAt") ORDER BY "createdAt") AS rn
  FROM "Reservation"
)
UPDATE "Reservation" r
SET seats = d.grp_count
FROM duplicates d
WHERE r.id = d.id
  AND d.grp_count > 1
  AND d.rn = 1;

DELETE FROM "Reservation"
WHERE id IN (
  SELECT id
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (PARTITION BY "eventId", email, date_trunc('minute', "createdAt") ORDER BY "createdAt") AS rn
    FROM "Reservation"
  ) sub
  WHERE rn > 1
);
