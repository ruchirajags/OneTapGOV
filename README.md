OneTapGOV

AI-Powered Government Scheme Discovery & Application Assistant

Built for the OpenAI × NamasteDev Hackathon

The Problem

India runs thousands of government welfare schemes, yet millions of
eligible citizens never benefit from them. Information is scattered
across departments, eligibility rules are hard to interpret, application
processes are complex, and language barriers put access further out of
reach.

Our Solution

OneTapGOV is an AI-powered conversational assistant that builds a
citizen's profile through natural conversation, matches them against
eligible government schemes, explains eligibility in plain language,
lists the documents required, and hands off directly to the official
government application portal.

Key Features

AI-powered conversational assistant

Dynamic profile building through natural dialogue

Intelligent eligibility matching engine

Personalized scheme recommendations

Required-document checklist for each scheme

Direct links to official government portals

Secure authentication

Clean, at-a-glance dashboard

Multilingual AI Assistant

OneTapGOV is built to be accessible to users across India through
multilingual conversation support. Users can interact with the AI
assistant in multiple languages, and the assistant understands and
responds naturally in the language selected.

Voice interaction currently carries a browser limitation: Chrome's
built-in Speech Recognition API provides reliable voice input primarily
in English, so voice mode is fully supported in English today, while
other languages remain fully supported through text. Multilingual
conversations may also be subject to token availability, since API usage
was constrained during the hackathon. In a production deployment, this
can be resolved with scalable API infrastructure and higher token
quotas, enabling uninterrupted multilingual support end to end.

Architecture

Citizen

↓

Next.js Frontend

↓

FastAPI Backend

↓

OpenAI

↓

Eligibility Engine

↓

Government Scheme Database

↓

Supabase

Technology Stack

How It Works

1.  User signs in.

2.  AI gathers profile details through conversation.

3.  User data is securely stored.

4.  Eligibility engine evaluates applicable schemes.

5.  Personalized recommendations are generated.

6.  Required documents and official application links are shown.

Impact

OneTapGOV empowers citizens to easily discover and access the government
benefits they deserve --- reducing the information gap and improving
welfare accessibility nationwide.

Future Scope

OCR-based document verification

Aadhaar-assisted profile filling

Multilingual voice assistant

AI-powered form autofill

WhatsApp integration

Reminder notifications

Team

Built with ❤️ for the OpenAI × NamasteDev Hackathon.

Mission: Every eligible citizen deserves to know the benefits they are
entitled to.
