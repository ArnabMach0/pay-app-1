# Mobile Pay-App - Proof of Concept

Minimal build system test for header/footer partials with Gulp. Focused on frontend build first. Laravel setup & integration later.

## Quick Start
Even this is POC, it's still for my client's demo


### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Browser will open automatically at `http://localhost:3000`

### 3. Test Build Process

```bash
npm test
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with live reload |
| `npm run build` | Build frontend to `frontend/dist/` |
| `npm run build:laravel` | Build Laravel files to `laravel/` |
| `npm test` | Test both build processes |

## Testing Checklist

### ✅ Frontend Build Test

1. Run `npm run build`
2. Open `frontend/dist/index.html` in browser
3. Verify header and footer appear
4. Check browser console for "App initialized"

### ✅ Laravel Build Test

1. Run `npm run build:laravel`
2. Open `laravel/resources/views/index.blade.php`
3. Verify it contains `@include` (not `@@include`)
4. Verify asset paths use `{{ asset() }}`

### ✅ Watch Mode Test

1. Run `npm run dev`
2. Edit `shared/partials/_header.html`
3. Save file
4. Browser should auto-reload

### ✅ Error Handling Test

1. Run `npm run dev`
2. Add syntax error to `shared/assets/scss/main.scss`
3. Save file
4. Watch should NOT crash (desktop notification appears)
5. Fix error, save again
6. Build should resume automatically

## What's Being Tested

- ✅ Partial includes (`@@include`)
- ✅ SCSS compilation
- ✅ CSS autoprefixing
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Source maps generation
- ✅ Live reload (BrowserSync)
- ✅ Error handling (no crash on errors)
- ✅ Laravel Blade conversion
- ✅ Asset path conversion

## File Structure

```
mobile-app-poc/
├── shared/               # Source files (edit these)
│   ├── partials/         # Reusable components
│   ├── pages/            # Full page templates
│   └── assets/           # SCSS, JS, images
├── frontend/dist/        # Frontend build output
└── laravel/              # Laravel build output (later)
```

## Next Steps After POC Success

1. Add more partials (sidebar, breadcrumb, modals, toatsts, etc)
2. Add multiple pages (dashboard, users, settings)
3. Integrate AdminLTE, Neumorphism or other UI framework
4. Add form validation
5. Add AJAX examples
6. Set up actual Laravel project

## Troubleshooting

### Port 3000 Already in Use

```bash
# Edit gulpfile.js, change port to 3001
port: 3001
```

### SCSS Not Compiling

```bash
# Reinstall sass
npm uninstall sass
npm install sass@1.58.0 --save-dev
```

### Watch Not Detecting Changes

```bash
# Restart dev server
Ctrl+C (stop)
npm run dev (restart)
```
