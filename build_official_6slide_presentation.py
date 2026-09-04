import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def update_presentation():
    input_template = r"c:\Users\Chirag Vasava\Downloads\Personal\College\MSU\Hackathone\MSU Hack-A-Throne 2026\Elimination Submission\GramSaarthi_AI_Hackathon_Presentation.pptx"
    out_elim_pptx = r"c:\Users\Chirag Vasava\Downloads\Personal\College\MSU\Hackathone\MSU Hack-A-Throne 2026\Elimination Submission\GramSaarthi_AI_Hackathon_Presentation.pptx"
    out_md_pptx = os.path.abspath(r"MD_Files\GramSaarthi_AI_Hackathon_Presentation.pptx")
    
    prs = Presentation(input_template)
    
    # Text styling colors
    COLOR_DARK = RGBColor(15, 23, 42)      # Slate 900
    COLOR_PRIMARY = RGBColor(6, 78, 59)    # Emerald 900
    COLOR_ACCENT = RGBColor(180, 83, 9)    # Amber 700
    COLOR_LINK = RGBColor(29, 78, 216)     # Blue 700

    def format_paragraph(p, text, size=10.5, bold=False, color=COLOR_DARK, bullet=False):
        p.text = text
        p.font.name = "Arial"
        p.font.size = Pt(size)
        p.font.bold = bold
        p.font.color.rgb = color
        p.margin_left = Inches(0.15) if bullet else Inches(0)
        p.margin_right = 0
        p.margin_top = Pt(2)
        p.margin_bottom = Pt(2)

    # -------------------------------------------------------------
    # SLIDE 1: Basic Details of Team & Problem Statement
    # -------------------------------------------------------------
    s1 = prs.slides[0]
    shape_s1 = None
    for shape in s1.shapes:
        if shape.name == "Google Shape;72;p1":
            shape_s1 = shape
            break
    
    if shape_s1 and shape_s1.has_text_frame:
        tf = shape_s1.text_frame
        tf.clear()
        
        # Details list
        lines = [
            ("Problem Statement Number : ", "P11", True),
            ("Problem Statement Title : ", "AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs", False),
            ("Project Name : ", "GramSaarthi AI (ग्रामसारथी) — National Micro-Enterprise Evaluation Engine", True),
            ("Team Leader Name : ", "Chirag Vasava", True),
            ("Live Cloud (AWS EC2) : ", "https://gramsaarthi-ai.chiragvasava.me", False),
            ("Live Edge (Vercel) : ", "https://gramsaarthi.chiragvasava.me", False),
            ("GitHub Repository : ", "https://github.com/ChiragVasava/gramsaarthi-ai", False),
        ]
        
        for idx, (label, val, bold_val) in enumerate(lines):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            p.text = ""
            run1 = p.add_run()
            run1.text = label
            run1.font.name = "Arial"
            run1.font.size = Pt(13)
            run1.font.bold = True
            run1.font.color.rgb = COLOR_PRIMARY
            
            run2 = p.add_run()
            run2.text = val
            run2.font.name = "Arial"
            run2.font.size = Pt(12)
            run2.font.bold = bold_val
            run2.font.color.rgb = COLOR_LINK if "http" in val else COLOR_DARK

    # -------------------------------------------------------------
    # SLIDE 2: Idea / Solution & Technology Stack
    # -------------------------------------------------------------
    s2 = prs.slides[1]
    sh_left_s2 = None
    sh_right_s2 = None
    for shape in s2.shapes:
        if shape.name == "Google Shape;81;p2":
            sh_left_s2 = shape
        elif shape.name == "Google Shape;83;p2":
            sh_right_s2 = shape

    if sh_left_s2 and sh_left_s2.has_text_frame:
        tf = sh_left_s2.text_frame
        tf.clear()
        
        p = tf.paragraphs[0]
        format_paragraph(p, "Describe your Idea/Solution/Prototype here:", size=13, bold=True, color=COLOR_PRIMARY)
        
        bullets = [
            "• Core Problem Addressed: Over 63M rural micro-entrepreneurs face a 40%+ failure rate due to informal hearsay, zero local market data, and 78% rejection in statutory bank credit schemes.",
            "• GramSaarthi AI Solution: An intelligent trilingual rural advisory platform combining two decoupled core modules:",
            "  1. Hyper-Local Feasibility Engine: Analyzes 5 km & 10 km spatial catchment zones, demographic density, trade-adaptive POIs (mandis, chillers), and empirical SWOT matrices.",
            "  2. Statutory Financial Structuring: Deterministic debt sizing (10% Margin, 90% Loan), automated scheme routing (Micro Finance @ 6.5% vs. Term Loan @ 8.0%), and moratorium debt amortization.",
            "• Multi-Enterprise Portfolio: Supports creating, comparing, and managing multiple business appraisals (e.g. Dairy + Flour Milling) with cross-app real-time synchronization.",
            "• 1-Click Direct PDF Engine: Client-side Canvas2D color proxy converts modern CSS color spaces (lab, oklch), generating bankable dossiers in <1.5s with zero print dialogs."
        ]
        for b in bullets:
            p = tf.add_paragraph()
            is_sub = b.startswith("  ")
            format_paragraph(p, b, size=9.8 if is_sub else 10.2, bold=False, color=COLOR_DARK)

    if sh_right_s2 and sh_right_s2.has_text_frame:
        tf = sh_right_s2.text_frame
        tf.clear()
        
        p = tf.paragraphs[0]
        format_paragraph(p, "Describe your Technology stack here:", size=13, bold=True, color=COLOR_PRIMARY)
        
        tech_bullets = [
            "• Next.js 16 (React 19 App Router): Fast server-side rendering, modular client routing, and production build.",
            "• TypeScript 5: Strict mathematical type-safety across financial formulas, eliminating floating-point errors.",
            "• Multi-Report State Engine: lib/report-store.ts with custom gs_report_changed reactive event bus & SQLite / Prisma ORM.",
            "• Dual-Cloud Production: AWS EC2 (Docker, Caddy Reverse Proxy, HTTP/2 & Auto-TLS on 13.126.176.46) + Vercel Edge.",
            "• Infrastructure as Code: 100% declarative Terraform automation (terraform apply) for reproducible cloud provisioning.",
            "• AI & Voice Accessibility: Google Gemini API with strict domain guardrails, Web Speech API, trilingual (EN, HI, GU).",
            "• Vector PDF Engine: jsPDF + html2canvas with offscreen Canvas2D RGBA color space proxy."
        ]
        for b in tech_bullets:
            p = tf.add_paragraph()
            format_paragraph(p, b, size=10.2, bold=False, color=COLOR_DARK)

    # -------------------------------------------------------------
    # SLIDE 3: Use Cases & Dependencies
    # -------------------------------------------------------------
    s3 = prs.slides[2]
    sh_left_s3 = None
    sh_right_s3 = None
    for shape in s3.shapes:
        if shape.name == "Google Shape;94;p3":
            sh_left_s3 = shape
        elif shape.name == "Google Shape;96;p3":
            sh_right_s3 = shape

    if sh_left_s3 and sh_left_s3.has_text_frame:
        tf = sh_left_s3.text_frame
        tf.clear()
        
        items = [
            ("▶ Dairy / Livestock Enterprise (Savli, Vadodara):", True, COLOR_PRIMARY),
            ("• Margin: ₹1,00,000 sizes ₹10,00,000 project & ₹9,00,000 loan under Term Loan Scheme (8.0% p.a., 7 yrs, 6-mo grace).", False, COLOR_DARK),
            ("• Spatial radar evaluates 5 km milk chilling hubs, cooperatives, and veterinary clinics.", False, COLOR_DARK),
            ("▶ Food Processing & Flour Milling (Padra, Vadodara):", True, COLOR_PRIMARY),
            ("• Sizes ₹1,20,000 project with ₹12,000 margin under Micro Finance Scheme (6.5% p.a., 3 yrs, 3-mo grace).", False, COLOR_DARK),
            ("• Models 3-month working capital buffer for raw grain procurement.", False, COLOR_DARK),
            ("▶ Multi-Enterprise Portfolio Management:", True, COLOR_ACCENT),
            ("• Entrepreneur toggles between ventures on Dashboard, Map, Calculator, and Chat.", False, COLOR_DARK),
            ("• Aggregates combined investment (₹11.20L) and total credit eligibility (₹10.08L).", False, COLOR_DARK),
            ("▶ Trilingual Guardrailed Advisory for Bharat:", True, COLOR_PRIMARY),
            ("• Voice Q&A in Hindi/Gujarati; guardrails reject off-topic coding/trivia queries.", False, COLOR_DARK)
        ]
        for idx, (txt, bold, col) in enumerate(items):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, txt, size=9.8 if not bold else 10.5, bold=bold, color=col)

    if sh_right_s3 and sh_right_s3.has_text_frame:
        tf = sh_right_s3.text_frame
        tf.clear()
        
        dep_items = [
            ("▶ Core Software Frameworks & Runtimes:", True, COLOR_PRIMARY),
            ("• Node.js 20+ runtime & Next.js 16.3 / React 19 web framework", False, COLOR_DARK),
            ("• Prisma 5.22 ORM with SQLite relational database", False, COLOR_DARK),
            ("• Tailwind CSS v4, Lucide React icons, Canvas2D HTML5 API", False, COLOR_DARK),
            ("▶ External Services & Web APIs:", True, COLOR_PRIMARY),
            ("• Google Gemini API (Qualitative advisory & localized SWOT)", False, COLOR_DARK),
            ("• OpenStreetMap / Carto CDN (Tile layer catchment rendering)", False, COLOR_DARK),
            ("• Web Speech API (Voice recognition & speech synthesis)", False, COLOR_DARK),
            ("▶ Cloud Infrastructure & DevOps Tooling:", True, COLOR_ACCENT),
            ("• AWS EC2 Ubuntu 24.04 (t3.medium, ap-south-1b) with Elastic IP 13.126.176.46", False, COLOR_DARK),
            ("• Docker & Docker Compose multi-stage containerization", False, COLOR_DARK),
            ("• Caddy Web Server (Automated Let's Encrypt TLS issuance)", False, COLOR_DARK),
            ("• Terraform 1.5+ for declarative cloud provisioning", False, COLOR_DARK)
        ]
        for idx, (txt, bold, col) in enumerate(dep_items):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, txt, size=9.8 if not bold else 10.5, bold=bold, color=col)

    # -------------------------------------------------------------
    # SLIDE 4: Uniqueness, Future Scope & Impact
    # -------------------------------------------------------------
    s4 = prs.slides[3]
    sh_left_s4 = None
    sh_right_s4 = None
    for shape in s4.shapes:
        if shape.name == "TextBox 111":
            sh_left_s4 = shape
        elif shape.name == "TextBox 112":
            sh_right_s4 = shape

    if sh_left_s4 and sh_left_s4.has_text_frame:
        tf = sh_left_s4.text_frame
        tf.clear()
        
        uniq_items = [
            "• Decoupled Deterministic Financial Engine: Unlike naive LLM wrappers that hallucinate loan math, debt sizing and moratorium schedules are computed using 100% verified statutory formulas.",
            "• Automated Statutory Scheme Routing: Intelligently routes projects <= ₹1.40L to Micro Finance (6.5% p.a., 3-mo grace) and projects > ₹1.40L to Term Loan (8.0% p.a., 6-mo grace).",
            "• Hyper-Local Concentric Catchment (5 & 10 km): Granular spatial demographic density, trade-adaptive POIs, and competitor density.",
            "• Multi-Enterprise Portfolio Engine: Solves real-world multi-business management with persistent Dossier IDs and reactive cross-app switching.",
            "• 1-Click Zero-Crash PDF Export: Proprietary Canvas2D color proxy converts modern lab/oklch color spaces, downloading clean PDFs in <1.5s with zero print dialogs.",
            "• Trilingual Accessibility with Guardrails: Native English, Hindi, and Gujarati with strict semantic guardrails preventing off-topic abuse.",
            "• Dual-Cloud Production Resilience: Live on both AWS EC2 (Docker + Caddy) and Vercel Edge."
        ]
        for idx, item in enumerate(uniq_items):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, item, size=9.8, bold=False, color=COLOR_DARK)

    if sh_right_s4 and sh_right_s4.has_text_frame:
        tf = sh_right_s4.text_frame
        tf.clear()
        
        impact_items = [
            ("▶ Measurable Socio-Economic Impact:", True, COLOR_PRIMARY),
            ("• Reduces 40%+ early enterprise mortality by replacing hearsay with data-driven demand validation.", False, COLOR_DARK),
            ("• Cuts bank appraisal preparation time from 4–6 weeks to under 90 seconds.", False, COLOR_DARK),
            ("• Unlocks statutory concessional debt for marginalized rural founders, replacing predatory moneylenders (24%–36% interest).", False, COLOR_DARK),
            ("▶ Future Engineering Scope & Roadmap:", True, COLOR_ACCENT),
            ("• SCA & JanSamarth Portal API: Direct automated loan application dispatch to State Channelizing Agencies and RRBs.", False, COLOR_DARK),
            ("• Live Mandi & APMC Feeds: Real-time price tracking via e-NAM APIs for hyper-local commodity arbitrage.", False, COLOR_DARK),
            ("• Offline Edge AI: Local on-device LLM execution (Gemma 2B / WebLLM) for zero-connectivity deep rural operation.", False, COLOR_DARK),
            ("• SHG & Cooperative Multi-Tenant Mode: Sizing pooled capital for Self-Help Groups and Women Milk Societies.", False, COLOR_DARK)
        ]
        for idx, (txt, bold, col) in enumerate(impact_items):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, txt, size=9.8 if not bold else 10.5, bold=bold, color=col)

    # -------------------------------------------------------------
    # SLIDE 6: Additional Details (Keep content limited to this slide)
    # -------------------------------------------------------------
    s6 = prs.slides[5]
    sh_left_s6 = None
    sh_right_s6 = None
    for shape in s6.shapes:
        if shape.name == "TextBox 126":
            sh_left_s6 = shape
        elif shape.name == "TextBox 127":
            sh_right_s6 = shape

    if sh_left_s6 and sh_left_s6.has_text_frame:
        tf = sh_left_s6.text_frame
        tf.clear()
        
        left_s6 = [
            ("1. Live Prototype & Verification Highlights", True, COLOR_PRIMARY),
            ("• Dual-Cloud Production Endpoints: Live and verified with HTTP/2 200 OK on AWS EC2 (https://gramsaarthi-ai.chiragvasava.me) and Vercel Edge (https://gramsaarthi.chiragvasava.me).", False, COLOR_DARK),
            ("• 1-Click Demo Evaluation Mode: Pre-configured credentials (demo@gramsaarthi.ai / demo123) allow evaluators to test all features instantly without registration friction.", False, COLOR_DARK),
            ("• Tested & Working End-to-End: Every single user journey—Registration -> Intake Wizard -> Radial Map -> Concessional Calculator -> Trilingual Chat -> Feasibility Report -> Saved Portfolio—empirically verified.", False, COLOR_DARK),
            ("• Zero Hardcoded Data: Live computeDynamicScore algorithm calculates real-time feasibility and debt structuring dynamically.", False, COLOR_DARK),
            ("• 1-Click PDF Generation: Instant client-side download in <1.5s via Canvas2D color proxy.", False, COLOR_DARK)
        ]
        for idx, (txt, bold, col) in enumerate(left_s6):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, txt, size=9.8 if not bold else 11.0, bold=bold, color=col)

    if sh_right_s6 and sh_right_s6.has_text_frame:
        tf = sh_right_s6.text_frame
        tf.clear()
        
        right_s6 = [
            ("2. Alignment with P11 Problem Statement & Screening", True, COLOR_PRIMARY),
            ("• Strict Problem Statement Alignment: Directly solves P11 requirements: hyper-local business feasibility, statutory financial structuring, rural language accessibility, and bankable reporting.", False, COLOR_DARK),
            ("• Mathematical Auditability: Zero floating-point inaccuracies or LLM hallucinated debt figures; statutory credit guidelines strictly respected.", False, COLOR_DARK),
            ("• Complete Documentation Suite: Comprehensive documentation indexed in MD_Files/ (ARCHITECTURE.md, FEATURES.md, MANUAL_TEST_REPORT.md, DEMO_SCRIPT.md, TERRAFORM.md, DEPLOYMENT_CASE_STUDY.md).", False, COLOR_DARK),
            ("• Clean Public Codebase: Hosted on GitHub (https://github.com/ChiragVasava/gramsaarthi-ai) with clean commit history, Dockerfiles, and Terraform IaC.", False, COLOR_DARK),
            ("• Demonstration Video Ready: Rehearsed 3-minute video recording script prepared in MD_Files/DEMO_SCRIPT.md covering the complete walkthrough.", False, COLOR_DARK)
        ]
        for idx, (txt, bold, col) in enumerate(right_s6):
            p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
            format_paragraph(p, txt, size=9.8 if not bold else 11.0, bold=bold, color=col)

    # Save to Elimination Submission
    prs.save(out_elim_pptx)
    print(f"Updated 6-slide presentation saved to: {out_elim_pptx}")
    
    # Save copy to MD_Files
    prs.save(out_md_pptx)
    print(f"Updated 6-slide presentation saved to: {out_md_pptx}")

if __name__ == "__main__":
    update_presentation()
