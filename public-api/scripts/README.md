# Skripte

## seed-100-reservations.sql

Dodaje 100 nepotvrđenih rezervacija za prvi događaj u Novom Sadu.

**Pokretanje** (iz root public-api foldera, sa učitanim DATABASE_URL):

```bash
npm run db:seed-reservations
```

Ako je `DATABASE_URL` u `.env.server`:

```bash
set -a && source .env.server 2>/dev/null; set +a && npm run db:seed-reservations
```

Ili ako Wasp koristi `.env`:

```bash
cd public-api && wasp db migrate-dev
# Zatim u drugom terminalu, sa istim .env:
npm run db:seed-reservations
```

**Napomena:** Mora postojati bar jedan događaj u bazi (po mogućnosti u Novom Sadu).
