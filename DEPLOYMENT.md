# Deployment Guide: GitHub Pages + Cloudflare

## 📋 Prerequisites
- GitHub repository
- Supabase project (already set up)
- Cloudflare account
- Custom domain (optional)

## 🚀 Step 1: GitHub Repository Setup

1. **Create GitHub repository** for your project
2. **Push your code** to the repository
3. **Update vite.config.ts** - Replace `/your-repo-name/` with your actual repo name

## 🔑 Step 2: GitHub Secrets Configuration

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_ADMIN_MASTER_KEY=your_secure_master_key
```

## 📄 Step 3: Enable GitHub Pages

1. Go to repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** (will be created automatically)
4. Folder: **/ (root)**

## 🌐 Step 4: Cloudflare Setup

### Option A: Full Cloudflare (Recommended)
1. **Add your domain** to Cloudflare
2. **Update nameservers** at your domain registrar
3. **DNS Settings**:
   ```
   Type: CNAME
   Name: @ (or www)
   Content: your-username.github.io
   Proxy: Enabled (orange cloud)
   ```

### Option B: Cloudflare for GitHub Pages
1. **DNS Settings**:
   ```
   Type: CNAME
   Name: your-subdomain
   Content: your-username.github.io
   Proxy: Enabled
   ```

## ⚡ Step 5: Cloudflare Optimizations

### Page Rules (optional):
```
your-domain.com/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 4 hours
```

### Security Settings:
- **SSL/TLS**: Full (strict)
- **Always Use HTTPS**: On
- **HSTS**: Enabled
- **Minimum TLS Version**: 1.2

## 🔧 Step 6: Custom Domain (Optional)

1. **Add CNAME file** to your repo root:
   ```
   your-domain.com
   ```

2. **Update GitHub Pages settings** with your custom domain

3. **Update vite.config.ts**:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/' : '/',
   ```

## 🚨 Important Notes

### Limitations:
- **Static hosting only** - Supabase Edge Functions run separately
- **Environment variables** must be set in GitHub Secrets
- **Client-side routing** requires SPA redirect setup (included)

### What Works:
✅ React frontend  
✅ Supabase authentication  
✅ Stripe payments (via Supabase functions)  
✅ Admin panel  
✅ Database operations  
✅ Custom domain with Cloudflare  

### What Doesn't Work:
❌ Server-side rendering  
❌ Backend API routes  
❌ File uploads to local storage  

## 🔄 Deployment Process

1. **Push to main branch** → Triggers GitHub Action
2. **Build completes** → Deploys to gh-pages branch
3. **GitHub Pages serves** → Site available at your domain
4. **Cloudflare proxies** → Provides CDN, security, and optimizations

## 🐛 Troubleshooting

### Build Fails:
- Check GitHub Secrets are set correctly
- Verify Supabase URLs are accessible
- Check for TypeScript errors

### Site Not Loading:
- Verify GitHub Pages is enabled
- Check custom domain DNS settings
- Ensure CNAME file exists (if using custom domain)

### Routing Issues:
- SPA redirect scripts are included
- GitHub Pages doesn't support server-side redirects
- All routes go through index.html

## 🔄 Alternative: Netlify (Easier Setup)

If GitHub Pages proves difficult, consider Netlify:
- Automatic deployments from GitHub
- Built-in form handling
- Better SPA support
- Environment variables in dashboard
- Custom domains included

Would you like me to create Netlify deployment config instead?