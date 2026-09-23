# Branding and Asset Guide

## Logo file

The official brand asset is stored in the root of the project:

- `Holcim-Group-logo-PNG.png`

## Where the logo is used

- Site header on the main landing page
- Footer on the static website
- Email templates sent through Resend
- Project documents and onboarding materials

## Public URL requirement

For the emails to show the logo correctly, the public site URL must be set in Supabase:

```bash
supabase secrets set PUBLIC_SITE_URL='https://YOUR_USERNAME.github.io/YOUR_REPO'
```

This makes the email template resolve the image correctly as:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/Holcim-Group-logo-PNG.png
```

## Static hosting rule

The website is designed for GitHub Pages, so the logo must remain in the repository root and be referenced via a relative path such as:

```html
<img src="./Holcim-Group-logo-PNG.png" alt="Logo Holcim" />
```

## Usage notes

- Keep the original logo file unmodified.
- If you replace the logo, update the documentation and email template references.
- Use the same image for web and email to keep branding consistent.
