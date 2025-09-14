# 💕 Santi & Partner's Wedding Website 💕

A beautiful, simple wedding website built with static HTML, Vercel serverless functions, and modern web technologies. Perfect for managing guest lists, sending invitations, and sharing your special day with loved ones.

## ✨ Features

- **Beautiful Responsive Design** - Modern, elegant styling that looks great on all devices
- **Guest Management** - Add, view, and manage your guest list with plus-ones
- **Email Invitations** - Send beautiful HTML email invitations to all guests
- **RSVP Page** - Guests can respond to invitations
- **Registry Page** - Share your wedding registry and gift preferences
- **Image Support** - Easy to add your wedding photos
- **Serverless Backend** - Powered by Vercel Functions
- **Data Storage** - Uses Upstash Redis for reliable data persistence

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Vercel account
- Resend account (for email sending)
- Upstash Redis account (or use Vercel's Redis integration)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd santiwedding
npm install
```

### 2. Set Up Services

#### Option A: Use Vercel's Redis Integration (Recommended)
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to **Storage** tab
4. Click **Create Database** → **Redis**
5. This automatically sets up Upstash Redis and injects environment variables

#### Option B: Manual Upstash Setup
1. Create account at [Upstash](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token

#### Set Up Email Service
1. Create account at [Resend](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Get your API key

### 3. Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
RESEND_API_KEY=your_resend_api_key
```

### 4. Deploy to Vercel

#### Option A: Deploy from GitHub (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **New Project**
4. Import your GitHub repository
5. Vercel will automatically detect the configuration and deploy

#### Option B: Deploy from CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### 5. Customize Your Website

1. **Add Your Images**: Replace placeholder images in `/public/images/`
   - `couple.jpg` - Main hero image (600x300px recommended)
   - Add any additional photos you want

2. **Update Content**: Edit the HTML files in `/public/` to customize:
   - Names and dates in `index.html`
   - Wedding details and styling
   - Email templates in `/api/send-invites.js`

3. **Configure Email**: Update the email settings in `/api/send-invites.js`:
   - Change the `from` email address to your verified domain
   - Customize the email template
   - Update the website URL

## 📁 Project Structure

```
santiwedding/
├── public/                 # Static files served by Vercel
│   ├── index.html         # Main wedding page with guest management
│   ├── rsvp.html          # RSVP page for guests
│   ├── registry.html      # Wedding registry page
│   └── images/            # Wedding photos and assets
├── api/                   # Serverless functions
│   ├── _redis.js          # Redis connection utility
│   ├── guest.js           # Add/update guest endpoint
│   ├── guests.js          # Get all guests endpoint
│   └── send-invites.js    # Send email invitations
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## 🔧 API Endpoints

### `POST /api/guest`
Add or update a guest in the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "pluses": 1
}
```

### `GET /api/guests`
Retrieve all guests from the database.

**Response:**
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "pluses": 1
  }
]
```

### `POST /api/send-invites`
Send email invitations to all guests in the database.

**Response:**
```
"Sent invites to 25 guest(s)"
```

## 🎨 Customization

### Styling
The website uses CSS Grid and Flexbox for responsive design. Main styles are in the `<style>` sections of each HTML file. Key colors:
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#A0522D` (Sienna)
- Accent: `#2E8B57` (Sea Green)

### Adding Pages
1. Create new HTML files in `/public/`
2. Follow the existing structure and styling
3. Add navigation links in the existing pages

### Database Schema
Guests are stored in Redis with this structure:
- `guest:all` - Set of all guest emails
- `guest:{email}` - Hash containing guest details (name, email, pluses)

## 🚨 Important Notes

### Email Configuration
- **Domain Verification**: You must verify your domain in Resend before sending emails
- **Rate Limits**: Resend has rate limits; for large guest lists, consider batching
- **Test Mode**: Use Resend's test mode during development

### Security
- Environment variables are automatically injected by Vercel
- No sensitive data should be stored in the frontend code
- Consider adding input validation and rate limiting for production

### Performance
- Images are served directly from Vercel's CDN
- Consider optimizing images for web (WebP format, appropriate sizing)
- Redis operations are fast but consider caching for large datasets

## 🛠️ Development

### Local Development
```bash
# Install dependencies
npm install

# Run local development server
npm run dev
# or
vercel dev
```

### Testing
- Test the guest management functionality locally
- Use Resend's test mode for email testing
- Verify Redis operations work correctly

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile-first CSS design
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Fast loading on mobile networks

## 🎯 Next Steps

1. **Add Your Content**: Replace placeholder text and images
2. **Test Everything**: Verify all functionality works correctly
3. **Customize Styling**: Adjust colors, fonts, and layout to match your theme
4. **Set Up Analytics**: Add Google Analytics or similar for tracking
5. **Backup Data**: Consider regular exports of your guest data

## 🆘 Troubleshooting

### Common Issues

**Emails not sending:**
- Check that your domain is verified in Resend
- Verify the `RESEND_API_KEY` environment variable
- Check Vercel function logs for errors

**Guest data not saving:**
- Verify Redis environment variables are set
- Check that Upstash Redis is accessible
- Look at Vercel function logs

**Images not loading:**
- Ensure images are in `/public/images/`
- Check file paths are correct
- Verify image files are not corrupted

### Getting Help

- Check Vercel function logs in your dashboard
- Review the browser console for frontend errors
- Test API endpoints directly using curl or Postman

## 📄 License

MIT License - feel free to use this template for your own wedding!

---

**Made with 💕 for Santi & Partner's special day**

*Happy wedding planning!* 🎉
