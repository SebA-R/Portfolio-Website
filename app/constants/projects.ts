import { Project } from "../types";

export const PROJECTS: Project[] = [
  // ── Mar 2026 ──────────────────────────────────────────────────────────────
  {
    title: 'wallhacks',
    date: 'Mar 2026',
    subtext: '1st Place Overall, Hack Canada 2026. Real-time person detection using five synchronized LD2450 mmWave radar modules with FFT + sensor fusion, visualized as AR confidence heatmaps on WebXR headsets.',
    url: 'https://devpost.com/software/wyfyre',
    favourite: true,
  },
  {
    title: 'Model Studio',
    date: 'Mar 2026',
    subtext: 'YHack Spring 2026. AI virtual try-on with 24fps frame-by-frame garment replacement using segmentation, captioning, and generative synthesis from 30+ retail stores.',
    url: 'https://devpost.com/software/fashionai-ytiz05',
  },
  {
    title: 'Portal Lens',
    date: 'Mar 2026',
    subtext: 'YHack Spring 2026. AR portal using 6-DOF world tracking and proximity detection to transition users into a 360° immersive environment; built from scratch in Snap Lens Studio.',
    url: 'https://devpost.com/software/alternate-world-portal-lens',
  },
  // ── Feb 2026 ──────────────────────────────────────────────────────────────
  {
    title: 'Rewrite VR',
    date: 'Feb 2026',
    subtext: 'TreeHacks 2026 (Stanford). AI platform converting prompts into explorable VR worlds using Hunyuan WorldPlay on 4xH200 GPUs, optimized from 1fps to 12fps.',
    url: 'https://devpost.com/software/rewrite-2snpat',
    favourite: true,
  },
  {
    title: 'MuSage',
    date: 'Feb 2026',
    subtext: 'Hack@Brown 2026. Real-time biometric music generation: live camera feed extracts pulse and breathing rate via PreSage, converted to MIDI in a closed C++17 feedback loop.',
    url: 'https://devpost.com/software/musage',
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    title: 'ParkinSense',
    date: 'Nov 2025',
    subtext: 'HackPrinceton. Parkinson detection from voice using SSL speech models + XGBoost ensemble. 72% accuracy, 0.84 AUROC with stratified group K-fold validation.',
    url: 'https://devpost.com/software/parkinsense-enka75',
  },
  {
    title: 'ADaptiv',
    date: 'Feb 2025',
    subtext: 'Post-production adaptive product placement pipeline using SAM3 segmentation and Wan2.1-VACE diffusion for branded object replacement in video without reshooting.',
    url: 'https://devpost.com/software/nexhacks-k016op',
    favourite: true,
  },
  {
    title: 'Lumière',
    date: 'Jan 2025',
    subtext: 'ConUHacks X. AI concierge delivering personalized luxury travel and experience recommendations via LLM-powered orchestration. MongoDB, Supabase, Gemini API, Crawl4AI.',
    url: 'https://devpost.com/software/lumiere-owdjmc',
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    title: 'N.O.M.A.D.',
    date: 'Nov 2024',
    subtext: 'UTRA Hacks 2024. Autonomous agricultural rover with 4-DOF robotic arm implementing inverse kinematics for soil sample collection and on-site moisture analysis; deployed at UofT Schools garden.',
    url: 'https://devpost.com/software/n-o-m-a-d',
  },
  {
    title: 'Labify',
    date: 'Oct 2024',
    subtext: 'Cal Hacks 12.0. Bridged DeepMind GNoME 2.2M+ AI-predicted materials with automated FEA/CFD simulation workflows for aerospace and biomedical validation.',
    url: 'https://devpost.com/software/autonomous-lab',
  },
  {
    title: 'DELFI',
    date: '2024',
    subtext: 'Chemical Science, RSC. Computer oracle for recommending density functional theory methods for excited states calculations. Co-authored with Avagliano, Skreta, Aspuru-Guzik.',
    url: 'https://scholar.google.com/citations?user=ocwc6XgAAAAJ',
  },
  {
    title: 'Chemspyd',
    date: '2024',
    subtext: 'Digital Discovery, RSC. Open-source Python interface for Chemspeed robotic chemistry and materials platforms. Co-authored with Seifrid, Strieth-Kalthoff, Aspuru-Guzik et al.',
    url: 'https://scholar.google.com/citations?user=ocwc6XgAAAAJ',
  },
  {
    title: 'FindMD',
    date: 'Jan 2024',
    subtext: 'Autonomous voice-agent system that calls clinics, conducts natural conversations, and verifies real-time patient intake using LLM-driven dialogue with Twilio + ElevenLabs.',
    url: 'https://devpost.com/software/findmd-4xqups',
  },
  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    title: 'LLMs for Chemistry Robotics',
    date: 'Oct 2023',
    subtext: 'Autonomous Robots, Springer (vol. 47, no. 8). Full-stack interface for instruction-guided task programming of chemistry lab robots via LLMs. Flask, Flask-SocketIO, OpenAI SDK.',
    url: 'https://scholar.google.com/citations?user=ocwc6XgAAAAJ',
  },
  {
    title: 'P.A.C.U.',
    date: 'Oct 2023',
    subtext: 'Portable Autonomous Chemistry Unit. Affordable robotic chemistry lab performing flow chemistry, Raman spectroscopy, and HPLC. Featured in Ingenious+ Ontario.',
    url: 'https://github.com/SebA-R',
  },
  {
    title: 'ChemSkills',
    date: 'Apr 2023',
    subtext: 'Hack the Ridge 2023. Chemistry education platform with algorithmic question generation spanning nomenclature to stoichiometry, with teacher/student classroom management workflows.',
    url: 'https://devpost.com/software/chemskills',
  },
  {
    title: 'CLAIRify',
    date: 'Mar 2023',
    subtext: 'Verifier-assisted iterative prompting framework for chemistry DSL generation. arXiv:2303.14100. 250+ citations. Presented to 150+ attendees at the Acceleration Consortium.',
    url: 'https://ac-rad.github.io/clairify',
    favourite: true,
  },
];
