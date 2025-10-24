# 📱 PieceJob App

> **Tagline:** *Where skills meet opportunity. Turn your skills into income.*

PieceJob is a modern gig platform that connects young people and skilled individuals with **flexible, short-term work opportunities** in their local area.  
Whether you’re looking to earn extra income or gain real-world experience, PieceJob makes it easy to find jobs that match your skills — **fast, reliable, and on your terms**.  

By leveraging **FNB’s digital payment solutions**, workers are paid instantly and can save or spend responsibly, bridging the gap between informal gig work and financial empowerment.

---

## 📝 Name & Description
- **App Name:** PieceJob  
- **Description:** A mobile-first job platform enabling gig workers and job posters to connect easily and transact securely.  

---

## 🎯 Target Audience & Personas
**Primary Users**
- Youth & job seekers looking for flexible, short-term gigs  
- Skilled individuals (gardening, tutoring, delivery, etc.)  

**Secondary Users**
- Small businesses & individuals posting jobs  
- NGOs, schools, and communities needing temporary help  

| Persona | Description |
|---------|-------------|
| 👤 **Thendo (21)** – Youth Job Seeker | *Pain Points:* Limited access to short-term work, needs fast income, quick/easy payments.<br>*Needs:* Simple app to find gigs nearby, instant pay, build reputation. |
| 👩 **Naledi (38)** – Small Business Owner | *Pain Points:* Hard to find reliable helpers quickly, wasted time on informal hiring.<br>*Needs:* Easy job posting, trustworthy applicants, secure payments. |

---

## 🌟 Core Features
### For Job Seekers
- Profile creation (skills, photo, experience)  
- Browse nearby gigs (filter by distance, pay, category)  
- One-tap apply  
- **Instant payments** via FNB eWallet / PayShap  
- Ratings & reviews to build credibility  
- **SmartSave**: automatically save % of earnings  

### For Job Posters
- Post a job in < 2 minutes  
- View applicants & choose best fit  
- Secure instant payments  
- Rate and review workers  

---

## ⚙️ General App Features
- **Offline / low-data usage** for entry-level smartphones  
- Clean, simple UI for non-tech-savvy users  
- **Chatbot / WhatsApp integration** for support & updates  
- Rewards: Airtime/data incentives for engagement  
- **FNB integration**: eWallet, PayMe, PayShap, financial literacy tips  

---

## 📖 User Stories & Flows
**Job Seeker Story**  
“As a job seeker, I want to see local gigs so I can apply quickly and start earning money today.”  
**Flow:** Sign Up → Add Profile → Browse Jobs → Apply → Get Hired → Complete Job → Instant Payment → Review → SmartSave  

**Job Poster Story**  
“As a job poster, I want to quickly post a job and choose from applicants so I can get help fast.”  
**Flow:** Sign Up → Post Job → View Applicants → Select Candidate → Job Done → Pay Instantly → Review  

---

## ✏️ Wireframes & UI Sketches
**Job Seeker Screens**
- Login / Sign Up  
- Profile setup  
- Job feed  
- Job details  
- Apply button  
- Wallet & earnings (SmartSave toggle)  

**Job Poster Screens**
- Post a job form  
- Applicant list  
- Payment confirmation  
- Reviews & ratings  

---

## 🛠 Tech Stack
**Frontend:** React Native, React Navigation, TailwindCSS  
**Backend:** Node.js / Express OR Firebase  
**Database:** Firebase Firestore / MongoDB / Supabase  
**Payments:** FNB APIs (eWallet, PayMe, PayShap, SnapScan)  
**Auth:** OTP login (Twilio / Firebase Auth)  
**Location Services:** Google Maps API / Expo Location  

---

## 🚀 MVP (Minimum Viable Product)
- Job posting (title, pay, location, description)  
- Job feed & apply function  
- Basic profile creation  
- Ratings system  
- Mock payments (simulate instant pay)  
- OTP authentication  

---

## ✅ Final MVP Feature List
**Job Seeker**
- Sign up / profile  
- Browse & apply  
- Get paid instantly  
- Earnings dashboard  

