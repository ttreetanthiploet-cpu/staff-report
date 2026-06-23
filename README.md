# Smart ทันหนี้ — Staff Portal v2

ระบบติดตามและจัดการคำขอปรับโครงสร้างหนี้ สำหรับเจ้าหน้าที่ธนาคาร

## What's new in v2

- **Full data-type handling** — `acc_table` (array of accounts) and `acc_summary` (object)
  are stored as JSONB with normalised numeric fields AND `_original` Thai-key fields preserved
- **Scalar derived columns** — `total_outstanding`, `total_credit_limit`, `account_count`,
  `summary_c_class` extracted for fast SQL filtering and sorting
- **Account mini-table** shown in the detail overlay header strip (rendered from real array data)
- **Report HTML built from real schema** — `buildReportHtml()` reads `acc_table`, `acc_summary`,
  `_original` fallback, all text fields — no hardcoded strings
- **Debt range filter** added (< 500k / 500k–1M / > 1M)
- **Total outstanding** stat card shows sum across filtered rows
- **C3 highlighted** in red throughout table and detail view

## Project Structure

```
smart-tunhni-portal/
├── index.html                       # Full SPA — deploy to Vercel
├── vercel.json                      # Vercel static config
├── .env.example                     # Copy → .env, add Supabase creds
├── .gitignore
├── sql/
│   └── schema.sql                   # Run once in Supabase SQL Editor
├── n8n/
│   ├── prepare_payload.js           # Code node: transforms insertRow → typed payload
│   └── supabase-insert-node.json    # Supabase node: insert typed payload
├── src/
│   └── config.js                    # SUPABASE_URL / SUPABASE_KEY
└── public/
    └── favicon.svg
```

## Data Type Mapping

| Source field | JS type | Postgres type | Notes |
|---|---|---|---|
| `sessionId` | string | TEXT | |
| `timestamp` | string | TIMESTAMPTZ | ISO-8601 |
| `receivedDate`, `reportDate` | string | DATE | Converts DD/MM/YY → YYYY-MM-DD |
| `policyCompliant` | boolean | BOOLEAN | Explicit true/false |
| `accTable` | array of objects | JSONB | Normalised + `_original` Thai keys |
| `accSummary` | object | JSONB | Normalised + `_original` Thai keys |
| `total_outstanding` | number | NUMERIC(18,2) | Derived from accSummary |
| `account_count` | number | INT | `accTable.length` |
| All text fields | string | TEXT | Trimmed, NA/empty → null |

## Quick Start

```bash
# 1. Run schema
# Paste sql/schema.sql into Supabase SQL Editor and run

# 2. Set credentials
cp .env.example .env
# Edit .env with your SUPABASE_URL and SUPABASE_KEY

# 3. Update src/config.js with same values

# 4. Deploy
vercel --prod

# 5. Local dev (no build step needed)
python3 -m http.server 5000
# open http://localhost:5000
```

## Filters Available

| Filter | Source column |
|---|---|
| Free-text search | customer_name, cif, request_subject, occupation, session_id, acc_mdata, request_type |
| Date from/to | saved_at |
| Billing cycle | acc_mdata |
| C-Class | summary_c_class |
| Status | review_status |
| Policy | policy_compliant |
| Debt range | total_outstanding |
