/**
 * Seed script: Unit 2 — Topics 3 (Impacts), 4 (Application Skills), 5 (Project Management)
 * Run with: npm run db:seed-topics-3-5
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// ─────────────────────────────────────────────────────────────
// TOPIC 3: IMPACTS OF TECHNOLOGY
// ─────────────────────────────────────────────────────────────

const topic3Lessons = [
  {
    title: 'Types of Computer Crime',
    type: 'article',
    order_index: 1,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is Computer Crime?', level: 2 },
        { type: 'paragraph', text: 'Computer crime (also called cybercrime) is any criminal activity that involves a computer, network, or the internet. As our lives become increasingly digital, cybercrime has grown into one of the most significant threats to individuals, businesses, and governments worldwide.' },
        { type: 'callout', variant: 'info', text: 'The Australian Cyber Security Centre (ACSC) receives over 76,000 cybercrime reports per year — roughly one report every 7 minutes. The average cost of cybercrime to an Australian small business is over $39,000.' },
        { type: 'key_term', term: 'Cybercrime', definition: 'Criminal activity carried out using a computer, network, or the internet — either as the tool or the target of the crime.' },
        { type: 'heading', text: 'Common Types of Computer Crime', level: 2 },
        { type: 'key_term', term: 'Unauthorised Access (Hacking)', definition: 'Gaining access to a computer system or network without permission. In Australia, this is illegal under the Criminal Code Act 1995, even if no data is taken.' },
        { type: 'key_term', term: 'Identity Theft', definition: "Stealing someone's personal information (name, date of birth, passwords, financial details) to impersonate them — usually for financial gain." },
        { type: 'key_term', term: 'Phishing', definition: 'Sending fraudulent emails, texts, or websites that appear legitimate to trick people into revealing passwords, credit card numbers, or other sensitive information.' },
        { type: 'key_term', term: 'Ransomware', definition: 'Malware that encrypts a victim\'s files and demands payment (a ransom) in exchange for the decryption key. Often spread via phishing emails or infected websites.' },
        { type: 'key_term', term: 'Denial of Service (DoS/DDoS)', definition: 'Flooding a server or website with traffic to make it unavailable to legitimate users. A Distributed DoS (DDoS) uses many compromised devices simultaneously.' },
        { type: 'key_term', term: 'Online Fraud', definition: 'Using the internet to deceive people for financial gain — including fake online stores, investment scams, and romance scams.' },
        { type: 'key_term', term: 'Computer Viruses', definition: 'Malicious programs that attach themselves to legitimate files and replicate when executed, spreading to other files and systems. Viruses can corrupt data, slow systems, or act as a delivery mechanism for other malware.' },
        { type: 'key_term', term: 'Cyber Stalking', definition: 'Using digital technology to repeatedly monitor, harass, or intimidate a specific person — including tracking their location, sending threatening messages, or surveilling their online activity without consent. A criminal offence in Australia.' },
        {
          type: 'table',
          headers: ['Crime Type', 'Example', 'Impact'],
          rows: [
            ['Hacking', 'Breaking into a company\'s database to steal customer records', 'Financial loss, reputational damage, data breach'],
            ['Identity Theft', 'Using stolen details to open credit cards in someone\'s name', 'Financial loss, credit rating damage, years to recover'],
            ['Computer Viruses', 'A virus attached to an email attachment corrupts all files when opened', 'Data loss, system damage, spread to contacts'],
            ['Ransomware', 'Hospital files encrypted — pay or lose patient records', 'Business shutdown, data loss, public safety risk'],
            ['Phishing', 'Fake "ATO" email asking for tax file number', 'Identity theft, financial loss, account compromise'],
            ['Cyber Stalking', 'Tracking a person\'s location and sending repeated threatening messages online', 'Fear, psychological trauma, physical safety risk'],
            ['DDoS', 'Flooding a banking website during business hours', 'Service outage, revenue loss, customer distrust'],
          ],
        },
        { type: 'heading', text: 'Australian Law', level: 2 },
        { type: 'paragraph', text: 'In Australia, computer crimes are primarily covered by the Criminal Code Act 1995 (Cth), Part 10.7 — Computer Offences. Key offences include: unauthorised access to or modification of computer data; and unauthorised impairment of electronic communications. State and territory laws also apply.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Unauthorised access: up to 2 years imprisonment',
            'Unauthorised modification: up to 10 years imprisonment',
            'Causing serious damage: up to 10 years imprisonment',
            'Attacking critical infrastructure (hospitals, utilities): up to 25 years imprisonment',
          ],
        },
        { type: 'callout', variant: 'important', text: 'Report cybercrime to the Australian Cyber Security Centre at cyber.gov.au or call 1300 CYBER1. Financial cybercrime should also be reported to the Australian Federal Police (AFP).' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'tcc-q1', text: 'Which type of cybercrime involves encrypting a victim\'s files and demanding payment to restore access?', options: ['Phishing', 'Identity theft', 'Ransomware', 'DDoS attack'], correct_index: 2, explanation: 'Ransomware is malware that encrypts files and demands a ransom for the decryption key. Notable examples include WannaCry (2017) which affected over 200,000 systems in 150 countries, including UK hospitals.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'tcc-q2', text: 'In Australia, accessing a computer system without permission is only illegal if data is actually stolen.', correct_answer: false, explanation: 'False. Under the Criminal Code Act 1995, unauthorised access to a computer system is itself a crime, regardless of whether data is taken. The act of accessing without permission is the offence.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'tcc-q3', text: 'A criminal sends thousands of fake emails pretending to be from a bank, asking recipients to verify their login details. What type of cybercrime is this?', options: ['Hacking', 'Ransomware', 'DDoS attack', 'Phishing'], correct_index: 3, explanation: 'Phishing uses fraudulent communications (emails, texts, websites) that appear to come from legitimate sources to trick people into revealing sensitive information. Spear phishing targets specific individuals or organisations.' },
      ],
    },
  },

  {
    title: 'Copyright and Intellectual Property',
    type: 'article',
    order_index: 2,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is Intellectual Property?', level: 2 },
        { type: 'paragraph', text: "Intellectual property (IP) refers to creations of the mind — inventions, literary and artistic works, designs, and symbols. Just as physical property can be owned, IP can be owned, bought, sold, and protected by law. In the digital age, understanding IP rights is essential for anyone creating or consuming digital content." },
        { type: 'key_term', term: 'Intellectual Property (IP)', definition: 'Legal rights that protect creations of the mind, giving creators control over how their work is used.' },
        { type: 'heading', text: 'Types of Intellectual Property', level: 2 },
        {
          type: 'table',
          headers: ['Type', 'Protects', 'Duration (Australia)', 'Example'],
          rows: [
            ['Copyright', 'Original creative works (text, music, art, software, film)', "Life of creator + 70 years", 'A song, a novel, this website\'s code'],
            ['Trademark', 'Brand names, logos, slogans used in commerce', '10 years, renewable indefinitely', 'Apple logo, "Just Do It"'],
            ['Patent', 'New inventions and processes', '20 years from application', 'A new type of battery, a drug formula'],
            ['Trade Secret', 'Confidential business information', 'Indefinite (if kept secret)', 'KFC\'s recipe, Google\'s search algorithm'],
          ],
        },
        { type: 'heading', text: 'Copyright in Australia', level: 2 },
        { type: 'paragraph', text: 'In Australia, copyright is governed by the Copyright Act 1968 (Cth). Copyright is automatic — you do not need to register or use the © symbol for protection to apply. As soon as you create an original work and express it in a material form (writing it down, recording it, coding it), copyright applies.' },
        { type: 'callout', variant: 'info', text: 'You cannot copyright an idea — only its expression. Two people can independently write a song about the same topic without infringing each other\'s copyright, as long as they do not copy the actual music or lyrics.' },
        { type: 'heading', text: 'Fair Dealing Exceptions', level: 2 },
        { type: 'paragraph', text: 'Australian copyright law includes "fair dealing" exceptions — situations where you can use copyrighted material without permission:' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Research or study — copying for your own educational use',
            'Criticism or review — quoting a work to comment on it',
            'Parody or satire — using a work for humorous commentary',
            'Reporting news — reproducing content in news reporting',
            'Judicial proceedings — using works in court',
          ],
        },
        { type: 'heading', text: 'Creative Commons Licences', level: 2 },
        { type: 'paragraph', text: 'Creative Commons (CC) licences allow creators to share their work with conditions. They are widely used online and are important to understand when finding images, music, or content for your projects.' },
        {
          type: 'table',
          headers: ['Licence', 'What you can do'],
          rows: [
            ['CC BY', 'Use freely — must give credit to the creator'],
            ['CC BY-SA', 'Use freely with credit — derivative works must use the same licence'],
            ['CC BY-ND', 'Use freely with credit — cannot modify the work'],
            ['CC BY-NC', 'Non-commercial use only — must give credit'],
            ['CC0 (Public Domain)', 'Use freely with no restrictions — creator waived all rights'],
          ],
        },
        { type: 'heading', text: 'Digital Piracy', level: 2 },
        { type: 'paragraph', text: 'Digital piracy is the unauthorised copying, distribution, or downloading of copyrighted digital content — software, music, films, books, and games. It is illegal in Australia under the Copyright Act 1968 and can result in civil penalties.' },
        { type: 'callout', variant: 'warning', text: 'Downloading a pirated film is not a "victimless crime". It deprives creators, writers, musicians, and software developers of income. In Australia, copyright holders can obtain court orders requiring ISPs to block piracy sites.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'cip-q1', text: 'Under Australian law, when does copyright protection begin for an original creative work?', options: ['When you register it with IP Australia', 'When you apply the © symbol', 'Automatically when the work is created and expressed in material form', 'After 12 months of public release'], correct_index: 2, explanation: 'Copyright in Australia is automatic. It applies as soon as you create an original work and express it in some material form (writing, recording, coding). No registration or © symbol is required.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'cip-q2', text: 'You can use a copyrighted image in your school assignment without permission, because using it for study falls under fair dealing exceptions.', correct_answer: true, explanation: 'True. Research or study is one of the fair dealing exceptions in the Copyright Act 1968. However, you should still acknowledge the source, and the amount used must be reasonable for the purpose.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'cip-q3', text: 'A student finds an image online labelled "CC BY-NC". What does this mean for how they can use it?', options: ['They cannot use it under any circumstances', 'They can use it commercially if they give credit', 'They can use it for non-commercial purposes as long as they give credit to the creator', 'They own the image once they download it'], correct_index: 2, explanation: 'CC BY-NC means Attribution Non-Commercial. You can use, share, and adapt the work as long as you give credit to the creator and use it for non-commercial purposes only. Perfect for school projects.' },
      ],
    },
  },

  {
    title: 'The Spam Act 2003',
    type: 'article',
    order_index: 3,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'What is Spam?', level: 2 },
        { type: 'paragraph', text: 'Spam refers to unsolicited bulk electronic messages — unwanted emails, text messages, or instant messages sent in large quantities, usually for commercial purposes. While spam is often just an annoyance, it is also used to distribute malware, run phishing scams, and commit fraud.' },
        { type: 'callout', variant: 'info', text: 'Around 45% of all email sent globally is spam — that\'s approximately 162 billion spam emails every day. In Australia, the Spam Act 2003 was introduced to address the growing problem of unsolicited commercial electronic messages.' },
        { type: 'heading', text: 'The Spam Act 2003 (Cth)', level: 2 },
        { type: 'paragraph', text: 'The Spam Act 2003 is an Australian federal law that regulates commercial electronic messages — emails, SMS, MMS, and instant messages. It is administered by the Australian Communications and Media Authority (ACMA).' },
        { type: 'key_term', term: 'Commercial Electronic Message (CEM)', definition: 'An electronic message that offers, advertises, or promotes goods, services, or business opportunities — regardless of whether the sender is based in Australia.' },
        { type: 'heading', text: 'Three Core Rules', level: 2 },
        { type: 'paragraph', text: 'The Spam Act requires that all commercial electronic messages comply with three rules:' },
        {
          type: 'table',
          headers: ['Rule', 'What it means', 'Example'],
          rows: [
            ['1. Consent', 'You must have the recipient\'s permission before sending commercial messages. Consent can be express (they signed up) or inferred (existing business relationship).', 'A customer who purchased from your store in the last 2 years = inferred consent'],
            ['2. Identify', 'The message must clearly identify who sent it and provide accurate contact information. Anonymous sending is prohibited.', 'Must include business name, ABN, and contact details'],
            ['3. Unsubscribe', 'Every commercial message must include a working unsubscribe facility. Opt-out requests must be processed within 5 business days.', 'An "Unsubscribe" link that actually works and is honoured'],
          ],
        },
        { type: 'callout', variant: 'important', text: 'The unsubscribe mechanism must work for at least 30 days after the message is sent. Ignoring unsubscribe requests is a separate breach of the Act.' },
        { type: 'heading', text: 'Penalties', level: 2 },
        { type: 'paragraph', text: 'Breaching the Spam Act can result in serious penalties. The ACMA can issue infringement notices and take court action.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Individual penalties: up to $275,000 per day for repeated breaches',
            'Corporate penalties: up to $1.375 million per day for repeated breaches',
            'Criminal penalties: up to 10,000 penalty units for serious offences',
            'The ACMA has taken court action resulting in penalties of over $1 million against Australian spammers',
          ],
        },
        { type: 'heading', text: 'What is NOT Covered?', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Government messages (e.g. ATO notifications, Centrelink updates)',
            'Messages from charities and political parties (some exemptions apply)',
            'Factual messages that are not commercial in nature',
            'Messages where the recipient gave permission and cannot opt out (e.g. subscription service terms)',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'sa-q1', text: 'Under the Spam Act 2003, within how many business days must a business process an unsubscribe request?', options: ['1 business day', '5 business days', '10 business days', '30 business days'], correct_index: 1, explanation: 'The Spam Act requires unsubscribe requests to be honoured within 5 business days. The unsubscribe mechanism must also remain functional for at least 30 days after the message was sent.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'sa-q2', text: 'Which THREE things must every commercial electronic message include under the Spam Act 2003?', options: ['Consent, identify sender, unsubscribe mechanism', 'Privacy policy, ABN, and digital signature', 'Opt-in checkbox, sender address, and encryption', 'Trademark, legal disclaimer, and contact form'], correct_index: 0, explanation: 'The three core requirements are: (1) Consent — permission to send, (2) Identify — accurate sender identification, and (3) Unsubscribe — a working opt-out mechanism. All three must be present.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'sa-q3', text: 'A business can email any person whose email address they found publicly online, because the address is publicly available.', correct_answer: false, explanation: 'False. Publicly available email addresses do not constitute consent under the Spam Act. Consent must be given by the recipient — either expressly (they signed up) or inferred (existing business relationship within the last 2 years).' },
      ],
    },
  },

  {
    title: 'Digital Citizenship and Cyberbullying',
    type: 'article',
    order_index: 4,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is Digital Citizenship?', level: 2 },
        { type: 'paragraph', text: 'Digital citizenship refers to the responsible, ethical, and safe use of technology and the internet. Just as being a good citizen in the physical world involves following laws, respecting others, and contributing positively to the community — digital citizenship applies the same principles to our online lives.' },
        { type: 'key_term', term: 'Digital Citizenship', definition: 'The responsible and ethical use of technology, including understanding digital rights and responsibilities, online safety, and the impact of online behaviour on others.' },
        { type: 'heading', text: 'Digital Rights and Responsibilities', level: 2 },
        {
          type: 'table',
          headers: ['Right', 'Corresponding Responsibility'],
          rows: [
            ['Access — the right to use technology and the internet', 'Use that access ethically and legally'],
            ['Privacy — the right to keep personal information private', "Respect others' privacy and data"],
            ['Free expression — the right to share opinions online', 'Do not use this to harm, harass, or spread misinformation'],
            ['Safety — the right to feel safe online', 'Do not create environments that threaten others\' safety'],
          ],
        },
        { type: 'heading', text: 'What is Cyberbullying?', level: 2 },
        { type: 'paragraph', text: 'Cyberbullying is the repeated, intentional use of digital technology to harm, harass, humiliate, or intimidate another person. Unlike physical bullying, it can follow victims into their homes and occur 24/7, making it particularly harmful.' },
        { type: 'key_term', term: 'Cyberbullying', definition: 'Repeated, intentional use of digital technology (social media, messaging apps, online games, email) to harass, intimidate, or harm another person.' },
        { type: 'heading', text: 'Forms of Cyberbullying', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Harassment — sending repeated offensive, threatening, or insulting messages',
            'Exclusion — deliberately excluding someone from online groups or activities',
            'Impersonation — creating fake accounts to pose as the victim or post harmful content as them',
            'Outing — sharing someone\'s private information or images without consent',
            'Cyberstalking — repeated, threatening monitoring of someone\'s online activity',
            'Trolling — posting inflammatory content deliberately to provoke and upset others',
          ],
        },
        { type: 'heading', text: 'Impacts of Cyberbullying', level: 2 },
        {
          type: 'callout', variant: 'important',
          text: 'Australian research shows 1 in 5 young people experience cyberbullying. Victims experience significantly higher rates of anxiety, depression, and social withdrawal. In severe cases, cyberbullying has been linked to self-harm and suicide.',
        },
        { type: 'heading', text: 'The eSafety Commissioner', level: 2 },
        { type: 'paragraph', text: 'Australia\'s eSafety Commissioner is the world\'s first government agency dedicated to online safety. The Commissioner has legal powers to require platforms to remove harmful content and can investigate serious cyberbullying complaints.' },
        {
          type: 'list', style: 'numbered',
          items: [
            'If you\'re being cyberbullied: save evidence (screenshots), block the person, tell a trusted adult',
            'Report to the platform using their reporting tools (most platforms must respond within 24 hours)',
            'If content is not removed: report to the eSafety Commissioner at esafety.gov.au',
            'If you feel unsafe or in danger: contact police or call 000',
          ],
        },
        { type: 'heading', text: 'Legal Regulations for Online Conduct', level: 2 },
        { type: 'paragraph', text: 'Several Australian laws regulate how people behave online. Ignorance of the law is not a defence — every digital citizen needs to understand these:' },
        {
          type: 'table',
          headers: ['Regulation / Concept', 'What it covers', 'Example of a breach'],
          rows: [
            ['Copyright (Copyright Act 1968)', 'Protects original creative works — you cannot copy, share, or use others\' work without permission or a licence', 'Downloading a movie without paying; using a photo from Google without attribution'],
            ['Piracy', 'Illegally copying or distributing software, music, films, or other digital content without the creator\'s permission', 'Sharing a cracked version of software; streaming from an illegal site'],
            ['Slander / Defamation', 'Making false statements of fact about a person that damage their reputation. Online posts, reviews, and comments can constitute defamation — and the same laws that apply offline apply online.', 'Posting a false claim that someone committed a crime; writing a fake negative review about a person'],
            ['Cyberbullying', 'Repeated, intentional use of technology to harm another person. Covered by state and federal laws and the eSafety Commissioner\'s powers', 'Repeatedly sending offensive messages; posting humiliating photos without consent'],
            ['Spam Act 2003', 'Commercial electronic messages must have consent, identify the sender, and include an unsubscribe option', 'Sending bulk promotional emails to people who did not sign up'],
          ],
        },
        { type: 'key_term', term: 'Defamation / Slander', definition: 'Publishing or stating false facts about a person that damage their reputation. In Australian law, defamation applies to online posts just as much as printed material — you can be sued for a defamatory social media post.' },
        { type: 'callout', variant: 'warning', text: 'Slander and defamation: In Australia, it does not matter whether a false damaging statement is made in a newspaper, on TV, or in a social media post — defamation law applies equally. Young people have faced legal action over social media posts.' },
        { type: 'heading', text: 'Online Conduct Expectations', level: 2 },
        { type: 'callout', variant: 'tip', text: 'The "Would I say it to their face?" test: If you wouldn\'t say something directly to someone\'s face, don\'t post it online. Digital messages feel less real — but their impact on real people is just as significant.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'dc-q1', text: 'Which of the following is the BEST first step if you are being cyberbullied?', options: ['Retaliate with insulting messages so they stop', 'Delete your social media accounts permanently', 'Save evidence, block the bully, and tell a trusted adult', 'Do nothing — ignoring it will make it stop'], correct_index: 2, explanation: 'Saving evidence preserves proof of the bullying, blocking prevents further contact, and telling a trusted adult ensures you get appropriate support. Retaliating often escalates the situation and deleting accounts may destroy evidence.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'dc-q2', text: 'Cyberbullying is less harmful than physical bullying because it only happens online, not in person.', correct_answer: false, explanation: 'False. Research consistently shows cyberbullying can be more harmful than physical bullying because it: follows victims into their homes 24/7, can reach a much wider audience, leaves a permanent digital record, and the perceived anonymity can make bullies more extreme.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'dc-q3', text: 'What is the role of the eSafety Commissioner in Australia?', options: ['To write laws about online behaviour for parliament to pass', 'To investigate serious cyberbullying and require platforms to remove harmful content', 'To manage Australia\'s internet service providers and bandwidth', 'To create educational websites for primary school children only'], correct_index: 1, explanation: 'The eSafety Commissioner has legal powers to investigate serious online safety issues and require platforms to remove harmful content. They also provide education and resources. Report at esafety.gov.au.' },
      ],
    },
  },

  {
    title: 'Health Impacts of Technology',
    type: 'article',
    order_index: 5,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'Technology and Our Health', level: 2 },
        { type: 'paragraph', text: 'Technology has transformed how we work, communicate, and entertain ourselves — but this comes with health implications. Understanding both the physical and psychological impacts of technology use helps us make informed decisions about our digital habits and design better workspaces.' },
        { type: 'heading', text: 'Physical Health Impacts', level: 2 },
        { type: 'key_term', term: 'Repetitive Strain Injury (RSI)', definition: 'Pain and damage caused by repetitive movements over time — commonly affecting wrists, hands, and forearms in computer users. Also called musculoskeletal disorder.' },
        { type: 'key_term', term: 'Computer Vision Syndrome (CVS)', definition: 'Eye strain, headaches, blurred vision, and dry eyes caused by prolonged screen use. Affects up to 90% of regular computer users.' },
        { type: 'key_term', term: 'Ergonomics', definition: 'The science of designing workspaces and tools to fit the human body, reducing physical strain and injury risk.' },
        {
          type: 'table',
          headers: ['Physical Issue', 'Cause', 'Prevention'],
          rows: [
            ['RSI / Wrist pain', 'Repetitive typing/clicking, poor wrist position', 'Ergonomic keyboard/mouse, regular breaks, wrist stretches'],
            ['Back and neck pain', 'Poor posture, slouching, screen too high or low', 'Ergonomic chair, screen at eye level, lumbar support'],
            ['Eye strain (CVS)', 'Prolonged screen use, glare, poor lighting', '20-20-20 rule, reduce glare, blink frequently'],
            ['Sedentary effects', 'Sitting for long periods — linked to obesity, diabetes', 'Stand up every 30 min, use standing desk, regular exercise'],
            ['Headaches', 'Screen glare, eye strain, dehydration', 'Blue light filter, stay hydrated, proper lighting'],
          ],
        },
        {
          type: 'callout', variant: 'tip',
          text: 'The 20-20-20 rule: Every 20 minutes, look at something 20 feet (6 metres) away for 20 seconds. This relaxes the eye muscles that focus on close objects and significantly reduces eye strain.',
        },
        { type: 'heading', text: 'Psychological Health Impacts', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Social isolation — excessive screen time can replace face-to-face social interaction, leading to loneliness',
            'Anxiety and depression — heavy social media use is associated with increased rates of anxiety and depression, particularly in young people',
            'Sleep disruption — blue light from screens suppresses melatonin production, making it harder to fall asleep. Using devices before bed delays sleep onset by up to an hour',
            'Technology addiction — compulsive use of phones, social media, or games that interferes with daily life and responsibilities',
            'FOMO (Fear of Missing Out) — anxiety from seeing others\' social media posts, creating pressure to be constantly connected',
            'Cyberbullying impacts — as covered in the previous lesson, online harassment has significant mental health consequences',
          ],
        },
        { type: 'heading', text: 'Impact on Communication Methods', level: 2 },
        { type: 'paragraph', text: 'Digital technology has fundamentally changed how we communicate — not just how often, but the nature of communication itself.' },
        {
          type: 'table',
          headers: ['Change', 'Positive Impact', 'Negative Impact'],
          rows: [
            ['Instant messaging / social media', 'Communicate with anyone, anywhere, instantly; maintain relationships across distance', 'Reduced face-to-face interaction; misunderstandings without tone/body language; pressure to respond immediately'],
            ['Email replacing letters', 'Faster, cheaper, searchable; can reach multiple recipients simultaneously', 'Information overload; spam; shorter, less thoughtful communication'],
            ['Video calls (Zoom, FaceTime)', 'Visual communication across any distance; reduced need for travel', 'Screen fatigue; technical issues; less spontaneous than in-person'],
            ['Social media replacing traditional media', 'Anyone can publish and share information; diverse voices heard', 'Misinformation spreads faster; filter bubbles; reduced trust in media'],
            ['Digital communication records', 'Messages can be saved, searched, and referenced later', 'Permanent record of mistakes; privacy concerns; screenshots shared without consent'],
          ],
        },
        { type: 'callout', variant: 'info', text: 'Research shows Australians send over 20 billion SMS messages and billions of social media messages per year — yet report feeling lonelier than previous generations. Digital communication quantity has increased while the quality of deep, meaningful interaction has often decreased.' },
        { type: 'heading', text: 'Digital Wellness', level: 2 },
        { type: 'paragraph', text: 'Digital wellness is about developing a healthy relationship with technology — getting the benefits while managing the risks.' },
        {
          type: 'list', style: 'numbered',
          items: [
            'Set screen time limits — use device tools to track and limit daily usage',
            'Create tech-free times — no devices during meals, 1 hour before bed',
            'Take regular breaks — follow the 20-20-20 rule; stand and stretch hourly',
            'Set up an ergonomic workspace — chair height, screen position, keyboard placement',
            'Prioritise in-person connection — schedule time with friends and family away from screens',
            'Turn off non-essential notifications — reduces constant interruptions and anxiety',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'hit-q1', text: 'What does the 20-20-20 rule recommend?', options: ['Take 20 steps every 20 minutes for 20 days', 'Every 20 minutes, look at something 6 metres away for 20 seconds', 'Use your screen for a maximum of 20 minutes, 20 times per day', 'Take 20 minutes off for every 20 minutes of screen use'], correct_index: 1, explanation: 'The 20-20-20 rule: every 20 minutes, look at something 20 feet (6 metres) away for 20 seconds. This relaxes the eye muscles that focus on near objects, reducing Computer Vision Syndrome symptoms.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'hit-q2', text: 'Blue light from screens can disrupt sleep by suppressing melatonin production.', correct_answer: true, explanation: 'True. Blue wavelength light from screens signals to your brain that it\'s daytime, suppressing melatonin — the hormone that regulates sleep. Using screens within 1-2 hours of bedtime can delay sleep onset and reduce sleep quality.' },
        { type: 'exercise_question', question_type: 'matching', id: 'hit-q3', text: 'Match each health term to its correct definition.', pairs: [{ term: 'RSI', definition: 'Pain from repetitive movements, e.g. wrist pain from typing' }, { term: 'CVS', definition: 'Eye strain and headaches from prolonged screen use' }, { term: 'Ergonomics', definition: 'Designing workspaces to fit the human body and reduce injury' }, { term: 'FOMO', definition: 'Anxiety from feeling others are having better experiences' }] },
      ],
    },
  },

  {
    title: 'Impacts of Technology Review Quiz',
    type: 'quiz',
    order_index: 6,
    estimated_minutes: 15,
    content: {
      pass_score: 7,
      questions: [
        { id: 'imp-rq1', type: 'mcq', text: 'Which Australian federal law covers computer offences including unauthorised access to systems?', options: ['Privacy Act 1988', 'Criminal Code Act 1995', 'Copyright Act 1968', 'Spam Act 2003'], correct_index: 1, explanation: 'The Criminal Code Act 1995 (Cth), Part 10.7 covers computer offences in Australia, including unauthorised access, modification, and impairment of computer systems.' },
        { id: 'imp-rq2', type: 'mcq', text: 'Malware that encrypts a victim\'s files and demands payment for the decryption key is called:', options: ['A virus', 'Spyware', 'Ransomware', 'A trojan'], correct_index: 2, explanation: 'Ransomware encrypts files and demands payment (ransom) for the key to restore access. It is one of the most damaging forms of cybercrime, affecting hospitals, businesses, and individuals.' },
        { id: 'imp-rq3', type: 'true_false', text: 'In Australia, copyright is automatic — a creator does not need to register their work or use the © symbol for it to be protected.', correct_answer: true, explanation: 'True. Under the Copyright Act 1968, copyright applies automatically as soon as an original work is created and expressed in material form. No registration is required.' },
        { id: 'imp-rq4', type: 'mcq', text: 'Which Creative Commons licence allows completely free use with no restrictions?', options: ['CC BY', 'CC BY-NC', 'CC BY-ND', 'CC0 (Public Domain)'], correct_index: 3, explanation: 'CC0 means the creator has waived all rights and the work is in the public domain — free to use for any purpose with no attribution required.' },
        { id: 'imp-rq5', type: 'mcq', text: 'Under the Spam Act 2003, commercial electronic messages must include which three things?', options: ['Consent, identification, and an unsubscribe mechanism', 'A privacy policy, an ABN, and a digital signature', 'Date, subject line, and opt-in confirmation', 'Author credentials, purpose, and expiry date'], correct_index: 0, explanation: 'The Spam Act\'s three core requirements are: (1) consent from the recipient, (2) accurate identification of the sender, and (3) a functional unsubscribe mechanism.' },
        { id: 'imp-rq6', type: 'true_false', text: 'The eSafety Commissioner can legally require social media platforms to remove harmful cyberbullying content.', correct_answer: true, explanation: 'True. Australia\'s eSafety Commissioner has legal powers to investigate complaints and issue notices requiring platforms to remove harmful content. Platforms that fail to comply can face significant penalties.' },
        { id: 'imp-rq7', type: 'mcq', text: 'A student receives dozens of insulting comments on all their social media posts every day from the same group of people. This is best described as:', options: ['Healthy debate and free speech', 'Cyberbullying — repeated, intentional online harm', 'Trolling — which is protected speech', 'A misunderstanding that does not need to be reported'], correct_index: 1, explanation: 'Repeated, intentional use of digital technology to harm or humiliate another person is cyberbullying. It should be reported, documented, and if necessary escalated to the eSafety Commissioner.' },
        { id: 'imp-rq8', type: 'mcq', text: 'What does the 20-20-20 rule help prevent?', options: ['RSI from typing', 'Social isolation from excessive device use', 'Computer Vision Syndrome (eye strain)', 'Data loss from overheating'], correct_index: 2, explanation: 'The 20-20-20 rule (every 20 minutes, look 6m away for 20 seconds) specifically targets Computer Vision Syndrome by relaxing the eye muscles that focus on near objects.' },
        { id: 'imp-rq9', type: 'true_false', text: 'Blue light from screens can suppress melatonin production, making it harder to fall asleep.', correct_answer: true, explanation: 'True. Blue light mimics daylight and suppresses melatonin, the hormone that signals your body to sleep. Avoiding screens for 1-2 hours before bed improves sleep quality.' },
        { id: 'imp-rq10', type: 'mcq', text: 'Ergonomics is best defined as:', options: ['The study of how computers work internally', 'Designing workspaces and tools to fit the human body and reduce injury', 'A type of RSI affecting keyboard users', 'The science of digital wellness and screen time management'], correct_index: 1, explanation: 'Ergonomics is the science of designing equipment and environments that fit the user\'s body, minimising strain and injury risk. A well-set-up workstation is the foundation of physical health for computer users.' },
      ],
    },
  },
]

// ─────────────────────────────────────────────────────────────
// TOPIC 4: APPLICATION SKILLS
// ─────────────────────────────────────────────────────────────

const topic4Lessons = [
  {
    title: 'Presentation Software — Features',
    type: 'article',
    order_index: 1,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Presentation Software', level: 2 },
        { type: 'paragraph', text: 'Presentation software allows users to create visual slide shows that combine text, images, charts, video, and animations to communicate information to an audience. It is one of the most widely used tools in business, education, and professional life.' },
        { type: 'heading', text: 'Common Presentation Tools', level: 2 },
        {
          type: 'table',
          headers: ['Software', 'Platform', 'Key Strength'],
          rows: [
            ['Microsoft PowerPoint', 'Windows, Mac, Web', 'Industry standard, most features, widely compatible'],
            ['Google Slides', 'Web-based', 'Free, real-time collaboration, cloud-based'],
            ['Apple Keynote', 'Mac, iPad, iPhone', 'Beautiful templates, smooth animations, Apple ecosystem'],
            ['Canva', 'Web-based', 'Design-focused, huge template library, easy for beginners'],
            ['Prezi', 'Web-based', 'Non-linear presentations, zoom-based navigation'],
          ],
        },
        { type: 'heading', text: 'Core Features', level: 2 },
        { type: 'key_term', term: 'Slide', definition: 'A single page within a presentation. Each slide is a canvas where you add and arrange content.' },
        { type: 'key_term', term: 'Slide Master', definition: 'A template that controls the design, fonts, and colours across all slides. Changes to the master automatically update all slides.' },
        { type: 'key_term', term: 'Transition', definition: 'The visual effect that plays between slides (e.g. fade, slide, zoom). Should be subtle — distracting transitions undermine professionalism.' },
        { type: 'key_term', term: 'Animation', definition: "Effects applied to individual elements on a slide (e.g. text 'flying in'). Use sparingly — animations should add emphasis, not distract." },
        { type: 'key_term', term: 'Placeholder', definition: 'A pre-formatted box on a slide for specific content types (title, text, image). Makes layout consistent.' },
        { type: 'heading', text: 'Design Principles — CARP', level: 2 },
        { type: 'paragraph', text: 'Good presentation design follows the CARP principles used in graphic design:' },
        {
          type: 'table',
          headers: ['Principle', 'What it means', 'Example in presentations'],
          rows: [
            ['Contrast', 'Make different things look different — especially important elements', 'Dark text on light background; large heading vs small body text'],
            ['Alignment', 'Every element should have a visual connection to something else', 'Text aligned to a grid; images aligned with margins'],
            ['Repetition', 'Repeat visual elements to create consistency', 'Same font, colour scheme, and logo position on every slide'],
            ['Proximity', 'Group related items together to show they are connected', 'Caption close to its image; bullet points grouped by topic'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'The 6×6 rule: no more than 6 bullet points per slide, no more than 6 words per bullet point. Slides should support what you say — not repeat everything word for word.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'psf-q1', text: 'What is the purpose of a Slide Master in presentation software?', options: ['To display slides in a larger format during a presentation', 'To control the design, fonts, and layout across all slides from one place', 'To export the presentation to PDF format', 'To set the order in which slides are presented'], correct_index: 1, explanation: 'The Slide Master is a template that controls the design elements across all slides. Changes to the master (fonts, colours, logo position) automatically apply to every slide, ensuring consistency.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'psf-q2', text: 'Transitions and animations should be used as frequently as possible to keep the audience engaged.', correct_answer: false, explanation: 'False. Overusing transitions and animations is distracting and unprofessional. Best practice is to use subtle, consistent transitions and animations sparingly — only when they add meaning or emphasis.' },
        { type: 'exercise_question', question_type: 'matching', id: 'psf-q3', text: 'Match each CARP design principle to its correct description.', pairs: [{ term: 'Contrast', definition: 'Make important elements visually stand out from others' }, { term: 'Alignment', definition: 'Align elements to a visual grid for a clean, organised look' }, { term: 'Repetition', definition: 'Use consistent fonts, colours, and styles throughout' }, { term: 'Proximity', definition: 'Group related elements close together to show they are connected' }] },
      ],
    },
  },

  {
    title: 'Presentation Software — Create and Present',
    type: 'article',
    order_index: 2,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Planning Your Presentation', level: 2 },
        { type: 'paragraph', text: 'A great presentation starts before you open the software. Planning the structure and content ensures you communicate your message clearly and confidently. Jumping straight into making slides without planning often results in unclear, poorly structured presentations.' },
        {
          type: 'list', style: 'numbered',
          items: [
            'Define your purpose — what do you want the audience to know, feel, or do after your presentation?',
            'Know your audience — their prior knowledge, interests, and expectations shape how you present',
            'Plan your structure — introduction (hook + overview), body (main points), conclusion (summary + call to action)',
            'Decide your key messages — what are the 3-5 most important points you want to leave the audience with?',
            'Then open the software and build your slides',
          ],
        },
        { type: 'heading', text: 'Effective Slide Design', level: 2 },
        {
          type: 'table',
          headers: ['Do', 'Avoid'],
          rows: [
            ['Use high-quality, relevant images', 'Clip art and low-resolution images'],
            ['Limit text — use keywords and phrases', 'Paragraphs of text (death by bullet point)'],
            ['Use consistent fonts — max 2 fonts', 'More than 2-3 different fonts'],
            ['Use high contrast (dark on light or light on dark)', 'Light text on light background or dark on dark'],
            ['Leave white space — let content breathe', 'Cramming content into every corner'],
            ['Use charts/graphs for data', 'Tables of raw numbers'],
          ],
        },
        { type: 'key_term', term: 'Speaker Notes', definition: "The notes panel below each slide (not visible to the audience) where you write reminders, talking points, and statistics you'll reference while presenting." },
        { type: 'heading', text: 'Presenting Effectively', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Make eye contact with the audience — not the screen behind you',
            'Speak to your audience, not to your slides — slides are visual aids, not scripts',
            'Vary your pace and tone — avoid monotone delivery',
            'Use pauses effectively — silence is powerful and gives the audience time to absorb information',
            'Practice with the actual software and equipment beforehand',
            'Arrive early to test the projector, display resolution, and connectivity',
          ],
        },
        { type: 'heading', text: 'File Formats and Sharing', level: 2 },
        {
          type: 'table',
          headers: ['Format', 'Extension', 'Best for'],
          rows: [
            ['PowerPoint', '.pptx', 'Editing and sharing with other Office users'],
            ['PDF', '.pdf', 'Sharing a read-only version that looks consistent everywhere'],
            ['Google Slides', 'Cloud link', 'Collaboration, sharing editable version online'],
            ['OpenDocument Presentation', '.odp', 'Open source software (LibreOffice Impress)'],
            ['Video export', '.mp4', 'Sharing as a self-running video with narration'],
          ],
        },
        { type: 'callout', variant: 'tip', text: "Always export a PDF backup of your presentation before presenting. If the presentation software fails, the PDF will still display your slides correctly on any device." },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'psp-q1', text: 'What is the FIRST step when planning a presentation?', options: ['Choose a template in the presentation software', 'Define your purpose — what you want the audience to know or do', 'Select transitions and animations', 'Create the title slide'], correct_index: 1, explanation: 'Defining your purpose is always the first step. Knowing what you want the audience to know, feel, or do shapes every decision that follows — structure, content, design, and tone.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'psp-q2', text: 'Speaker notes are visible to the audience during a presentation.', correct_answer: false, explanation: 'False. Speaker notes appear only on the presenter\'s screen (in presenter view mode) — the audience sees only the slide. They are a private tool for the presenter to reference key talking points, statistics, or reminders.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'psp-q3', text: 'A student needs to share their presentation with a teacher who uses a Mac, while the presentation was made on Windows. Which format ensures it displays correctly on both?', options: ['.pptx — universal format', '.pdf — preserves formatting across all devices', '.odp — open source compatible', '.key — Apple format'], correct_index: 1, explanation: 'PDF preserves all formatting and displays identically on any device or operating system. While .pptx is widely compatible, fonts and formatting can sometimes shift between Windows and Mac versions of Office.' },
      ],
    },
  },

  {
    title: 'Audio Software — Features',
    type: 'article',
    order_index: 3,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Types of Audio Software', level: 2 },
        { type: 'paragraph', text: 'Audio software enables the recording, editing, mixing, and playback of sound. It is used in music production, podcasting, film/game audio, and accessibility features. Understanding audio software is increasingly relevant as digital content creation becomes a core professional skill.' },
        {
          type: 'table',
          headers: ['Type', 'Purpose', 'Examples'],
          rows: [
            ['DAW (Digital Audio Workstation)', 'Professional recording, editing, mixing, mastering', 'GarageBand, Ableton Live, Logic Pro, FL Studio'],
            ['Audio Editor', 'Basic recording and editing of audio clips', 'Audacity (free), Adobe Audition'],
            ['Music Notation Software', 'Writing and printing sheet music', 'MuseScore (free), Sibelius, Finale'],
            ['Podcast Software', 'Recording, editing, and distributing podcasts', 'Audacity, Descript, Riverside'],
          ],
        },
        { type: 'heading', text: 'Key Features of Audio Software', level: 2 },
        { type: 'key_term', term: 'Multitrack Recording', definition: 'Recording multiple audio sources separately (voice, instruments, sound effects) on individual tracks that can be independently edited and mixed.' },
        { type: 'key_term', term: 'Waveform', definition: 'A visual representation of an audio signal — the wave shape shows volume (amplitude) over time. Used to identify and edit sections of audio.' },
        { type: 'key_term', term: 'Equaliser (EQ)', definition: 'Adjusts the balance of different frequency ranges (bass, midrange, treble) to improve or alter the sound.' },
        { type: 'key_term', term: 'Sample Rate', definition: 'How many audio samples are captured per second, measured in Hz (hertz). CD quality is 44,100 Hz (44.1 kHz). Higher rates = more accurate but larger files.' },
        { type: 'key_term', term: 'Bit Depth', definition: 'The number of bits used to represent each audio sample. CD quality is 16-bit. Higher bit depth = greater dynamic range (difference between quietest and loudest sounds).' },
        { type: 'heading', text: 'Common Audio Editing Tasks', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Trimming — removing silence or unwanted sections from the start/end of a recording',
            'Cutting and splicing — removing sections from the middle and joining the remaining pieces',
            'Noise reduction — removing background noise (hiss, hum) from recordings',
            'Normalisation — adjusting overall volume so the loudest point reaches a target level',
            'Fade in/out — gradually increasing or decreasing volume at the start or end of a clip',
            'Exporting — saving the final mix as an audio file in the desired format',
          ],
        },
        { type: 'heading', text: 'Audio File Formats', level: 2 },
        {
          type: 'table',
          headers: ['Format', 'Compression', 'Quality', 'File Size', 'Best for'],
          rows: [
            ['WAV', 'None (uncompressed)', 'Highest', 'Very large', 'Professional recording, editing masters'],
            ['MP3', 'Lossy', 'Good (some loss)', 'Small', 'Music distribution, podcasts, web'],
            ['FLAC', 'Lossless', 'Perfect (no loss)', 'Large', 'Archiving, audiophile listening'],
            ['AAC', 'Lossy', 'Better than MP3', 'Small', 'Apple devices, streaming services'],
            ['OGG', 'Lossy', 'Similar to MP3', 'Small', 'Open-source projects, games'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'asf-q1', text: 'A musician is recording a song with separate vocals, guitar, drums, and bass. Which audio software feature allows them to record and edit each instrument separately?', options: ['Normalisation', 'Multitrack recording', 'Waveform display', 'Sample rate adjustment'], correct_index: 1, explanation: 'Multitrack recording allows each instrument or voice to be recorded on its own separate track. This enables independent editing, volume adjustment, and effects for each element before they are mixed together.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'asf-q2', text: 'WAV files are smaller than MP3 files because they use lossless compression.', correct_answer: false, explanation: 'False. WAV files are uncompressed and are therefore much larger than MP3 files. MP3 uses lossy compression to reduce file size. WAV is used when audio quality is the priority (editing, archiving), while MP3 is preferred when file size matters.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'asf-q3', text: 'A podcaster wants to publish episodes online with small file sizes but acceptable audio quality. Which format is most appropriate?', options: ['WAV — highest quality', 'FLAC — lossless compression', 'MP3 — small size, good quality for speech', 'OGG — best possible quality'], correct_index: 2, explanation: 'MP3 is the standard format for podcasts and audio distributed online. It provides a good balance of audio quality and small file size, and is compatible with virtually all devices and podcast platforms.' },
      ],
    },
  },

  {
    title: 'Image Manipulation Software',
    type: 'article',
    order_index: 4,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Raster vs Vector Graphics', level: 2 },
        { type: 'paragraph', text: 'Image manipulation software falls into two broad categories based on the type of graphics they work with: raster and vector. Understanding the difference is fundamental for choosing the right tool for the job.' },
        { type: 'key_term', term: 'Raster Graphics', definition: 'Images made up of a fixed grid of pixels (picture elements). Quality degrades when scaled up. Best for photographs and realistic images. Also called bitmap graphics.' },
        { type: 'key_term', term: 'Vector Graphics', definition: 'Images defined by mathematical paths (lines, curves, shapes). Can scale to any size without quality loss. Best for logos, icons, and illustrations.' },
        {
          type: 'table',
          headers: ['Feature', 'Raster', 'Vector'],
          rows: [
            ['Made of', 'Pixels', 'Mathematical paths and shapes'],
            ['Scale quality', 'Pixelates when enlarged', 'Perfect quality at any size'],
            ['File size', 'Large (many pixels)', 'Small (just coordinates)'],
            ['Best for', 'Photos, complex artwork', 'Logos, icons, diagrams, signage'],
            ['Common formats', 'JPEG, PNG, GIF, PSD', 'SVG, AI, EPS'],
            ['Tools', 'Photoshop, GIMP, Paint.NET', 'Illustrator, Inkscape, CorelDRAW'],
          ],
        },
        { type: 'heading', text: 'Key Features of Image Manipulation Software', level: 2 },
        { type: 'key_term', term: 'Layers', definition: 'Independent transparent sheets stacked on top of each other. Each layer can contain different content (image, text, shapes) and be edited without affecting other layers.' },
        { type: 'key_term', term: 'Selection Tools', definition: 'Tools that let you select specific areas of an image for editing (lasso, magic wand, marquee). Only the selected area is affected by edits.' },
        { type: 'key_term', term: 'Resolution', definition: 'The number of pixels per unit area, measured in DPI (dots per inch) or PPI (pixels per inch). 72 DPI is standard for screen; 300 DPI is required for print quality.' },
        { type: 'key_term', term: 'Colour Correction', definition: "Adjusting an image's colour, brightness, contrast, and saturation to improve accuracy or achieve a desired look." },
        { type: 'heading', text: 'Common Image Editing Tasks', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Cropping — removing unwanted outer portions to improve composition or aspect ratio',
            'Resizing — changing dimensions; always maintain aspect ratio to avoid distortion',
            'Background removal — isolating a subject by removing or replacing the background',
            'Colour correction — fixing white balance, exposure, contrast in photographs',
            'Retouching — removing blemishes, objects, or unwanted elements',
            'Adding text or graphics — creating promotional materials, thumbnails, social media graphics',
          ],
        },
        { type: 'heading', text: 'Ethical Considerations', level: 2 },
        { type: 'callout', variant: 'warning', text: "Deepfakes and AI-generated images are making it increasingly difficult to distinguish real from manipulated images. Presenting manipulated images as real — especially of people — can constitute defamation, fraud, or harassment. Always disclose when images have been significantly altered." },
        {
          type: 'list', style: 'bullet',
          items: [
            'Never manipulate images to misrepresent facts or deceive people',
            'Do not alter photos of real people without consent — especially to portray them negatively',
            'In news and documentary contexts, significant image manipulation is considered unethical',
            'Disclose when AI tools or significant editing has been used to alter an image',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'ims-q1', text: 'A graphic designer needs to create a company logo that will be used on everything from business cards to billboard signs. Which type of graphic format is most appropriate?', options: ['Raster (JPEG) — highest quality for photos', 'Raster (PNG) — supports transparency', 'Vector (SVG or AI) — scales to any size without quality loss', 'GIF — animated and widely supported'], correct_index: 2, explanation: 'Vector graphics scale to any size perfectly, making them ideal for logos used across vastly different sizes. Raster formats would pixelate when printed on a billboard from a small original file.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'ims-q2', text: 'Working with layers in image editing software allows you to edit different parts of an image independently without affecting other elements.', correct_answer: true, explanation: 'True. Layers are one of the most powerful features in image editing software. Each layer is independent — you can move, edit, hide, or delete a layer without affecting others. This is essential for professional workflows.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'ims-q3', text: 'For printing a professional photograph at A3 size, what resolution (DPI) is generally required for high quality?', options: ['72 DPI — standard screen resolution', '150 DPI — acceptable for most printing', '300 DPI — professional print standard', '600 DPI — always use the highest available'], correct_index: 2, explanation: '300 DPI is the professional standard for print. 72 DPI is screen resolution only — printing a 72 DPI image at A3 would result in a blurry, pixelated result.' },
      ],
    },
  },

  {
    title: 'Online Database Tools',
    type: 'article',
    order_index: 5,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'What is a Database?', level: 2 },
        { type: 'paragraph', text: 'A database is an organised collection of structured data, stored and accessed electronically. Databases are the backbone of modern applications — every app you use (social media, banking, school systems) relies on databases to store, retrieve, and manage information.' },
        { type: 'key_term', term: 'Database', definition: 'An organised collection of structured data, stored electronically and managed by a database management system (DBMS).' },
        { type: 'key_term', term: 'Record', definition: 'A single entry in a database — equivalent to a row in a spreadsheet. A student record might contain: name, ID, class, and grades.' },
        { type: 'key_term', term: 'Field', definition: "A single piece of data within a record — equivalent to a column in a spreadsheet. Fields have data types (text, number, date, etc.)." },
        { type: 'key_term', term: 'Query', definition: 'A request for specific data from a database, usually with conditions (e.g. "show all students with a score above 80").' },
        { type: 'heading', text: 'CRUD Operations', level: 2 },
        { type: 'paragraph', text: 'All database interactions can be summarised as CRUD:' },
        {
          type: 'table',
          headers: ['Operation', 'What it does', 'Example'],
          rows: [
            ['Create', 'Add new records to the database', 'Enrolling a new student'],
            ['Read', 'Retrieve and display existing records', 'Viewing a student\'s report'],
            ['Update', 'Modify existing records', 'Changing a student\'s grade'],
            ['Delete', 'Remove records from the database', 'Removing a graduated student'],
          ],
        },
        { type: 'heading', text: 'Online Database Tools', level: 2 },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Best for'],
          rows: [
            ['Google Sheets', 'Spreadsheet with database features', 'Simple data storage, easy sharing, free'],
            ['Airtable', 'Visual database', 'Project management, team collaboration, no-code database'],
            ['Notion', 'All-in-one workspace with database views', 'Notes, project management, and linked databases'],
            ['Microsoft Lists', 'List/database tool within Microsoft 365', 'Business use, integrates with Teams and SharePoint'],
            ['Supabase / Firebase', 'Backend-as-a-service database', 'App development, requires technical knowledge'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'For school projects, Google Sheets or Airtable are excellent starting points. Airtable\'s "Grid View" looks like a spreadsheet but has powerful relational features — you can link records between tables.' },
        { type: 'heading', text: 'Filtering and Sorting', level: 2 },
        { type: 'paragraph', text: 'Two of the most useful database skills are filtering and sorting:' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Sorting — arranging records in order (alphabetical, by date, by value). Can be ascending (A→Z, 1→100) or descending',
            'Filtering — showing only records that meet specific criteria (e.g. only records where Status = "Active")',
            'Combining both — first filter to the relevant records, then sort them in a useful order',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'odt-q1', text: 'In a student database with fields for Name, ID, Class, and Score — what does each row represent?', options: ['A field', 'A query', 'A record', 'A filter'], correct_index: 2, explanation: 'Each row represents a record — one complete entry in the database, containing all the fields for a single item (in this case, one student\'s information).' },
        { type: 'exercise_question', question_type: 'mcq', id: 'odt-q2', text: 'Which CRUD operation would you use to correct a student\'s incorrectly entered name?', options: ['Create', 'Read', 'Update', 'Delete'], correct_index: 2, explanation: 'Update modifies an existing record. Since the student\'s record already exists, you would update (not delete and recreate) the incorrect field.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'odt-q3', text: 'Filtering a database shows only the records that match specified criteria, while leaving other records unchanged in the database.', correct_answer: true, explanation: 'True. Filtering is a view operation — it displays a subset of records based on conditions. The underlying data is not changed or deleted; filtering simply hides records that do not match until the filter is removed.' },
      ],
    },
  },

  {
    title: 'Software Troubleshooting',
    type: 'article',
    order_index: 6,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'A Systematic Approach to Troubleshooting', level: 2 },
        { type: 'paragraph', text: 'Troubleshooting is a systematic process for diagnosing and resolving problems with hardware or software. Rather than trying random solutions, a structured approach saves time, avoids making problems worse, and builds transferable skills.' },
        {
          type: 'list', style: 'numbered',
          items: [
            'Identify the problem — what exactly is happening? What were you doing when it occurred? Can you reproduce it?',
            'Research — search the exact error message; check the software\'s official help documentation; search community forums',
            'Form a hypothesis — what is the most likely cause based on your research?',
            'Test your hypothesis — implement the simplest fix first; change one thing at a time',
            'Verify the solution — confirm the problem is fully resolved, not just temporarily gone',
            'Document — record what the problem was and how it was fixed for future reference',
          ],
        },
        { type: 'heading', text: 'Common Software Problems and Solutions', level: 2 },
        {
          type: 'table',
          headers: ['Problem', 'Likely Cause', 'Solution'],
          rows: [
            ['Software crashes/freezes', 'Bug, insufficient RAM, corrupt file', 'Force quit; update software; check RAM usage; reinstall'],
            ['Software won\'t open', 'Corrupt installation, missing dependencies, permissions', 'Run as admin; repair install; reinstall; check system requirements'],
            ['Update fails', 'Insufficient storage, network issue, permissions', 'Free up storage; check internet; disable VPN; run as admin'],
            ['Compatibility error', 'Software not supported on this OS version', 'Update OS; check minimum requirements; use alternative software'],
            ['Slow performance', 'Too many background apps, outdated software, malware', 'Close other apps; update software; run malware scan'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Before contacting support, always note the exact error message (take a screenshot), the steps that led to the problem, and what you\'ve already tried. This saves significant time when seeking help.' },
        { type: 'heading', text: 'Useful Troubleshooting Techniques', level: 2 },
        { type: 'key_term', term: 'Safe Mode', definition: 'A diagnostic mode that starts software/OS with minimal drivers and features, used to determine if a problem is caused by third-party software or drivers.' },
        { type: 'key_term', term: 'Error Code / Message', definition: "A numeric or text code that identifies the specific nature of a fault. Always search the exact error message (copy-paste it) before attempting fixes." },
        { type: 'key_term', term: 'Log File', definition: 'A text file that records events and errors over time. Developers and IT professionals use logs to diagnose complex problems.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Restart first — clears temporary states and memory; resolves many issues',
            'Update the software — many bugs are fixed in updates',
            'Check system requirements — ensure your OS and hardware meet minimum specs',
            'Uninstall and reinstall — fixes corrupt installations (keep your data backed up first)',
            'Search the exact error — copy the error message and search it; someone has likely solved it before',
            'Contact support — provide error messages, steps to reproduce, and what you\'ve tried',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'st-q1', text: 'A student\'s presentation software keeps crashing when they try to insert a large image file. What should they try FIRST?', options: ['Reinstall the operating system', 'Buy a new computer', 'Restart the software, try a smaller/compressed version of the image, and check for updates', 'Delete all recent documents'], correct_index: 2, explanation: 'Start with the simplest solutions: restart, reduce the file size (the large image may be causing memory issues), and check if an update fixes the bug. Only escalate to more drastic solutions if simple fixes fail.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'st-q2', text: 'When seeking technical support, providing the exact error message and steps to reproduce the problem helps support staff diagnose and solve the issue faster.', correct_answer: true, explanation: 'True. Specific information dramatically speeds up troubleshooting. An error message is like a diagnostic code — it immediately narrows down the possible causes. "It doesn\'t work" gives support staff nothing to work with.' },
      ],
    },
  },

  {
    title: 'Planning an Interactive Project',
    type: 'article',
    order_index: 7,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is an Interactive Project?', level: 2 },
        { type: 'paragraph', text: 'An interactive project is a digital product that responds to user input — websites, apps, games, interactive presentations, and multimedia productions. Planning is the most critical phase of project development; time invested in planning prevents expensive and time-consuming mistakes during production.' },
        { type: 'heading', text: 'Project Development Stages', level: 2 },
        {
          type: 'table',
          headers: ['Stage', 'Key Activities', 'Output'],
          rows: [
            ['1. Define', 'Identify the problem/purpose; define the audience; establish requirements and constraints', 'Design brief, requirements list'],
            ['2. Design', 'Plan the solution; create storyboards/wireframes; choose tools and technologies', 'Storyboard, wireframe, style guide'],
            ['3. Develop', 'Build the product; implement features; write content', 'Working prototype, then final product'],
            ['4. Test', 'Test functionality; gather user feedback; check all requirements met', 'Test results, feedback report'],
            ['5. Evaluate', 'Assess against requirements; identify improvements; reflect on the process', 'Evaluation report'],
          ],
        },
        { type: 'heading', text: 'Storyboarding', level: 2 },
        { type: 'key_term', term: 'Storyboard', definition: 'A series of sketches or diagrams showing the planned screens, pages, or scenes of a project — like a comic strip of the planned product. Sequences content and shows how navigation or transitions work.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Plan the sequence of all screens or scenes before building',
            'Show navigation — how does the user get from one screen to another?',
            'Note content — what text, images, buttons, or media appear on each screen?',
            'Can be hand-drawn sketches or created with tools like Canva, Figma, or Google Slides',
          ],
        },
        { type: 'heading', text: 'Wireframing', level: 2 },
        { type: 'key_term', term: 'Wireframe', definition: 'A low-fidelity layout showing the structure of a screen — where elements are positioned, without colour, typography, or imagery. Focuses on functionality and layout, not visual design.' },
        { type: 'callout', variant: 'info', text: 'Wireframes save time: it takes minutes to move a button in a wireframe and hours to move it in a fully coded website. Always wireframe before coding.' },
        { type: 'heading', text: 'User Experience (UX) Considerations', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Usability — is it easy to learn and use? Can the target audience complete tasks without confusion?',
            'Navigation — can users find what they need quickly? Is the structure logical?',
            'Accessibility — can users with disabilities use the product? (screen readers, colour contrast, keyboard navigation)',
            'Consistency — are visual elements, button styles, and terminology consistent throughout?',
            'Feedback — does the product respond to user actions? (loading indicators, confirmation messages)',
          ],
        },
        { type: 'heading', text: 'Project Timeline', level: 2 },
        { type: 'paragraph', text: 'Breaking a project into milestones with deadlines ensures steady progress and early identification of problems.' },
        { type: 'key_term', term: 'Milestone', definition: 'A significant checkpoint in a project — a specific deliverable or decision point that marks progress (e.g. "storyboard complete", "prototype ready for testing").' },
        { type: 'key_term', term: 'Gantt Chart', definition: 'A horizontal bar chart showing tasks plotted against time. Each bar represents a task — its start date, duration, and dependencies on other tasks.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'pip-q1', text: 'What is the main purpose of a wireframe in the planning stage of a digital project?', options: ['To show the final colour scheme and typography', 'To show the structure and layout of screens before detailed design begins', 'To test the finished product with real users', 'To write the code for the interactive elements'], correct_index: 1, explanation: 'Wireframes show the skeletal layout of screens — where elements are positioned, without visual styling. They help plan structure and navigation early, when changes are quick and cheap, rather than during coding when changes are expensive.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'pip-q2', text: 'In project development, the Design stage comes before the Define stage.', correct_answer: false, explanation: 'False. Define always comes first. You must understand the problem, audience, and requirements before designing a solution. Designing without defining leads to building the wrong thing — wasted time and effort.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'pip-q3', text: 'A Gantt chart is useful for project planning because it:', options: ['Shows the code structure of a digital product', 'Displays tasks plotted against time, showing start dates, durations, and dependencies', 'Creates a visual design of a website\'s appearance', 'Records user feedback during testing'], correct_index: 1, explanation: 'A Gantt chart is a project management tool that shows tasks as horizontal bars on a timeline. It makes it easy to see what needs to happen, when, and what tasks depend on others being completed first.' },
      ],
    },
  },

  {
    title: 'Application Skills Review Quiz',
    type: 'quiz',
    order_index: 8,
    estimated_minutes: 20,
    content: {
      pass_score: 7,
      questions: [
        { id: 'app-rq1', type: 'mcq', text: 'What does the Slide Master in presentation software control?', options: ['The order slides appear during a presentation', 'The design, fonts, and colours applied consistently across all slides', 'The transitions between slides', 'The speaker notes for the presenter'], correct_index: 1, explanation: 'The Slide Master is a template that controls design elements (fonts, colours, logo position, layout) across all slides. Changes to the master automatically update every slide that uses it.' },
        { id: 'app-rq2', type: 'mcq', text: 'Which presentation file format is best for sharing with someone who must not be able to edit it and needs it to display identically on any device?', options: ['.pptx', '.odp', '.pdf', '.key'], correct_index: 2, explanation: 'PDF preserves formatting exactly and cannot be easily edited. It displays identically across all operating systems and devices — the safest format for sharing a final presentation.' },
        { id: 'app-rq3', type: 'true_false', text: 'Multitrack recording in audio software means all sounds are recorded together onto a single track.', correct_answer: false, explanation: 'False. Multitrack recording captures different audio sources (vocals, instruments, narration) on separate, independent tracks. This allows each to be edited, adjusted, and mixed individually.' },
        { id: 'app-rq4', type: 'mcq', text: 'A podcaster records an interview and wants to distribute it online with small file sizes. Which audio format is most suitable?', options: ['WAV — uncompressed, highest quality', 'FLAC — lossless compression', 'MP3 — lossy, small file size, widely compatible', 'OGG — open-source format'], correct_index: 2, explanation: 'MP3 is the industry standard for podcast and audio distribution. It provides acceptable quality with significantly smaller file sizes than WAV or FLAC, and works on virtually all devices and platforms.' },
        { id: 'app-rq5', type: 'mcq', text: 'A designer needs to create a logo that will be printed at sizes ranging from a business card to a building sign. Which image type is essential?', options: ['Raster (JPEG) — highest photo quality', 'Raster (PNG) — supports transparency', 'Vector (SVG or AI) — scales to any size without quality loss', 'Raster (GIF) — good for flat colour'], correct_index: 2, explanation: 'Vector graphics are defined by mathematical paths and scale to any size perfectly. Raster images are made of fixed pixels and become pixelated when enlarged — unacceptable for large-format printing.' },
        { id: 'app-rq6', type: 'true_false', text: 'In image editing software, working with layers allows you to edit elements independently without affecting other parts of the image.', correct_answer: true, explanation: 'True. Layers are independent "sheets" stacked on top of each other. Editing one layer has no effect on others, allowing complex, non-destructive editing workflows.' },
        { id: 'app-rq7', type: 'mcq', text: 'What does CRUD stand for in the context of databases?', options: ['Create, Reduce, Update, Delete', 'Create, Read, Update, Delete', 'Copy, Read, Undo, Display', 'Capture, Record, Use, Distribute'], correct_index: 1, explanation: 'CRUD stands for Create, Read, Update, Delete — the four fundamental operations performed on database records. All database interactions can be classified as one of these four types.' },
        { id: 'app-rq8', type: 'mcq', text: 'When troubleshooting software that keeps crashing, what should you do FIRST?', options: ['Reinstall the operating system', 'Search the exact error message and try the simplest solutions (restart, update)', 'Buy a new computer', 'Restore from backup and start over'], correct_index: 1, explanation: 'Always start with the simplest solutions: restart, check for updates, and search the exact error message. The majority of software problems are solved without drastic action.' },
        { id: 'app-rq9', type: 'mcq', text: 'What is the purpose of a wireframe in planning an interactive project?', options: ['To write the HTML/CSS code for the website', 'To show the final visual design with colours and images', 'To map the skeletal layout and structure of screens before detailed design', 'To document user feedback during testing'], correct_index: 2, explanation: 'Wireframes show the structure and layout of screens without visual styling. They help plan where elements go and how navigation works, allowing quick iteration before expensive development begins.' },
        { id: 'app-rq10', type: 'true_false', text: 'The Define stage of a project should always come before the Design stage.', correct_answer: true, explanation: 'True. You must understand the problem, audience, and requirements (Define) before planning a solution (Design). Designing without defining leads to building the wrong thing — a common and costly mistake.' },
      ],
    },
  },
]

// ─────────────────────────────────────────────────────────────
// TOPIC 5: PROJECT MANAGEMENT
// ─────────────────────────────────────────────────────────────

const topic5Lessons = [
  {
    title: 'The Design Process',
    type: 'article',
    order_index: 1,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is the Design Process?', level: 2 },
        { type: 'paragraph', text: 'The design process is a systematic, iterative approach to solving problems through creative and technical thinking. In IT and digital technology, it guides the development of digital solutions — ensuring products are purposeful, user-centred, and evaluated against clear criteria.' },
        { type: 'key_term', term: 'Design Process', definition: 'A structured, iterative method for developing solutions that involves research, planning, creation, and evaluation.' },
        { type: 'key_term', term: 'Iterative Design', definition: 'A design approach where a product is continuously improved through repeated cycles of design, testing, and refinement — rather than being finalised in one pass.' },
        { type: 'heading', text: 'Stages of the Design Process', level: 2 },
        {
          type: 'table',
          headers: ['Stage', 'Key Questions', 'Outputs'],
          rows: [
            ['1. Research & Analyse', 'What is the problem? Who are the users? What already exists? What are the constraints?', 'Research notes, user profiles, requirements list'],
            ['2. Design', 'What solutions are possible? What is the best approach? How will it look and function?', 'Sketches, storyboards, wireframes, design brief'],
            ['3. Produce', 'How do we build it? What tools and techniques are needed?', 'Working prototype, final product'],
            ['4. Evaluate', 'Does it solve the problem? Does it meet requirements? What could be improved?', 'Evaluation report, list of future improvements'],
          ],
        },
        { type: 'heading', text: 'User-Centred Design', level: 2 },
        { type: 'paragraph', text: 'User-centred design places the needs, capabilities, and preferences of the end user at the heart of every design decision. The best digital products are not built around what the developer finds interesting — they are built around what users actually need.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Research your users — who are they? What are their goals, skills, and frustrations?',
            'Involve users in design — test ideas with real users early and often',
            'Design for their context — where, when, and how will they use the product?',
            'Prioritise usability — a beautiful product that users cannot navigate is a failed product',
          ],
        },
        { type: 'heading', text: 'The Design Brief', level: 2 },
        { type: 'key_term', term: 'Design Brief', definition: 'A document that defines the problem, purpose, target audience, requirements, and constraints for a design project. It is the contract between the designer and the client/teacher.' },
        {
          type: 'list', style: 'bullet',
          items: [
            'Purpose — what problem does the product solve?',
            'Target audience — who will use it? (age, skills, context)',
            'Requirements — what must the product do? (functional requirements)',
            'Constraints — what are the limits? (time, budget, software, hardware)',
            'Criteria — how will success be measured?',
          ],
        },
        { type: 'callout', variant: 'tip', text: 'A well-written design brief prevents scope creep — the gradual expansion of a project beyond its original boundaries. Clear requirements and constraints keep projects on track.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'dp-q1', text: 'Which stage of the design process involves testing the finished product against the original requirements?', options: ['Research & Analyse', 'Design', 'Produce', 'Evaluate'], correct_index: 3, explanation: 'The Evaluate stage assesses the finished product against the requirements and criteria established in the Design Brief. It identifies what worked, what didn\'t, and what should be improved.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'dp-q2', text: 'User-centred design means designing what the developer or designer personally finds most interesting or innovative.', correct_answer: false, explanation: 'False. User-centred design focuses on the needs, goals, and capabilities of the end user — not the developer\'s preferences. The best solutions solve real user problems effectively, even if they are less technically impressive.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'dp-q3', text: 'What is the purpose of a Design Brief?', options: ['To write the code for the project', 'To define the problem, audience, requirements, and constraints for a design project', 'To evaluate the finished product after completion', 'To create the visual design of the product'], correct_index: 1, explanation: 'A Design Brief is a planning document that defines what needs to be built, who it is for, what it must do, and what limitations exist. It is established before any design or development begins.' },
      ],
    },
  },

  {
    title: 'Time Management Skills',
    type: 'article',
    order_index: 2,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Why Time Management Matters in IT Projects', level: 2 },
        { type: 'paragraph', text: 'IT projects consistently go over time and over budget — the Standish Group\'s CHAOS Report found that only 29% of IT projects are completed on time and within budget. Poor time management is one of the leading causes. Learning to plan and manage time effectively is one of the most valuable transferable skills in IT.' },
        { type: 'callout', variant: 'info', text: '"I\'ll do it later" is the enemy of every project. Tasks always expand to fill the time available — or longer. Structured time management techniques counteract this natural tendency.' },
        { type: 'heading', text: 'Time Management Techniques', level: 2 },
        { type: 'key_term', term: 'Prioritisation', definition: "Ordering tasks by importance and urgency so you work on what matters most first, rather than what feels easiest or most comfortable." },
        { type: 'key_term', term: 'The Eisenhower Matrix', definition: 'A prioritisation tool that categorises tasks by urgency and importance: Do first (urgent + important), Schedule (important, not urgent), Delegate (urgent, not important), Eliminate (not urgent, not important).' },
        { type: 'key_term', term: 'Time Blocking', definition: 'Scheduling specific blocks of time for specific tasks in your calendar. Treats your time like appointments — protected and deliberate.' },
        { type: 'key_term', term: 'Milestones', definition: 'Significant checkpoints within a project timeline — specific, measurable deliverables that confirm the project is on track.' },
        { type: 'heading', text: 'Project Management Tools', level: 2 },
        {
          type: 'table',
          headers: ['Tool', 'Type', 'Best for'],
          rows: [
            ['Gantt Chart', 'Visual timeline', 'Showing task duration, sequence, and dependencies across a project'],
            ['Trello', 'Kanban board', 'Visualising tasks in columns (To Do, In Progress, Done)'],
            ['Asana', 'Task management app', 'Team projects, assigning tasks, tracking progress'],
            ['Google Calendar', 'Calendar', 'Scheduling time blocks, meeting management, reminders'],
            ['Simple To-Do List', 'List', 'Daily task management, quick reference'],
          ],
        },
        { type: 'heading', text: 'Common Time Wasters in IT Projects', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Perfectionism — spending too long on minor details instead of completing the task',
            'Scope creep — continuously adding new features without adjusting the timeline',
            'Poor estimation — underestimating how long tasks take (always add a 20-30% buffer)',
            'Multitasking — switching between tasks reduces focus and overall productivity',
            'Unclear requirements — building the wrong thing and having to redo work',
            'Not using version control — losing work due to accidental overwrites',
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Timeboxing: allocate a fixed, non-negotiable amount of time to a task. When the time is up, stop and move on — even if it\'s not perfect. This prevents perfectionism from derailing a project.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'tm-q1', text: 'According to the Eisenhower Matrix, which type of task should you do FIRST?', options: ['Important but not urgent', 'Urgent but not important', 'Both urgent AND important', 'Neither urgent nor important'], correct_index: 2, explanation: 'Tasks that are both urgent and important go in the "Do First" quadrant — they have deadlines and significant consequences if not done. Important-but-not-urgent tasks should be scheduled; urgent-but-not-important tasks can be delegated.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'tm-q2', text: 'A Gantt chart is useful for project management because it shows tasks plotted against a timeline, including their duration and order.', correct_answer: true, explanation: 'True. A Gantt chart is a horizontal bar chart where each bar represents a task — its start date, duration, and relationship to other tasks. It provides a clear visual overview of the entire project schedule.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'tm-q3', text: 'A student keeps adding new features to their project even though the deadline is tomorrow. What project management problem does this describe?', options: ['Time blocking', 'Scope creep', 'Prioritisation', 'Timeboxing'], correct_index: 1, explanation: 'Scope creep is the gradual, uncontrolled expansion of a project beyond its original boundaries. Adding features without adjusting timelines or requirements is a very common cause of missed deadlines.' },
      ],
    },
  },

  {
    title: 'Representing a Design',
    type: 'article',
    order_index: 3,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Why We Represent Designs', level: 2 },
        { type: 'paragraph', text: 'Design representations communicate how a system or product will look and function before it is built. They allow stakeholders (clients, team members, teachers) to review and give feedback on plans cheaply and quickly — before expensive development begins. Different representations serve different purposes.' },
        { type: 'heading', text: 'Types of Design Representation', level: 2 },
        { type: 'key_term', term: 'Storyboard', definition: 'A sequence of sketches showing the planned screens or scenes of a product, like a comic strip. Focuses on content and user journey across screens.' },
        { type: 'key_term', term: 'Wireframe', definition: 'A low-fidelity sketch showing the structure and layout of a single screen — where buttons, text, images, and navigation are positioned, without colour or styling.' },
        { type: 'key_term', term: 'Mockup', definition: 'A high-fidelity visual of the final product — looks like the finished design but is not functional. Shows exact colours, fonts, images, and styling.' },
        { type: 'key_term', term: 'Prototype', definition: 'A working interactive model of the product that can be tested by users. May not have full functionality but demonstrates the core user experience.' },
        {
          type: 'table',
          headers: ['Representation', 'Fidelity', 'Includes interaction?', 'Purpose'],
          rows: [
            ['Sketch/Wireframe', 'Low', 'No', 'Quick planning of layout and structure'],
            ['Storyboard', 'Low', 'No', 'Planning the user journey across multiple screens'],
            ['Mockup', 'High', 'No', 'Presenting the visual design for feedback/approval'],
            ['Prototype', 'Medium–High', 'Yes', 'User testing the interaction before full development'],
          ],
        },
        { type: 'heading', text: 'Algorithm Representations', level: 2 },
        { type: 'paragraph', text: 'For projects involving programming or automated processes, algorithms (step-by-step instructions) are represented visually before coding begins.' },
        { type: 'key_term', term: 'Pseudocode', definition: 'A human-readable description of an algorithm using plain English with programming-like structure. Not tied to any specific programming language.' },
        { type: 'key_term', term: 'Flowchart', definition: 'A diagram using standard shapes to represent the steps and decisions in an algorithm. Shapes: ovals (start/end), rectangles (process), diamonds (decision/branching).' },
        {
          type: 'table',
          headers: ['Flowchart Symbol', 'Shape', 'Meaning'],
          rows: [
            ['Terminal', 'Oval / Rounded rectangle', 'Start or end of the process'],
            ['Process', 'Rectangle', 'An action or calculation step'],
            ['Decision', 'Diamond', 'A yes/no question that causes branching'],
            ['Input/Output', 'Parallelogram', 'Data entering or leaving the system'],
            ['Connector', 'Arrow', 'The flow direction between steps'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'rd-q1', text: 'A student wants to show a client exactly how their finished website will look — with final colours, fonts, and images — before coding begins. Which design representation should they create?', options: ['Wireframe — shows layout without styling', 'Storyboard — shows the user journey', 'Mockup — high-fidelity visual showing final design', 'Prototype — working interactive model'], correct_index: 2, explanation: 'A mockup is a high-fidelity visual representation that shows the final colours, fonts, imagery, and styling of the product — without being interactive. It is used to present and get approval for the visual design before development.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'rd-q2', text: 'A diamond shape in a flowchart represents a decision point where the algorithm branches based on a yes/no condition.', correct_answer: true, explanation: 'True. Diamond shapes in flowcharts represent decision points — a question with two possible outcomes (Yes/No or True/False). Each outcome leads to a different path in the algorithm.' },
        { type: 'exercise_question', question_type: 'matching', id: 'rd-q3', text: 'Match each design representation to its correct purpose.', pairs: [{ term: 'Wireframe', definition: 'Low-fidelity layout showing structure without visual styling' }, { term: 'Storyboard', definition: 'Sequence of screens showing the user journey through a product' }, { term: 'Mockup', definition: 'High-fidelity visual showing final colours, fonts, and design' }, { term: 'Prototype', definition: 'Interactive working model used for user testing' }] },
      ],
    },
  },

  {
    title: 'Applying Design Elements and Principles',
    type: 'article',
    order_index: 4,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'Design Elements', level: 2 },
        { type: 'paragraph', text: 'Design elements are the fundamental building blocks of any visual design — the raw ingredients. Every designed product (website, poster, app, logo) is composed of combinations of these elements.' },
        {
          type: 'table',
          headers: ['Element', 'Definition', 'Example in digital design'],
          rows: [
            ['Line', 'A mark connecting two points — can define edges, create movement, or divide space', 'Borders, underlines, horizontal rules between sections'],
            ['Shape', 'A two-dimensional enclosed area — geometric (circle, square) or organic', 'Button shapes, icon outlines, card containers'],
            ['Colour', 'Hue, saturation, and value — creates mood, guides attention, and communicates meaning', 'Brand colours, alert colours (red = error, green = success)'],
            ['Texture', 'The visual or tactile quality of a surface', 'Subtle background patterns, gradient overlays'],
            ['Space', 'Empty (negative) space around and between elements — often called "white space"', 'Padding and margins around text, breathing room between sections'],
            ['Typography', 'The style, arrangement, and appearance of text', 'Font choice, heading hierarchy, line spacing'],
          ],
        },
        { type: 'heading', text: 'Design Principles', level: 2 },
        { type: 'paragraph', text: 'Design principles are the guidelines for how to use elements effectively. They describe relationships between elements.' },
        { type: 'key_term', term: 'Balance', definition: "The visual distribution of weight in a design. Symmetrical balance is formal and stable; asymmetrical balance is dynamic and modern." },
        { type: 'key_term', term: 'Contrast', definition: 'The difference between elements that makes them stand out — colour contrast, size contrast, shape contrast. Creates visual interest and hierarchy.' },
        { type: 'key_term', term: 'Emphasis', definition: 'Drawing attention to the most important element through size, colour, position, or contrast. Every design should have a clear focal point.' },
        { type: 'key_term', term: 'Unity', definition: 'The sense that all elements belong together and form a cohesive whole — achieved through consistent fonts, colours, and styles.' },
        { type: 'heading', text: 'Colour Theory Basics', level: 2 },
        {
          type: 'table',
          headers: ['Colour Relationship', 'Description', 'Effect'],
          rows: [
            ['Complementary', 'Colours opposite on the colour wheel (e.g. blue and orange)', 'High contrast, vibrant, eye-catching'],
            ['Analogous', 'Colours adjacent on the colour wheel (e.g. blue, blue-green, green)', 'Harmonious, calm, cohesive'],
            ['Monochromatic', 'Different shades and tints of the same colour', 'Elegant, sophisticated, easy on the eyes'],
          ],
        },
        { type: 'callout', variant: 'info', text: 'Colour carries cultural meaning: red means danger/error in Western contexts but luck in Chinese culture. Blue suggests trust and professionalism (used by banks and tech companies). Green signals success or environmental focus. Always consider your audience when choosing colours.' },
        { type: 'heading', text: 'Typography Principles', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Limit fonts — use maximum 2 fonts per project (one for headings, one for body)',
            'Establish hierarchy — headings larger than subheadings, subheadings larger than body text',
            'Line spacing — 1.5× line height improves readability for body text',
            'Avoid decorative fonts for body text — they are hard to read at small sizes',
            'Contrast matters — text must have sufficient contrast against its background (WCAG recommends minimum 4.5:1 ratio)',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'dep-q1', text: 'Which design principle refers to drawing attention to the most important element on a page?', options: ['Balance', 'Unity', 'Emphasis', 'Contrast'], correct_index: 2, explanation: 'Emphasis is the principle of making the most important element stand out — through size, colour, position, or contrast. Every design needs a clear focal point that the eye is drawn to first.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'dep-q2', text: 'Using many different fonts throughout a design creates visual interest and improves the user experience.', correct_answer: false, explanation: 'False. Using many different fonts creates visual noise and inconsistency. Best practice is to use a maximum of 2 fonts per project — one for headings and one for body text — and maintain consistent sizing and weight hierarchy.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'dep-q3', text: 'A website uses blue and orange together for its main colour scheme. What colour relationship is this?', options: ['Analogous', 'Monochromatic', 'Complementary', 'Tertiary'], correct_index: 2, explanation: 'Blue and orange are opposite each other on the colour wheel — this is a complementary colour relationship. Complementary colours create high contrast and visual energy, making them effective for attention-grabbing designs.' },
      ],
    },
  },

  {
    title: 'Evaluating a Digital Solution',
    type: 'article',
    order_index: 5,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Why Evaluation Matters', level: 2 },
        { type: 'paragraph', text: 'Evaluation is the final — and often most overlooked — stage of the design process. It answers the critical question: does the product actually solve the problem it was designed to solve? Without evaluation, you cannot know if your work succeeded, and you cannot improve it.' },
        { type: 'key_term', term: 'Evaluation', definition: 'A systematic assessment of a digital solution against established criteria, requirements, and user feedback — to determine its effectiveness and identify improvements.' },
        { type: 'heading', text: 'Evaluation Criteria', level: 2 },
        { type: 'paragraph', text: 'Good evaluation uses the criteria established in the Design Brief. Common dimensions to evaluate include:' },
        {
          type: 'table',
          headers: ['Criterion', 'Questions to ask'],
          rows: [
            ['Functionality', 'Does it work as intended? Are all required features implemented? Are there bugs?'],
            ['Usability', 'Can the target audience use it easily? Is navigation clear? Did users get confused?'],
            ['Efficiency', 'Does it perform tasks quickly? Does it use system resources well?'],
            ['Aesthetics', 'Does it look professional? Is the design consistent? Does it match the intended style?'],
            ['Accessibility', 'Can users with disabilities use it? Is contrast sufficient? Does it work with screen readers?'],
            ['Fitness for purpose', 'Does it solve the original problem for the target audience?'],
          ],
        },
        { type: 'heading', text: 'Testing Methods', level: 2 },
        { type: 'key_term', term: 'User Testing', definition: 'Observing real members of the target audience using the product — without assistance. Their struggles and successes reveal genuine usability issues.' },
        { type: 'key_term', term: 'Alpha Testing', definition: 'Internal testing by the development team or organisation. Identifies bugs and issues before the product is released to external users.' },
        { type: 'key_term', term: 'Beta Testing', definition: 'Testing by a limited group of real end-users before full release. Provides real-world feedback and identifies issues not caught in internal testing.' },
        {
          type: 'callout', variant: 'tip',
          text: 'The most revealing question in user testing is "Can you think out loud as you use this?" — users verbalise what they notice, expect, and find confusing, giving you direct insight into usability issues.',
        },
        { type: 'heading', text: 'Gathering and Using Feedback', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Surveys and questionnaires — structured feedback from many users (can quantify satisfaction)',
            'Interviews — in-depth qualitative feedback from individual users',
            'Observation — watch users use the product without helping them (reveals real issues)',
            'Analytics — if deployed, track how users actually behave (which pages they visit, where they drop off)',
          ],
        },
        { type: 'heading', text: 'Writing an Evaluation Report', level: 2 },
        {
          type: 'list', style: 'numbered',
          items: [
            'State the evaluation criteria (from the Design Brief)',
            'For each criterion: describe what was tested, what the results were, and whether the criterion was met',
            'Include user feedback with specific examples and quotes',
            'Identify strengths — what worked well and why',
            'Identify weaknesses — what did not work or could be improved',
            'Propose specific improvements — concrete changes that would address weaknesses',
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        { type: 'exercise_question', question_type: 'mcq', id: 'eds-q1', text: 'What is the most revealing question to ask during user testing?', options: ['Did you enjoy using this product?', 'Would you recommend this to a friend?', 'Can you think out loud as you use this?', 'What features would you add?'], correct_index: 2, explanation: '"Think out loud" (also called a think-aloud protocol) asks users to verbalise their thoughts while using the product. This reveals what they notice, expect, and find confusing — giving designers direct insight into real usability issues.' },
        { type: 'exercise_question', question_type: 'mcq', id: 'eds-q2', text: 'Which testing method involves observing real end-users using a product before it is officially released to the general public?', options: ['Alpha testing', 'Beta testing', 'Unit testing', 'Stress testing'], correct_index: 1, explanation: 'Beta testing involves a limited group of real end-users testing the product before full release. It provides real-world feedback beyond what internal (alpha) testing can reveal.' },
        { type: 'exercise_question', question_type: 'true_false', id: 'eds-q3', text: 'An evaluation report should only describe what worked well in the product — not its weaknesses.', correct_answer: false, explanation: 'False. A thorough evaluation report must include both strengths AND weaknesses. Identifying weaknesses and proposing specific improvements demonstrates critical analysis and is essential for genuine improvement. An evaluation that only praises a product is neither honest nor useful.' },
      ],
    },
  },

  {
    title: 'Project Management Review Quiz',
    type: 'quiz',
    order_index: 6,
    estimated_minutes: 15,
    content: {
      pass_score: 7,
      questions: [
        { id: 'pm-rq1', type: 'mcq', text: 'What is the correct order of stages in the design process?', options: ['Produce → Evaluate → Design → Research', 'Research & Analyse → Design → Produce → Evaluate', 'Design → Research → Evaluate → Produce', 'Evaluate → Design → Produce → Research'], correct_index: 1, explanation: 'The design process follows: Research & Analyse (understand the problem), Design (plan the solution), Produce (build it), and Evaluate (assess it against criteria). Each stage informs the next.' },
        { id: 'pm-rq2', type: 'true_false', text: 'User-centred design focuses on what the developer finds most technically interesting, rather than what users actually need.', correct_answer: false, explanation: 'False. User-centred design places the end user\'s needs, goals, and context at the centre of every design decision. The best products solve real user problems effectively, regardless of technical complexity.' },
        { id: 'pm-rq3', type: 'mcq', text: 'A Design Brief is used to:', options: ['Evaluate the finished product after completion', 'Define the problem, audience, requirements, and constraints before development begins', 'Create the final visual design of the product', 'Write the code for the digital solution'], correct_index: 1, explanation: 'A Design Brief is a foundational document created before any design or development. It defines what needs to be built, who it is for, requirements it must meet, and constraints to work within.' },
        { id: 'pm-rq4', type: 'mcq', text: 'According to the Eisenhower Matrix, tasks that are URGENT and IMPORTANT should be:', options: ['Delegated to someone else', 'Scheduled for later in the week', 'Done first, immediately', 'Eliminated from the task list'], correct_index: 2, explanation: 'The Eisenhower Matrix\'s "Do First" quadrant contains tasks that are both urgent (time-sensitive) and important (significant consequences). These take priority over everything else.' },
        { id: 'pm-rq5', type: 'mcq', text: 'What project management problem describes continuously adding new features without adjusting the deadline?', options: ['Time blocking', 'Scope creep', 'Timeboxing', 'Milestone setting'], correct_index: 1, explanation: 'Scope creep is the gradual, uncontrolled expansion of a project\'s scope. Adding features without adjusting timelines or resources is one of the most common causes of missed deadlines and failed projects.' },
        { id: 'pm-rq6', type: 'mcq', text: 'A low-fidelity sketch showing the structure and layout of a screen — without colour or styling — is called a:', options: ['Mockup', 'Prototype', 'Wireframe', 'Storyboard'], correct_index: 2, explanation: 'A wireframe is a low-fidelity layout that shows where elements are positioned on a screen without visual styling. It focuses on structure and function, allowing quick iteration before detailed design.' },
        { id: 'pm-rq7', type: 'true_false', text: 'A diamond shape in a flowchart represents a decision point where the process branches based on a condition.', correct_answer: true, explanation: 'True. Diamond shapes are used for decision points in flowcharts — a yes/no question where different answers lead to different paths in the algorithm.' },
        { id: 'pm-rq8', type: 'mcq', text: 'Which design principle refers to making all elements in a design feel like they belong together?', options: ['Contrast', 'Emphasis', 'Balance', 'Unity'], correct_index: 3, explanation: 'Unity is the principle that all elements of a design work together to form a cohesive whole. It is achieved through consistent use of fonts, colours, spacing, and style throughout the design.' },
        { id: 'pm-rq9', type: 'mcq', text: 'Beta testing is best described as:', options: ['Internal testing by the development team to find bugs', 'Testing by real end-users before full public release', 'Automated testing of individual code functions', 'Load testing to check performance under pressure'], correct_index: 1, explanation: 'Beta testing involves real end-users testing the product in real-world conditions before full release. It reveals issues that internal testing misses because real users interact with products differently than developers expect.' },
        { id: 'pm-rq10', type: 'true_false', text: 'An evaluation report should only include the strengths of a product, not its weaknesses.', correct_answer: false, explanation: 'False. A genuine evaluation must include both strengths and weaknesses. Identifying weaknesses with specific evidence and proposing concrete improvements demonstrates critical analysis and is essential for product improvement.' },
      ],
    },
  },
]

// ─────────────────────────────────────────────────────────────
// SEED LOGIC
// ─────────────────────────────────────────────────────────────

async function getUnit2Id(): Promise<string> {
  const { rows } = await pool.query<{ id: string }>(
    'SELECT id FROM units WHERE order_index = 2'
  )
  if (!rows[0]) throw new Error('Unit 2 not found — run npm run db:seed-lessons first')
  return rows[0].id
}

async function upsertTopic(
  unitId: string,
  title: string,
  orderIndex: number,
  color: string,
  estimatedHours: number,
  description: string
): Promise<string> {
  const existing = await pool.query<{ id: string }>(
    'SELECT id FROM topics WHERE unit_id = $1 AND order_index = $2',
    [unitId, orderIndex]
  )
  if (existing.rows[0]) {
    await pool.query(
      'UPDATE topics SET title = $1, color = $2, estimated_hours = $3, description = $4 WHERE id = $5',
      [title, color, estimatedHours, description, existing.rows[0].id]
    )
    console.log(`  Topic "${title}" already exists — updated`)
    return existing.rows[0].id
  }
  const { rows } = await pool.query<{ id: string }>(
    'INSERT INTO topics (unit_id, title, description, order_index, color, estimated_hours) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id',
    [unitId, title, description, orderIndex, color, estimatedHours]
  )
  console.log(`  Created topic "${title}", id: ${rows[0].id}`)
  return rows[0].id
}

async function insertLesson(
  topicId: string,
  lesson: { title: string; type: string; order_index: number; estimated_minutes: number; content: object }
): Promise<void> {
  const existing = await pool.query<{ id: string }>(
    'SELECT id FROM lessons WHERE topic_id = $1 AND order_index = $2',
    [topicId, lesson.order_index]
  )
  if (existing.rows[0]) {
    await pool.query(
      'UPDATE lessons SET title=$1, type=$2, content=$3, estimated_minutes=$4 WHERE id=$5',
      [lesson.title, lesson.type, JSON.stringify(lesson.content), lesson.estimated_minutes, existing.rows[0].id]
    )
    console.log(`    Updated: "${lesson.title}"`)
    return
  }
  await pool.query(
    'INSERT INTO lessons (topic_id, title, type, content, order_index, estimated_minutes) VALUES ($1,$2,$3,$4,$5,$6)',
    [topicId, lesson.title, lesson.type, JSON.stringify(lesson.content), lesson.order_index, lesson.estimated_minutes]
  )
  console.log(`    Inserted: "${lesson.title}"`)
}

async function main() {
  console.log('Seeding Unit 2 — Topics 3, 4, and 5…\n')

  const unitId = await getUnit2Id()

  console.log('Topic 3: Impacts of Technology')
  const topic3Id = await upsertTopic(unitId, 'Impacts of Technology', 3, '#E07B00', 2.5,
    'Cybercrime, copyright law, the Spam Act, digital citizenship, and health impacts of technology')
  for (const lesson of topic3Lessons) await insertLesson(topic3Id, lesson)

  console.log('\nTopic 4: Application Skills')
  const topic4Id = await upsertTopic(unitId, 'Application Skills', 4, '#0A7B57', 3.0,
    'Presentation software, audio software, image manipulation, databases, troubleshooting, and project planning')
  for (const lesson of topic4Lessons) await insertLesson(topic4Id, lesson)

  console.log('\nTopic 5: Project Management')
  const topic5Id = await upsertTopic(unitId, 'Project Management', 5, '#D92B2B', 2.5,
    'The design process, time management, design representations, design principles, and evaluating digital solutions')
  for (const lesson of topic5Lessons) await insertLesson(topic5Id, lesson)

  console.log('\nDone! 20 lessons seeded across Topics 3, 4, and 5.')
}

main().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
}).finally(() => pool.end())