**Job Poster**
- Post jobs quickly  
- Review applicants  
- Pay instantly  
- Ratings & reviews  

---

## 🔮 Post-MVP Features
- AI-based job matching  
- Live notifications  
- Chat between posters & seekers  
- Advanced wallet features (budgeting, savings goals)  
- Airtime/data rewards  
- Insurance & worker protection  

---

---

## 📚 Technical Documentation (PDF)

We maintain a full technical document that describes **system architecture**, **user cases**, **user roles**, **error handling**, and **operational flows** for both **Job Seekers** and **Job Posters** within the PieceJob platform.

**Download / view the PDF:**  
[📄 Full Technical Documentation (PDF)](https://drive.google.com/file/d/1or4rm4OfVE5Q4Avx_SbXSddyreCUwuOx/view?usp=sharing)

> Quick highlights (extracted from the technical doc) — outlining key user roles and representative system flows:

<details>
<summary><strong>Key User Roles</strong></summary>

### 👤 Individual (Job Seeker)
- Creates a personal profile with skills, photo, and experience.  
- Views and applies for available jobs in the feed.  
- Accepts appointments and completes jobs.  
- Confirms completion and receives **instant payment**.  
- Rates and reviews job posters.  

### 🏢 Business / Individual (Job Poster)
- Posts jobs by filling out job details (title, pay, skills required, location, urgency status).  
- Reviews applicants, views their profiles and ratings, and selects suitable candidates.  
- Pays seekers upon job completion (FNB instant payment integration).  
- Leaves feedback and ratings for job seekers.  

### 🧑‍💼 Admin / System Actor
- Oversees job postings, verifies users, and ensures fair usage.  
- Manages platform-wide disputes and payment validation.  
- Handles data consistency, visibility control (“invisible” state once a job is filled), and cleanup (auto-deleting completed jobs).

</details>

<details>
<summary><strong>Representative User Cases</strong></summary>

### 📌 Use Case: Post a Job
**Actor:** Job Poster  
**Trigger:** User clicks **“Post a Job”** button.  
**Preconditions:** Signed-in user (Individual or Business).  
**Standard Flow:**
1. User fills out job form (name, short description, pay, skills, and location).  
2. System validates input — highlights missing info if any.  
3. Job becomes visible on the job feed.  
4. Applicants can now apply.  
5. Once a seeker is appointed and paid, the job post auto-deletes.  

**Alternative Flow:** Missing required fields → system displays error highlights.  

---

### 🧾 Use Case: Apply for a Job
**Actor:** Job Seeker  
**Trigger:** User clicks **“Apply”** on a job listing.  
**Preconditions:** Signed-in user, valid skills in profile.  
**Standard Flow:**
1. System sends seeker’s profile and ratings to job poster.  
2. Poster reviews and accepts or rejects application.  
3. Upon acceptance → Job Order created.  
4. Seeker completes the job and confirms completion.  
5. Poster verifies completion and pays instantly.  

**Error Situations:**  
- Missing skills or invalid profile → show notification to update profile.  
- Failed submission → show “try again” modal.  

---

### ⭐ Use Case: Rate and Review
**Actor:** Job Poster / Job Seeker  
**Trigger:** Job completion confirmation.  
**Standard Flow:**
1. Both parties rate each other (1–5 stars).  
2. Reviews appear on profiles and can be sorted or filtered.  
3. System handles failed submissions gracefully with retry prompts.  

**Error Situations:**  
- Review fails to post → display retry modal.  
- Sorting/filtering error → show “no data” state.  

---

### 🧱 System Behaviors
- **Job Order Creation:** Represents accepted contract between poster and seeker.  
- **Job Completion Flow:** Seeker marks job as complete → poster confirms → triggers payment and rating process.  
- **Error Handling:** Missing inputs and failed submissions trigger contextual UI prompts rather than crashes.  

</details>

---

_For full technical context — including system architecture diagrams, API endpoints, OTP & JWT authentication, error states, and FNB payment workflows — refer to the PDF linked above._

## 📌 Project Status
- **Stage:** Planning & Documentation  
- **Next Step:** Build MVP with Nextjs + Firebase + FNB API integration  

---
