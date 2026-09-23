# Supabase backend for Oggaz HSE site

## Branding

The official Holcim logo is stored as:

- `Holcim-Group-logo-PNG.png`

This file must be published with the GitHub Pages site and also referenced by the email template using the public site URL.

## 1) Create the database tables

Run the SQL from `supabase/schema.sql` or copy it directly into the Supabase SQL editor.

## 2) Create the Storage bucket

Create a bucket named:

- `visitor-signatures`

Configuration:

- Public: false
- Allowed MIME types: `image/png`, `image/jpeg`

## 3) Deploy Edge Functions

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set SUPABASE_URL='https://YOUR_PROJECT_REF.supabase.co'
supabase secrets set SUPABASE_SERVICE_ROLE_KEY='YOUR_SERVICE_ROLE_KEY'
supabase secrets set SUPABASE_ANON_KEY='YOUR_ANON_KEY'
supabase secrets set RESEND_API_KEY='YOUR_RESEND_KEY'
supabase secrets set RESEND_FROM='Oggaz Safety <noreply@yourdomain.com>'
supabase secrets set PUBLIC_SITE_URL='https://YOUR_USERNAME.github.io/YOUR_REPO'
supabase functions deploy send-email
supabase functions deploy submit-visitor
supabase functions deploy submit-epi
```

## 4) Frontend configuration

Update the values in `index.html`:

```js
const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
```

## 5) Notes

- The frontend stays static on GitHub Pages.
- All form submissions are sent to Supabase Edge Functions.
- Resend handles the email delivery.
- Signatures are stored in Supabase Storage.
- Every notification includes the Holcim logo from the public site URL.
