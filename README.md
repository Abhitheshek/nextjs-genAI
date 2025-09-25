# ArtisanLux - Artisan Marketplace

A Next.js application for connecting artisans with customers through an AI-powered marketplace.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Artisan Dashboard**: Manage products, view analytics
- **Buyer Marketplace**: Browse and purchase handcrafted items
- **AI-Powered Automation**: Automated product enhancement
- **Firebase Integration**: Authentication and data storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Language**: TypeScript

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── lib/                 # Utility functions and services
├── styles/              # Global styles
└── contexts/            # React contexts
```

## Environment Variables

Create a `.env.local` file with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```