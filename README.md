# RemoteByteClinic Professional Website

A modern, responsive website for RemoteByteClinic - professional computer repair services with mail-in and remote support options.

## 🌟 **Live Demo**

Visit the live website: [Your Netlify URL will go here]

## 📧 **Contact**
- **Email**: remotebyteclinic@gmail.com
- **Services**: Mail-in repairs, Remote support, Hardware diagnostics

## 🚀 Features

- **Modern Design**: Clean, professional interface with responsive design
- **Quote System**: Easy quote request form for customers
- **Payment Processing**: Secure Stripe integration for payments
- **Admin Panel**: Management interface for payment codes and services
- **Authentication**: User accounts with Supabase auth
- **Mail-in & Remote**: Support for both mail-in repairs and remote assistance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database + Auth + Edge Functions)
- **Payments**: Stripe
- **Deployment**: Netlify
- **Icons**: Lucide React

## 📦 Installation

### **Quick Start (Recommended)**
1. **Upload to GitHub** (see `GITHUB_UPLOAD_INSTRUCTIONS.md`)
2. **Deploy to Netlify** (automatic from GitHub)
3. **Add environment variables** in Netlify
4. **Your site is live!**

### **Local Development**
1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/remotebyteclinic-website.git
   cd remotebyteclinic-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your actual values in `.env`:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `VITE_ADMIN_MASTER_KEY`: Your chosen admin password

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### **Netlify (Recommended)**
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### **Environment Variables Required:**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key  
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `VITE_ADMIN_MASTER_KEY` - Your chosen admin password

### Manual Build
```bash
npm run build
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the migrations in `supabase/migrations/`
3. Deploy the edge functions in `supabase/functions/`

### Stripe Setup
1. Create a Stripe account
2. Get your publishable key from the dashboard
3. Set up webhooks for payment processing

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── HomePage.tsx    # Main landing page
│   ├── QuoteRequest.tsx # Quote request form
│   ├── PaymentPage.tsx # Payment processing
│   └── AdminPanel.tsx  # Admin interface
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
└── stripe-config.ts    # Stripe product configuration

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

## 🔐 Admin Access

To access the admin panel:
1. Sign up/login to the website
2. Go to `/admin`
3. Enter the master key you set in `VITE_ADMIN_MASTER_KEY`

## 📧 Contact

**For support or questions about RemoteByteClinic services:**
- Email: remotebyteclinic@gmail.com
- Website: Professional computer repair services

## 📄 License

This project is private and proprietary to RemoteByteClinic.

---

Built with ❤️ for RemoteByteClinic