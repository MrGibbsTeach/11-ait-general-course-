/**
 * Seed script: Unit 2 — Topics 1 (Managing Data) and 2 (Networks)
 * Run with: npm run db:seed-lessons
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// ─────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────

const topic1Lessons = [
  {
    title: 'Data vs Information',
    type: 'article',
    order_index: 1,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'What is Data?', level: 2 },
        { type: 'paragraph', text: 'Data is raw, unprocessed facts and figures. On its own, data has no meaning — it is simply a collection of values, symbols, or observations that have not yet been interpreted or given context.' },
        { type: 'key_term', term: 'Data', definition: 'Raw, unprocessed facts, figures, or symbols that have no meaning on their own.' },
        { type: 'callout', variant: 'info', text: "The word 'data' comes from the Latin word meaning 'something given'. It is the plural of 'datum' — a single piece of information." },
        { type: 'heading', text: 'What is Information?', level: 2 },
        { type: 'paragraph', text: 'Information is data that has been processed, organised, or structured to give it meaning and context. When we interpret data and understand what it represents, we turn it into information that can be used to make decisions.' },
        { type: 'key_term', term: 'Information', definition: 'Data that has been processed and given meaning through context, making it useful for decision-making.' },
        { type: 'heading', text: 'Data vs Information — Examples', level: 2 },
        {
          type: 'table',
          headers: ['Data', 'Information'],
          rows: [
            ['28', 'The temperature today is 28°C — warmer than average for this time of year'],
            ['95, 82, 76, 88, 91', 'The class average on the test was 86.4% — an above-average result'],
            ['1024, 512, 2048', 'File sizes: 1 GB, 512 MB, and 2 GB — the third file is the largest'],
            ['08:45', 'The school bell rings at 8:45 AM — time to be in class'],
          ],
        },
        { type: 'heading', text: 'Types of Data', level: 2 },
        {
          type: 'list',
          style: 'bullet',
          items: [
            'Quantitative data — numerical data that can be measured (e.g. height, temperature, test scores)',
            'Qualitative data — descriptive data based on characteristics or categories (e.g. colour, opinion, name)',
            'Primary data — collected firsthand by the person who needs it (e.g. a survey you conducted yourself)',
            'Secondary data — collected by someone else and reused for a new purpose (e.g. census data, published research)',
          ],
        },
        { type: 'callout', variant: 'tip', text: "A handy way to remember: data is the 'what', information is the 'what does it mean'. Data becomes information when it's given context." },
        { type: 'heading', text: 'Why Does This Matter in IT?', level: 2 },
        { type: 'paragraph', text: 'In information technology, understanding the difference between data and information is fundamental. Every system you build or use — apps, websites, databases — collects raw data, processes it, and presents it as meaningful information. Knowing the distinction helps you design better systems and evaluate the quality of the information you work with.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'dvi-q1',
          text: 'Which of the following is an example of data (not information)?',
          options: ['The average rainfall in Perth is 730 mm per year', '47', 'Today is hotter than yesterday', 'The temperature rose by 3 degrees overnight'],
          correct_index: 1,
          explanation: "The number 47 is raw data — it has no context or meaning on its own. The other options all include context that gives numbers meaning, making them information.",
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'dvi-q2',
          text: 'Information is data that has been processed and given meaning through context.',
          correct_answer: true,
          explanation: 'True. Information is always derived from data — it is data plus context, organisation, or interpretation that makes it meaningful and useful.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'dvi-q3',
          text: "A student surveys 30 classmates and records their favourite subjects. What type of data is this?",
          options: ['Secondary quantitative data', 'Primary qualitative data', 'Secondary qualitative data', 'Primary quantitative data'],
          correct_index: 1,
          explanation: "The student collected the data themselves (primary), and favourite subjects are descriptive categories rather than numbers (qualitative).",
        },
      ],
    },
  },

  {
    title: 'Accuracy and Reliability of Sources',
    type: 'article',
    order_index: 2,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Why Accuracy Matters', level: 2 },
        { type: 'paragraph', text: 'Not all information is created equal. In the digital age, anyone can publish anything online — making it critical to evaluate the accuracy and reliability of sources before using them. Poor-quality information can lead to bad decisions, misinformation, and serious real-world consequences.' },
        { type: 'callout', variant: 'warning', text: 'A 2016 Stanford study found that 82% of middle school students could not distinguish between advertising content and real news articles. Evaluating sources is a critical digital literacy skill.' },
        { type: 'heading', text: 'Key Terms', level: 2 },
        { type: 'key_term', term: 'Accuracy', definition: 'How correct and free from errors the information is.' },
        { type: 'key_term', term: 'Reliability', definition: 'How consistently trustworthy a source is over time — can you depend on it?' },
        { type: 'key_term', term: 'Validity', definition: 'Whether the information actually measures or represents what it claims to.' },
        { type: 'key_term', term: 'Bias', definition: "A tendency to present information in a way that favours one viewpoint, often without acknowledging it." },
        { type: 'heading', text: 'Evaluating Sources — The CRAAP Test', level: 2 },
        { type: 'paragraph', text: 'The CRAAP Test is a framework used to evaluate the quality of information sources. Each letter stands for a criterion to consider:' },
        {
          type: 'table',
          headers: ['Criterion', 'What to Ask'],
          rows: [
            ['Currency', 'When was it published or last updated? Is it still relevant?'],
            ['Relevance', 'Does it relate to your topic? Is it written for an appropriate audience?'],
            ['Authority', 'Who wrote it? What are their credentials? Is the publisher reputable?'],
            ['Accuracy', 'Is it supported by evidence? Can you verify the facts elsewhere?'],
            ['Purpose', 'Why was it written? To inform, persuade, sell, or entertain?'],
          ],
        },
        { type: 'heading', text: 'Reliable vs Unreliable Sources', level: 2 },
        {
          type: 'table',
          headers: ['Generally Reliable', 'Approach with Caution'],
          rows: [
            ['Peer-reviewed academic journals', 'Wikipedia (use references, not article itself)'],
            ['Government websites (.gov.au)', 'Social media posts and blogs'],
            ['Established news organisations', 'Sites selling products related to the topic'],
            ['Educational institutions (.edu)', 'Anonymous or unsigned content'],
          ],
        },
        { type: 'heading', text: 'Recognising Bias', level: 2 },
        { type: 'paragraph', text: "Bias does not always mean the information is wrong — but it means you are only seeing part of the picture. Watch for language that is emotionally charged, sources that only present one side of an argument, or funding that could influence the conclusions presented." },
        {
          type: 'callout', variant: 'important',
          text: 'Red flags: no author listed, no publication date, claims that seem too extreme, pressure to share immediately, and URLs that mimic real news sites (e.g. ABCnews.com.co).',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'ars-q1',
          text: 'Which CRAAP Test criterion asks "Who wrote this and are they qualified to do so?"',
          options: ['Currency', 'Relevance', 'Authority', 'Purpose'],
          correct_index: 2,
          explanation: 'Authority asks about the author\'s credentials and the publisher\'s reputation. Knowing who wrote something helps you assess how much to trust the information.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'ars-q2',
          text: "A website with a .gov.au domain is generally considered a more reliable source than an anonymous blog.",
          correct_answer: true,
          explanation: 'True. Government websites are maintained by official bodies and are held to standards of accuracy. Anonymous blogs have no accountability — anyone can write anything without evidence.',
        },
        {
          type: 'exercise_question', question_type: 'matching', id: 'ars-q3',
          text: 'Match each term to its correct definition.',
          pairs: [
            { term: 'Accuracy', definition: 'How correct and free from errors the information is' },
            { term: 'Reliability', definition: 'How consistently trustworthy a source is over time' },
            { term: 'Bias', definition: "A tendency to favour one viewpoint without acknowledging it" },
            { term: 'Currency', definition: 'How recent and up to date the information is' },
          ],
        },
      ],
    },
  },

  {
    title: 'Search Engines and Boolean Operators',
    type: 'article',
    order_index: 3,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'How Search Engines Work', level: 2 },
        { type: 'paragraph', text: 'Search engines like Google work by crawling billions of web pages, indexing their content, and ranking them based on relevance to your search query. Understanding how this works helps you search more effectively and find better-quality results.' },
        { type: 'callout', variant: 'info', text: 'Google processes approximately 8.5 billion searches per day. The algorithm uses over 200 factors to rank results — including relevance, page authority, and user behaviour signals.' },
        { type: 'heading', text: 'Boolean Operators', level: 2 },
        { type: 'paragraph', text: 'Boolean operators are keywords that tell a search engine how to combine your search terms. They come from Boolean logic — a system of true/false values used in computing. Using them makes your searches far more precise.' },
        { type: 'key_term', term: 'AND', definition: 'Both terms must appear in results. Narrows the search. Example: climate AND Australia' },
        { type: 'key_term', term: 'OR', definition: 'Either term can appear. Broadens the search. Example: dog OR puppy' },
        { type: 'key_term', term: 'NOT', definition: 'Excludes results containing the second term. Example: jaguar NOT car' },
        { type: 'heading', text: 'Advanced Search Techniques', level: 2 },
        {
          type: 'table',
          headers: ['Technique', 'Syntax', 'Example', 'What it does'],
          rows: [
            ['Exact phrase', '"…"', '"climate change effects"', 'Returns results with that exact phrase'],
            ['Exclude word', '-word', 'python -snake', 'Removes results containing that word'],
            ['Site search', 'site:', 'site:edu climate change', 'Searches only within a specific domain'],
            ['File type', 'filetype:', 'annual report filetype:pdf', 'Finds files of a specific type'],
            ['Wildcard', '*', '"the * of time"', 'Fills in the blank with any word'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Tip: Use quotation marks for exact phrases, and combine operators for precision. Example: "network security" AND Australia site:gov.au finds Australian government pages about network security.' },
        { type: 'heading', text: 'Putting It All Together', level: 2 },
        { type: 'paragraph', text: 'Effective searching is a skill. Start with broad terms, then refine using operators and filters. Always evaluate results critically using what you learned in the previous lesson — just because it appears at the top of Google does not mean it is the most accurate source.' },
        {
          type: 'list', style: 'numbered',
          items: [
            'Start with your main keywords',
            'Use quotation marks for exact phrases',
            "Add AND or OR to combine or expand concepts",
            "Use NOT or the minus sign to exclude unwanted results",
            "Use site: to restrict to trusted domains",
            "Evaluate results using the CRAAP criteria",
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'sebo-q1',
          text: 'Which Boolean operator would you use to search for pages about either "cats" or "dogs" (but not necessarily both)?',
          options: ['AND', 'OR', 'NOT', 'NEAR'],
          correct_index: 1,
          explanation: 'OR broadens a search by returning results that contain either term. It is useful when you want to include synonyms or related concepts.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'sebo-q2',
          text: 'A student wants to find only PDF files about network security from educational institutions. Which search would work best?',
          options: [
            '"network security" filetype:pdf',
            '"network security" site:edu filetype:pdf',
            'network security .edu pdf',
            'site:edu "network security" OR pdf',
          ],
          correct_index: 1,
          explanation: 'Combining site:edu and filetype:pdf along with an exact phrase search gives the most targeted results — educational domain + PDF format + the exact phrase.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'sebo-q3',
          text: 'The NOT operator (or minus sign) removes results that contain the specified word.',
          correct_answer: true,
          explanation: 'True. For example, searching "jaguar -car" removes all pages that mention the word "car", helping you find results about the animal rather than the vehicle brand.',
        },
      ],
    },
  },

  {
    title: 'Common File Formats',
    type: 'article',
    order_index: 4,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is a File Format?', level: 2 },
        { type: 'paragraph', text: 'A file format is a standard way that data is encoded and stored in a file. The format determines what software can open the file, how it is compressed (if at all), and what features are supported. Choosing the right format for a task is an important practical skill in IT.' },
        { type: 'key_term', term: 'File extension', definition: 'The letters after the dot in a file name (e.g. .pdf, .jpg) that indicate the file format.' },
        { type: 'key_term', term: 'Compression', definition: 'Reducing file size by encoding data more efficiently. Can be lossless (no quality loss) or lossy (some quality sacrificed).' },
        { type: 'heading', text: 'Document and Text Formats', level: 2 },
        {
          type: 'table',
          headers: ['Format', 'Extension', 'Best used for', 'Key feature'],
          rows: [
            ['Plain Text', '.txt', 'Simple notes, code, logs', 'Universal — any device can open it'],
            ['Word Document', '.docx', 'Editable documents with formatting', 'Microsoft Office format, widely used'],
            ['PDF', '.pdf', 'Sharing documents that should not be edited', 'Looks the same on any device, not easily edited'],
            ['CSV', '.csv', 'Spreadsheet data, databases, imports/exports', 'Text-based, compatible with any spreadsheet app'],
            ['HTML', '.html', 'Web pages', 'Displayed by browsers, contains markup tags'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Use PDF when sharing a document that must look the same for everyone. Use DOCX when the recipient needs to edit the document. Use CSV for data that needs to move between systems.' },
        { type: 'heading', text: 'Image Formats', level: 2 },
        {
          type: 'table',
          headers: ['Format', 'Extension', 'Compression', 'Best used for'],
          rows: [
            ['JPEG', '.jpg / .jpeg', 'Lossy', 'Photos and realistic images — small file size'],
            ['PNG', '.png', 'Lossless', 'Images requiring transparency or crisp edges (logos, screenshots)'],
            ['GIF', '.gif', 'Lossless (256 colours)', 'Simple animations, icons with flat colour'],
            ['SVG', '.svg', 'None (vector)', 'Logos, icons — scales to any size without quality loss'],
            ['WebP', '.webp', 'Both (lossy/lossless)', 'Web images — better quality at smaller size than JPEG/PNG'],
          ],
        },
        { type: 'heading', text: 'Audio and Video Formats', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'MP3 (.mp3) — Lossy compressed audio. Small file size, standard for music and podcasts',
            'WAV (.wav) — Uncompressed audio. High quality but large file size. Used in professional audio production',
            'MP4 (.mp4) — Compressed video with audio. Most common video format for sharing and streaming',
            'MOV (.mov) — Apple QuickTime format. High quality, often used for video editing',
            'AVI (.avi) — Older Microsoft video format. Less compressed than MP4',
          ],
        },
        { type: 'heading', text: 'Choosing the Right Format', level: 2 },
        {
          type: 'callout', variant: 'important',
          text: 'Three questions to ask when choosing a file format: (1) Will the recipient need to edit it? (2) Does file size matter? (3) Does quality/transparency need to be preserved?',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cff-q1',
          text: 'A graphic designer creates a company logo that needs to scale to any size without losing quality. Which format is most appropriate?',
          options: ['JPEG', 'GIF', 'SVG', 'PNG'],
          correct_index: 2,
          explanation: 'SVG (Scalable Vector Graphics) is a vector format that can scale to any size without losing quality. JPEG, GIF, and PNG are raster formats that become pixelated when enlarged.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'cff-q2',
          text: 'JPEG uses lossless compression, meaning no image data is lost when the file is saved.',
          correct_answer: false,
          explanation: 'False. JPEG uses lossy compression, which discards some image data to achieve smaller file sizes. This is why JPEG images can show "artefacts" or become blurry when heavily compressed. PNG uses lossless compression.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cff-q3',
          text: 'A teacher wants to share a report that students must not be able to edit, and it must look identical on all devices. Which format should they use?',
          options: ['DOCX', 'TXT', 'PDF', 'CSV'],
          correct_index: 2,
          explanation: 'PDF (Portable Document Format) preserves formatting across all devices and is not easily editable. DOCX can be edited in Word, TXT loses all formatting, and CSV is for data.',
        },
      ],
    },
  },

  {
    title: 'File and Folder Organisation',
    type: 'article',
    order_index: 5,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'Why Organisation Matters', level: 2 },
        { type: 'paragraph', text: 'Poor file organisation wastes time, causes version confusion, and can lead to losing important work. A well-structured filing system makes it easy to find files, collaborate with others, and back up your work effectively. Good habits built now will serve you throughout your career.' },
        { type: 'heading', text: 'Folder Hierarchies', level: 2 },
        { type: 'paragraph', text: 'Files are stored in a hierarchical structure — folders inside folders. This mirrors how you might organise physical folders in a filing cabinet. The top-level is called the root directory, and you navigate down through folders to reach files.' },
        { type: 'key_term', term: 'Root directory', definition: 'The top-level folder of a storage location (e.g. C:\\ on Windows, / on Mac/Linux).' },
        { type: 'key_term', term: 'Path', definition: "The address of a file or folder within the hierarchy (e.g. C:\\Users\\Student\\Documents\\AIT\\Unit2\\notes.docx)." },
        { type: 'key_term', term: 'Subdirectory', definition: 'A folder inside another folder.' },
        {
          type: 'callout', variant: 'tip',
          text: 'Good folder structure example: School > Year 11 > AIT > Unit 2 > Managing Data > research-notes.docx. Each level narrows the location.',
        },
        { type: 'heading', text: 'File Naming Conventions', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Be descriptive — "unit2-networks-research.docx" beats "document1.docx"',
            'Use dates for versioned files — "report-2025-05-24.docx" sorts chronologically',
            'Avoid spaces — use hyphens (-) or underscores (_) instead (spaces cause issues in some systems)',
            'Keep it concise — long names are hard to read in file browsers',
            'Use consistent capitalisation — either all-lowercase or Title-Case, not random',
          ],
        },
        { type: 'callout', variant: 'warning', text: 'Never use these characters in file names: \\ / : * ? " < > |  — they are reserved by operating systems and will cause errors.' },
        { type: 'heading', text: 'Storage Types', level: 2 },
        {
          type: 'table',
          headers: ['Type', 'Examples', 'Pros', 'Cons'],
          rows: [
            ['Local storage', 'HDD, SSD, internal drive', 'Fast, no internet needed', 'Lost if device fails or stolen'],
            ['External storage', 'USB drive, external HDD', 'Portable, no internet needed', 'Can be lost, damaged, or forgotten'],
            ['Cloud storage', 'Google Drive, OneDrive, iCloud', 'Accessible anywhere, automatic backup', 'Requires internet, privacy concerns, subscription costs'],
          ],
        },
        { type: 'callout', variant: 'important', text: 'Follow the 3-2-1 backup rule: keep 3 copies of important files, on 2 different types of storage, with 1 copy off-site (e.g. in the cloud).' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'ffo-q1',
          text: 'Which file name follows best practice conventions?',
          options: ['My Document (final).docx', 'unit2 assignment final REAL.docx', 'unit2-assignment-draft-2025-05.docx', 'ASSGN.docx'],
          correct_index: 2,
          explanation: 'unit2-assignment-draft-2025-05.docx is descriptive, uses hyphens instead of spaces, includes a date for version control, and is concise. The others use spaces, vague names, or are too abbreviated.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'ffo-q2',
          text: 'Cloud storage is always more secure than local storage because your files are backed up automatically.',
          correct_answer: false,
          explanation: "False. While cloud storage provides automatic backups, it also introduces risks: your data is stored on someone else's servers, requires internet access, and is subject to that company's privacy policies and potential data breaches. Both storage types have pros and cons.",
        },
        {
          type: 'exercise_question', question_type: 'short_answer', id: 'ffo-q3',
          text: "What backup rule recommends keeping 3 copies of files, on 2 different storage types, with 1 copy off-site?",
          accepted_answers: ['3-2-1', '3-2-1 rule', 'the 3-2-1 rule', '321 rule', '321'],
          explanation: 'The 3-2-1 backup rule is an industry best practice: 3 copies, 2 different media types, 1 off-site (e.g. cloud). This protects against device failure, theft, and physical disasters.',
        },
      ],
    },
  },

  {
    title: 'Managing Data Review Quiz',
    type: 'quiz',
    order_index: 6,
    estimated_minutes: 15,
    content: {
      pass_score: 7,
      questions: [
        {
          id: 'md-rq1', type: 'mcq',
          text: 'Which of the following best describes "data"?',
          options: ['Processed facts presented in a useful form', 'Raw, unprocessed facts and figures without context', 'A collection of web pages indexed by a search engine', 'The meaning behind a set of statistics'],
          correct_index: 1,
          explanation: 'Data is raw, unprocessed facts and figures. It only becomes information when context is added to give it meaning.',
        },
        {
          id: 'md-rq2', type: 'mcq',
          text: 'A doctor receives blood test results showing a patient\'s cholesterol level as "6.2". What transforms this data into useful information?',
          options: ['Storing it in a spreadsheet', 'Printing it on official letterhead', 'Comparing it to normal ranges and explaining what it means for the patient\'s health', 'Encrypting it for privacy'],
          correct_index: 2,
          explanation: 'Context and interpretation are what transform raw data (the number 6.2) into information. Knowing that 6.2 mmol/L is above the recommended range gives the number meaning.',
        },
        {
          id: 'md-rq3', type: 'true_false',
          text: 'Qualitative data is always expressed as numbers.',
          correct_answer: false,
          explanation: 'False. Qualitative data is descriptive — it describes characteristics or categories (e.g. colour, opinion, name). Quantitative data is expressed as numbers.',
        },
        {
          id: 'md-rq4', type: 'mcq',
          text: 'The CRAAP Test criterion "Authority" asks you to evaluate which of the following?',
          options: ['Whether the information is recent', 'Who wrote it and whether they are qualified', 'Whether the claims can be verified elsewhere', 'Why the information was published'],
          correct_index: 1,
          explanation: 'Authority focuses on the credentials of the author and the reputation of the publisher. It helps you determine whether the source is trustworthy.',
        },
        {
          id: 'md-rq5', type: 'mcq',
          text: 'Which of the following is generally considered the most reliable type of source?',
          options: ['An anonymous blog post', 'A social media post by a celebrity', 'A peer-reviewed academic journal article', 'A website selling health supplements'],
          correct_index: 2,
          explanation: 'Peer-reviewed academic journals are vetted by experts in the field before publication. Anonymous blogs, social media posts, and commercial sites have little accountability.',
        },
        {
          id: 'md-rq6', type: 'mcq',
          text: 'Which Boolean operator would you use to find results about "renewable energy" but NOT about "solar"?',
          options: ['AND', 'OR', 'NOT', 'NEAR'],
          correct_index: 2,
          explanation: 'The NOT operator (or minus sign in Google) excludes results containing the specified word. Searching "renewable energy NOT solar" (or "renewable energy -solar" in Google) filters out solar-related results.',
        },
        {
          id: 'md-rq7', type: 'mcq',
          text: 'A student needs to share a document that must look identical on all devices and must not be edited by the recipient. Which format is best?',
          options: ['DOCX', 'TXT', 'PDF', 'CSV'],
          correct_index: 2,
          explanation: 'PDF preserves formatting across all devices and is not easily editable. It is the standard format for sharing final documents.',
        },
        {
          id: 'md-rq8', type: 'true_false',
          text: 'JPEG images use lossless compression, preserving all original image data.',
          correct_answer: false,
          explanation: 'False. JPEG uses lossy compression — it removes some image data to reduce file size. This is acceptable for photographs but not ideal for images requiring crisp edges or transparency. PNG uses lossless compression.',
        },
        {
          id: 'md-rq9', type: 'mcq',
          text: 'Which of these file names follows best practice?',
          options: ['My Assignment (2).docx', 'assignment final FINAL v3.docx', 'ait-unit2-assignment-2025-05.docx', 'doc1.docx'],
          correct_index: 2,
          explanation: 'ait-unit2-assignment-2025-05.docx is descriptive, uses hyphens, includes a date, and has no spaces or ambiguous versioning.',
        },
        {
          id: 'md-rq10', type: 'mcq',
          text: 'The 3-2-1 backup rule recommends keeping how many copies of important files?',
          options: ['1', '2', '3', '5'],
          correct_index: 2,
          explanation: 'The 3-2-1 rule: 3 copies, on 2 different storage media types, with 1 copy stored off-site (e.g. in the cloud). This protects against multiple types of data loss.',
        },
      ],
    },
  },
]

const topic2Lessons = [
  {
    title: 'Components of a Wireless Network',
    type: 'article',
    order_index: 1,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'What is a Network?', level: 2 },
        { type: 'paragraph', text: 'A computer network is a collection of devices connected together to share resources and communicate. Networks allow devices to share files, printers, internet connections, and applications. Understanding network components is essential for anyone working in IT.' },
        { type: 'key_term', term: 'Network', definition: 'Two or more devices connected together to share resources and communicate.' },
        { type: 'key_term', term: 'Node', definition: 'Any device connected to a network (computer, smartphone, printer, etc.).' },
        { type: 'heading', text: 'Core Network Components', level: 2 },
        { type: 'key_term', term: 'Modem', definition: 'Modulator-Demodulator. Connects your home or office to the internet via your ISP (Internet Service Provider). Converts digital signals to the format used by the ISP\'s network.' },
        { type: 'key_term', term: 'Router', definition: 'Directs data packets between devices on your network and to the internet. Assigns IP addresses to devices and manages traffic. Usually combined with the modem in home setups.' },
        { type: 'key_term', term: 'Wireless Access Point (WAP)', definition: 'Broadcasts a Wi-Fi signal that devices connect to wirelessly. In homes, this is usually built into the router. In large buildings, multiple WAPs are used to provide coverage.' },
        { type: 'key_term', term: 'Network Interface Card (NIC)', definition: 'Hardware inside a device that allows it to connect to a network — either via cable (ethernet port) or wirelessly (Wi-Fi chip).' },
        { type: 'key_term', term: 'Switch', definition: 'Connects multiple wired devices on the same network. Smarter than a hub — sends data only to the intended device, not all devices.' },
        { type: 'heading', text: 'How Wi-Fi Works', level: 2 },
        { type: 'paragraph', text: 'Wi-Fi uses radio waves to transmit data between devices and a wireless access point. When you send a request (e.g. loading a website), your device sends radio signals to the nearest access point, which routes the request through the router to the internet and back.' },
        { type: 'heading', text: '2.4 GHz vs 5 GHz', level: 2 },
        {
          type: 'table',
          headers: ['Feature', '2.4 GHz', '5 GHz'],
          rows: [
            ['Range', 'Longer — passes through walls better', 'Shorter — weakens through walls'],
            ['Speed', 'Slower (max ~600 Mbps)', 'Faster (max ~1300 Mbps+)'],
            ['Congestion', 'More congested — shared with microwaves, baby monitors', 'Less congested — fewer devices use it'],
            ['Best for', 'Devices far from the router, IoT devices', 'Streaming, gaming, devices near the router'],
          ],
        },
        { type: 'heading', text: 'Types of Networks', level: 2 },
        {
          type: 'table',
          headers: ['Type', 'Stands for', 'Coverage', 'Example'],
          rows: [
            ['PAN', 'Personal Area Network', 'A few metres', 'Bluetooth headphones connected to your phone'],
            ['LAN', 'Local Area Network', 'A building or campus', 'Computers connected at school or home'],
            ['WAN', 'Wide Area Network', 'Cities, countries, global', 'The internet; connections between bank branches'],
          ],
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cwn-q1',
          text: 'Which device connects your home network to the internet via your ISP?',
          options: ['Switch', 'Wireless Access Point', 'Modem', 'NIC'],
          correct_index: 2,
          explanation: 'The modem (Modulator-Demodulator) connects your network to the internet through your ISP. It converts signals between your network and the ISP\'s infrastructure.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cwn-q2',
          text: 'A student is gaming online and needs the fastest, most reliable connection. Their device is close to the router. Which Wi-Fi band should they use?',
          options: ['2.4 GHz — it has better range', '5 GHz — it is faster and less congested', '2.4 GHz — it is less congested', 'Either band — they perform identically'],
          correct_index: 1,
          explanation: '5 GHz offers faster speeds and is less congested than 2.4 GHz. For a device close to the router where range is not an issue, 5 GHz is the better choice for gaming and streaming.',
        },
        {
          type: 'exercise_question', question_type: 'matching', id: 'cwn-q3',
          text: 'Match each network type to its correct description.',
          pairs: [
            { term: 'PAN', definition: 'Personal network covering a few metres, e.g. Bluetooth' },
            { term: 'LAN', definition: 'Network covering a building or campus, e.g. school network' },
            { term: 'WAN', definition: 'Network covering large distances, e.g. the internet' },
            { term: 'WAP', definition: 'Device that broadcasts a Wi-Fi signal for devices to connect to' },
          ],
        },
      ],
    },
  },

  {
    title: 'Selecting Hardware for a Network',
    type: 'article',
    order_index: 2,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'Choosing the Right Hardware', level: 2 },
        { type: 'paragraph', text: 'Setting up or upgrading a network requires selecting the right hardware for your specific situation. The ideal choice depends on the environment (home, school, office), the number of devices, the required speed, and budget constraints.' },
        { type: 'heading', text: 'Key Factors to Consider', level: 2 },
        {
          type: 'list', style: 'bullet',
          items: [
            'Speed — What data transfer rate is needed? (Measured in Mbps or Gbps)',
            'Range — How large is the space that needs coverage?',
            'Number of devices — How many devices will connect simultaneously?',
            'Security — Does the hardware support modern security protocols (WPA3)?',
            'Cost — What is the budget? Consider upfront cost and ongoing costs (e.g. subscriptions)',
            'Reliability — Is the hardware from a reputable manufacturer with good support?',
          ],
        },
        { type: 'heading', text: 'Wired vs Wireless', level: 2 },
        {
          type: 'table',
          headers: ['Feature', 'Wired (Ethernet)', 'Wireless (Wi-Fi)'],
          rows: [
            ['Speed', 'Faster and more consistent (up to 10 Gbps)', 'Slower and variable (affected by interference)'],
            ['Reliability', 'More reliable — no interference', 'Can be affected by walls, other devices'],
            ['Mobility', 'Limited — must be physically connected', 'Flexible — connect from anywhere in range'],
            ['Security', 'More secure — harder to intercept', 'Less secure — signals can be intercepted'],
            ['Cost', 'Higher setup cost (cabling)', 'Lower setup cost, higher ongoing management'],
            ['Best for', 'Desktop PCs, servers, smart TVs, gaming consoles', 'Laptops, smartphones, tablets, IoT devices'],
          ],
        },
        { type: 'heading', text: 'Router Selection Guide', level: 2 },
        {
          type: 'table',
          headers: ['Use Case', 'Recommended Spec'],
          rows: [
            ['Small home (1-3 devices)', 'Basic router, single-band 2.4 GHz, 100 Mbps'],
            ['Medium home (4-10 devices)', 'Dual-band router (2.4 + 5 GHz), 300+ Mbps, good range'],
            ['Large home / multiple floors', 'Mesh Wi-Fi system (multiple nodes), dual-band, 600+ Mbps'],
            ['Small business / school lab', 'Business-grade router, managed switch, multiple WAPs, Gigabit speeds'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'For large spaces with dead zones, a mesh Wi-Fi system (like Google Nest or Eero) uses multiple nodes that work together to provide seamless coverage — better than a single router or range extender.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'shn-q1',
          text: 'A school wants to set up a computer lab with 25 desktop PCs that need fast, reliable connections. Which network type is most appropriate?',
          options: ['Wireless only — Wi-Fi is fast enough', 'Wired Ethernet — more reliable and faster', 'Bluetooth — easiest to set up', 'Satellite — most modern option'],
          correct_index: 1,
          explanation: 'Wired Ethernet is the best choice for a computer lab. It provides consistent high speeds, is not affected by interference, and is more secure than wireless. Desktop PCs do not need mobility.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'shn-q2',
          text: 'A mesh Wi-Fi system is a good solution for a large home with multiple floors and dead zones.',
          correct_answer: true,
          explanation: 'True. Mesh Wi-Fi systems use multiple nodes that communicate with each other to provide seamless coverage throughout large or multi-floor spaces. They automatically route traffic through the strongest node.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'shn-q3',
          text: 'Which factor is MOST important when selecting network hardware for a hospital environment?',
          options: ['Lowest possible cost', 'Reliability and security', 'Maximum wireless range', 'Newest hardware generation'],
          correct_index: 1,
          explanation: 'In critical environments like hospitals, reliability (the network must never go down) and security (patient data must be protected) are paramount. Cost and range are secondary considerations.',
        },
      ],
    },
  },

  {
    title: 'Network Security',
    type: 'article',
    order_index: 3,
    estimated_minutes: 15,
    content: {
      blocks: [
        { type: 'heading', text: 'Why Network Security Matters', level: 2 },
        { type: 'paragraph', text: 'Every device connected to a network is a potential target for attackers. Network security involves protecting the hardware, software, and data that make up a network from unauthorised access, misuse, damage, or attacks. Understanding threats and countermeasures is fundamental for anyone in IT.' },
        { type: 'callout', variant: 'important', text: 'Cybercrime costs the global economy over $8 trillion annually (2023). Most breaches involve human error or weak security practices — not sophisticated hacking.' },
        { type: 'heading', text: 'Common Network Threats', level: 2 },
        { type: 'key_term', term: 'Malware', definition: 'Malicious software designed to damage, disrupt, or gain unauthorised access to systems. Includes viruses, ransomware, spyware, and trojans.' },
        { type: 'key_term', term: 'Phishing', definition: 'Fraudulent messages (usually email) that trick users into revealing passwords, credit card details, or downloading malware.' },
        { type: 'key_term', term: 'Eavesdropping (Sniffing)', definition: 'Intercepting data transmitted over a network — particularly dangerous on unsecured public Wi-Fi.' },
        { type: 'key_term', term: 'Man-in-the-Middle Attack', definition: 'An attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly.' },
        { type: 'key_term', term: 'Denial of Service (DoS)', definition: 'Flooding a server or network with traffic to make it unavailable to legitimate users.' },
        { type: 'heading', text: 'Security Measures', level: 2 },
        {
          type: 'table',
          headers: ['Measure', 'What it does', 'Protects against'],
          rows: [
            ['Firewall', 'Monitors and filters incoming/outgoing network traffic based on rules', 'Unauthorised access, malicious connections'],
            ['Encryption', 'Scrambles data so it can only be read by authorised parties with the key', 'Eavesdropping, data theft in transit'],
            ['VPN', 'Creates an encrypted tunnel for your internet traffic, hiding your activity and IP', 'Eavesdropping, tracking on public Wi-Fi'],
            ['WPA3', 'Latest Wi-Fi encryption protocol — stronger than WPA2', 'Unauthorised Wi-Fi access, password cracking'],
            ['Two-Factor Authentication (2FA)', 'Requires a second verification step (e.g. SMS code) beyond a password', 'Account takeover even if password is stolen'],
            ['Network Access Control', 'Restricts which devices can connect to the network', 'Unauthorised devices connecting'],
          ],
        },
        { type: 'heading', text: 'Wi-Fi Security Protocols', level: 2 },
        { type: 'paragraph', text: 'Wi-Fi security protocols encrypt the data sent between your device and the router. Using an outdated protocol is like leaving your door unlocked.' },
        {
          type: 'table',
          headers: ['Protocol', 'Year', 'Status', 'Notes'],
          rows: [
            ['WEP', '1997', 'Broken — do not use', 'Crackable in minutes with free tools'],
            ['WPA', '2003', 'Weak — avoid', 'Improved over WEP but still vulnerable'],
            ['WPA2', '2004', 'Acceptable — widely used', 'Current standard in most devices; use AES encryption'],
            ['WPA3', '2018', 'Recommended', 'Strongest current standard; much harder to brute-force'],
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Strong passwords are your first line of defence. Use a password manager to generate and store unique, complex passwords for each account. Never reuse passwords.' },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'ns-q1',
          text: 'A student uses the school\'s open public Wi-Fi to log into their bank account. What is the main security risk?',
          options: ['The website will load slowly', 'An attacker could intercept their login credentials via eavesdropping', 'Their device might run out of battery', 'The bank might block the connection'],
          correct_index: 1,
          explanation: 'Open (unsecured) public Wi-Fi does not encrypt traffic. An attacker on the same network could use packet sniffing tools to intercept unencrypted login credentials. Always use a VPN or HTTPS on public Wi-Fi.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'ns-q2',
          text: 'WPA3 is a stronger and more secure Wi-Fi encryption protocol than WPA2.',
          correct_answer: true,
          explanation: 'True. WPA3, released in 2018, introduced stronger encryption and better protection against password guessing attacks (brute force and dictionary attacks). It is the recommended standard for new Wi-Fi networks.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'ns-q3',
          text: 'Which security measure creates an encrypted tunnel for internet traffic, protecting users on public Wi-Fi?',
          options: ['Firewall', 'VPN', 'WPA2', 'Network Access Control'],
          correct_index: 1,
          explanation: 'A VPN (Virtual Private Network) encrypts all internet traffic and routes it through a secure server, hiding your activity and protecting you from eavesdropping — especially useful on public Wi-Fi.',
        },
      ],
    },
  },

  {
    title: 'Connecting and Troubleshooting Networks',
    type: 'article',
    order_index: 4,
    estimated_minutes: 10,
    content: {
      blocks: [
        { type: 'heading', text: 'Connecting a Device to a Network', level: 2 },
        { type: 'paragraph', text: 'Connecting devices to a network is a routine IT task. Whether wired or wireless, the process follows predictable steps. Knowing how to do this — and how to fix it when it goes wrong — is an essential practical skill.' },
        { type: 'heading', text: 'Connecting via Wi-Fi (Step by Step)', level: 2 },
        {
          type: 'list', style: 'numbered',
          items: [
            'Open your device\'s Wi-Fi settings (Settings > Wi-Fi or Network)',
            'Ensure Wi-Fi is turned on',
            'Wait for your device to scan for available networks (SSIDs)',
            'Select your network from the list',
            'Enter the Wi-Fi password (passphrase) when prompted',
            'Wait for the device to obtain an IP address via DHCP',
            'Test the connection — open a browser or ping a known address',
          ],
        },
        { type: 'key_term', term: 'SSID', definition: 'Service Set Identifier — the name of a Wi-Fi network as it appears in the list of available networks.' },
        { type: 'key_term', term: 'DHCP', definition: 'Dynamic Host Configuration Protocol — automatically assigns an IP address to a device when it connects to a network.' },
        { type: 'key_term', term: 'IP Address', definition: 'A unique numerical address assigned to each device on a network (e.g. 192.168.1.5). Allows devices to find and communicate with each other.' },
        { type: 'heading', text: 'Common Problems and Solutions', level: 2 },
        {
          type: 'table',
          headers: ['Problem', 'Likely Cause', 'Solution'],
          rows: [
            ['Cannot see network in Wi-Fi list', 'Router turned off; device too far away; 5GHz not visible on old device', 'Check router power; move closer; check frequency compatibility'],
            ['Wrong password error', 'Mistyped password; password changed', 'Re-enter carefully; check router label or ask admin'],
            ['Connected to Wi-Fi but no internet', 'ISP outage; router needs restart; DNS issue', 'Restart router/modem; check ISP status; try alternate DNS'],
            ['Slow internet speed', 'Network congestion; interference; too many devices', 'Use 5 GHz band; move closer to router; disconnect unused devices'],
            ['IP address conflict', 'Two devices assigned the same IP', 'Restart both devices; router will reassign via DHCP'],
          ],
        },
        { type: 'heading', text: 'Diagnostic Tools', level: 2 },
        { type: 'key_term', term: 'ping', definition: 'A command that sends a test packet to an IP address to check if it is reachable and measure response time. Usage: ping 8.8.8.8 (Google\'s DNS server).' },
        { type: 'key_term', term: 'ipconfig / ifconfig', definition: 'Windows command (ipconfig) or Mac/Linux command (ifconfig) that shows your device\'s network configuration — IP address, subnet mask, default gateway.' },
        { type: 'key_term', term: 'tracert / traceroute', definition: 'Shows the path data takes from your device to a destination, helping identify where a connection is failing.' },
        {
          type: 'callout', variant: 'tip',
          text: 'The "turn it off and on again" cliché works because most network issues are caused by stale states or cached data. Always try restarting the device and router before deeper troubleshooting.',
        },
        { type: 'divider' },
        { type: 'heading', text: 'Check Your Understanding', level: 2 },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cat-q1',
          text: 'A student\'s laptop is connected to Wi-Fi but cannot load any websites. What should they try FIRST?',
          options: ['Buy a new router', 'Reinstall the operating system', 'Restart the router and modem', 'Switch to a different internet service provider'],
          correct_index: 2,
          explanation: 'Restarting the router and modem clears temporary issues and forces the router to reconnect to the ISP. This resolves the majority of "connected but no internet" problems and should always be the first step.',
        },
        {
          type: 'exercise_question', question_type: 'mcq', id: 'cat-q2',
          text: 'What does the ping command test?',
          options: ['The speed of your Wi-Fi signal', 'Whether a remote device is reachable and how long it takes to respond', 'Your device\'s IP address configuration', 'The strength of your wireless encryption'],
          correct_index: 1,
          explanation: 'The ping command sends test packets to an IP address and measures whether they arrive and how long the round trip takes (in milliseconds). A high ping or packet loss indicates connectivity problems.',
        },
        {
          type: 'exercise_question', question_type: 'true_false', id: 'cat-q3',
          text: 'DHCP automatically assigns an IP address to a device when it connects to a network.',
          correct_answer: true,
          explanation: 'True. DHCP (Dynamic Host Configuration Protocol) is a service that runs on routers and servers. When your device joins a network, it requests an IP address from the DHCP server, which assigns one from its pool of available addresses.',
        },
      ],
    },
  },

  {
    title: 'Networks Review Quiz',
    type: 'quiz',
    order_index: 5,
    estimated_minutes: 15,
    content: {
      pass_score: 7,
      questions: [
        {
          id: 'net-rq1', type: 'mcq',
          text: 'Which device in a home network connects to your ISP and converts signals for use on your local network?',
          options: ['Switch', 'Router', 'Modem', 'Wireless Access Point'],
          correct_index: 2,
          explanation: 'The modem (Modulator-Demodulator) is the device that connects your home to your ISP. It converts signals between the ISP\'s network and your local network. The router then manages traffic within your home.',
        },
        {
          id: 'net-rq2', type: 'mcq',
          text: 'What does NIC stand for?',
          options: ['Network Internet Controller', 'Network Interface Card', 'Node Identification Code', 'Narrow Integrated Circuit'],
          correct_index: 1,
          explanation: 'NIC stands for Network Interface Card — the hardware component inside a device that enables it to connect to a network, either via Ethernet cable or Wi-Fi.',
        },
        {
          id: 'net-rq3', type: 'true_false',
          text: '2.4 GHz Wi-Fi has greater range than 5 GHz Wi-Fi.',
          correct_answer: true,
          explanation: 'True. 2.4 GHz radio waves have a longer wavelength that passes through walls and obstacles better than 5 GHz. However, 5 GHz is faster and less congested where range is not a concern.',
        },
        {
          id: 'net-rq4', type: 'mcq',
          text: 'A school connects all computers in a single building into a shared network. What type of network is this?',
          options: ['PAN', 'LAN', 'WAN', 'MAN'],
          correct_index: 1,
          explanation: 'A LAN (Local Area Network) covers a limited area such as a building or campus. It is the most common type of network in schools, homes, and businesses.',
        },
        {
          id: 'net-rq5', type: 'mcq',
          text: 'Which Wi-Fi security protocol is currently the strongest and most recommended?',
          options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
          correct_index: 3,
          explanation: 'WPA3 (released 2018) is the current strongest Wi-Fi security protocol. WEP is broken, WPA is weak, and WPA2 is acceptable but being superseded by WPA3.',
        },
        {
          id: 'net-rq6', type: 'mcq',
          text: 'What does a firewall primarily do?',
          options: ['Speeds up your internet connection', 'Monitors and filters network traffic based on security rules', 'Assigns IP addresses to devices', 'Broadcasts the Wi-Fi signal'],
          correct_index: 1,
          explanation: 'A firewall monitors and filters incoming and outgoing network traffic based on predefined security rules. It blocks unauthorised access while allowing legitimate traffic through.',
        },
        {
          id: 'net-rq7', type: 'true_false',
          text: 'A VPN encrypts your internet traffic and can protect you when using public Wi-Fi.',
          correct_answer: true,
          explanation: 'True. A VPN (Virtual Private Network) creates an encrypted tunnel for all your internet traffic. This prevents eavesdroppers on public Wi-Fi from intercepting your data.',
        },
        {
          id: 'net-rq8', type: 'mcq',
          text: 'What command would you use to test whether a remote server (e.g. 8.8.8.8) is reachable from your device?',
          options: ['ipconfig', 'ping', 'tracert', 'netstat'],
          correct_index: 1,
          explanation: 'The ping command sends test packets to an IP address and reports whether they arrived and how long the round trip took. It is the standard first step in testing network connectivity.',
        },
        {
          id: 'net-rq9', type: 'mcq',
          text: "A device is 'connected' to Wi-Fi but cannot access the internet. What should you try first?",
          options: ['Replace the router immediately', 'Restart the router and modem', 'Reinstall all network drivers', 'Change the Wi-Fi password'],
          correct_index: 1,
          explanation: 'Restarting the router and modem clears temporary faults and reconnects to the ISP. This resolves the vast majority of "connected but no internet" issues and should always be the first troubleshooting step.',
        },
        {
          id: 'net-rq10', type: 'mcq',
          text: 'Which is the BEST network connection for a desktop computer being used for video editing and file transfers in a fixed location?',
          options: ['5 GHz Wi-Fi', '2.4 GHz Wi-Fi', 'Wired Ethernet', 'Bluetooth'],
          correct_index: 2,
          explanation: 'Wired Ethernet provides the fastest and most reliable connection for fixed devices. For data-intensive tasks like video editing, a stable wired connection is always preferred over wireless.',
        },
      ],
    },
  },
]

// ─────────────────────────────────────────────────────────────
// SEED LOGIC
// ─────────────────────────────────────────────────────────────

async function upsertUnit() {
  const existing = await pool.query<{ id: string }>(
    `SELECT id FROM units WHERE order_index = 2`
  )
  if (existing.rows[0]) {
    console.log('  Unit 2 already exists, id:', existing.rows[0].id)
    return existing.rows[0].id
  }
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO units (title, subtitle, semester, order_index, status, color)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    ['Data, Networks and Systems', 'Managing information, networking fundamentals, and digital systems', 2, 2, 'available', '#0A7B57']
  )
  console.log('  Created Unit 2, id:', rows[0].id)
  return rows[0].id
}

async function upsertTopic(unitId: string, title: string, orderIndex: number, color: string, estimatedHours: number, description: string) {
  const existing = await pool.query<{ id: string }>(
    `SELECT id FROM topics WHERE unit_id = $1 AND order_index = $2`,
    [unitId, orderIndex]
  )
  if (existing.rows[0]) {
    console.log(`  Topic "${title}" already exists, id:`, existing.rows[0].id)
    return existing.rows[0].id
  }
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO topics (unit_id, title, description, order_index, color, estimated_hours)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [unitId, title, description, orderIndex, color, estimatedHours]
  )
  console.log(`  Created topic "${title}", id:`, rows[0].id)
  return rows[0].id
}

async function insertLesson(topicId: string, lesson: typeof topic1Lessons[0]) {
  const existing = await pool.query<{ id: string }>(
    `SELECT id FROM lessons WHERE topic_id = $1 AND order_index = $2`,
    [topicId, lesson.order_index]
  )
  if (existing.rows[0]) {
    // Update content in place
    await pool.query(
      `UPDATE lessons SET title = $1, type = $2, content = $3, estimated_minutes = $4 WHERE id = $5`,
      [lesson.title, lesson.type, JSON.stringify(lesson.content), lesson.estimated_minutes, existing.rows[0].id]
    )
    console.log(`    Updated lesson "${lesson.title}"`)
    return
  }
  await pool.query(
    `INSERT INTO lessons (topic_id, title, type, content, order_index, estimated_minutes)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [topicId, lesson.title, lesson.type, JSON.stringify(lesson.content), lesson.order_index, lesson.estimated_minutes]
  )
  console.log(`    Inserted lesson "${lesson.title}"`)
}

async function main() {
  console.log('Seeding Unit 2 lessons…')

  const unitId = await upsertUnit()

  console.log('\nSeeding Topic 1: Managing Data')
  const topic1Id = await upsertTopic(unitId, 'Managing Data', 1, '#1865F2', 2.5,
    'Data types, evaluating sources, search techniques, file formats, and file organisation')
  for (const lesson of topic1Lessons) {
    await insertLesson(topic1Id, lesson)
  }

  console.log('\nSeeding Topic 2: Networks')
  const topic2Id = await upsertTopic(unitId, 'Networks', 2, '#9059FF', 2.0,
    'Wireless network components, hardware selection, network security, and troubleshooting')
  for (const lesson of topic2Lessons) {
    await insertLesson(topic2Id, lesson)
  }

  console.log('\nDone! Unit 2 seeded successfully.')
}

main().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
}).finally(() => pool.end())
