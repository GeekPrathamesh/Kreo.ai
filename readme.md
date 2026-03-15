# Kreo.ai - Prathamesh Teli

## Overview

This project is a backend system for an AI-powered platform that generates high-quality product images and promotional videos using user-uploaded images.

Authenticated users can upload images, generate realistic studio-quality product images using AI, convert those images into advertisement-style videos, and manage their projects through a credit-based system. The backend follows real-world SaaS architecture principles with a focus on reliability, scalability, and secure access.

---

## Problem Statement

Creating professional product images and marketing videos is expensive and time-consuming. This platform automates the process by using AI models to generate realistic visuals and promotional videos, eliminating the need for physical studio setups or manual editing.

---

## Key Features

### Authentication and Authorization
- User authentication using Clerk
- Protected routes using middleware
- User-specific access to projects and resources

### Credit-Based System
- Users are assigned credits
- Image generation deducts credits
- Video generation deducts additional credits
- Credits are refunded automatically if generation fails
- Supports SaaS-style usage control and monetization logic

### AI Image Generation
- Requires at least two uploaded images (person and product)
- Images are uploaded to Cloudinary
- AI generates realistic studio-quality images
- Supports custom prompts and aspect ratios

### AI Video Generation
- Generated images are used to create promotional videos
- Handles long-running AI generation processes
- Videos are uploaded to Cloudinary
- Project generation status is updated in real time

### Project Management
- Create, retrieve, and delete projects
- Publish and unpublish projects
- Fetch user-specific projects and publicly published projects

### Error Handling and Reliability
- Graceful handling of AI failures
- Prevention of duplicate generation requests
- Database consistency using rollback logic
- Detailed error tracking per project

---

## Technology Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- Clerk

### AI and Media Services
- Google Gemini for image generation
- Veo AI for video generation
- Cloudinary for image and video storage

### Supporting Tools
- Multer for file uploads
- Axios for HTTP requests
- RESTful APIs

---

## Database Design Overview

### User
- Stores user profile information and available credits
- One-to-many relationship with projects

### Project
- Stores uploaded image URLs
- Generated image and video URLs
- Generation status flags
- Publishing status
- Error information

The database schema is designed to support scalable SaaS applications.

---

## Application Flow

1. User authenticates using Clerk  
2. User uploads images  
3. Credits are deducted  
4. AI generates a studio-quality image  
5. Generated image is stored  
6. User initiates video generation  
7. AI generates a promotional video asynchronously  
8. Video is uploaded to Cloudinary  
9. Project status is updated  
10. User can publish or unpublish the project  

---

## Future Enhancements

- Payment integration
- Background job queues for AI processing
- Admin dashboard
- Frontend dashboard
- Rate limiting and analytics
- Support for multiple video outputs per project

---

## Conclusion

This project demonstrates a real-world backend implementation of an AI-powered SaaS platform, covering authentication, media processing, AI orchestration, and credit-based usage control.
