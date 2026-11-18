export type ReceiptCategory = 'blueprint' | 'sale' | 'non-sale';

export type RuleGroup = 'header' | 'body' | 'closing';

export interface BodySegment {
  text: string;
  ruleId?: number;
  /** Shows an inline numbered marker badge (1–15) on the Master Blueprint */
  markerRuleId?: number;
  /** Optional inline variant for Receipt 4 (Book vs. Video terminology) */
  terminologyVariant?: {
    video: string;
    book: string;
  };
  /** Marks numeric bracketed amounts like (=6,000/=) for crisp bidirectional rendering */
  isAmountDigits?: boolean;
}

export interface PartyRecord {
  heading: string; // گواہ شد or العبد
  name: string;
  lines: string[]; // address/role lines
  cnic: string;
  signatureLabel: string;
}

export interface ReceiptItem {
  id: number;
  englishTitle: string;
  urduTitle: string;
  category: ReceiptCategory;
  textbookPages: string;
  headingLines: [string, string, string];
  openingPhrase: string;
  totalAmountDigits: string;
  halfAmountDigits: string;
  bodySegments: BodySegment[];
  rightWitness: PartyRecord;
  scribe: PartyRecord;
  leftWitness: PartyRecord;
  tahreerDate: string;
  specialNote?: {
    title: string;
    urduSummary: string;
    englishSummary: string;
  };
}

export interface ExamRule {
  id: number;
  group: RuleGroup;
  title: string;
  urduTag: string;
  description: string;
  urduInstruction: string;
  tip?: string;
}

export const EXAM_RULES: ExamRule[] = [
  {
    id: 1,
    group: 'header',
    title: 'Fixed Opening Phrase',
    urduTag: 'باعثِ تحریر آنکہ',
    description:
      'Placed centered directly beneath the 3-line exam heading (سوال نمبر 7 → رسید نگاری → عنوان). Never begin the body directly without this opening.',
    urduInstruction:
      'امتحانی سرخی کی تین سطور (سوال نمبر 7، رسید نگاری، عنوان) کے عین نیچے درمیان میں "باعثِ تحریر آنکہ" لکھیں۔',
  },
  {
    id: 2,
    group: 'body',
    title: 'Total Amount in Digits',
    urduTag: '(=6,000/=)',
    description:
      'State total digits first, enclosed in parentheses with "=" at the start and a slanted "/=" at the end (never a vertical bar "|") to prevent tampering.',
    urduInstruction:
      'کل رقم ہندسوں میں قوسین کے اندر لکھیں؛ شروع میں "=" اور آخر میں ترچھی لکیر "/=" لگائیں (سیدھی لکیر "|" ہرگز نہ لگائیں)۔',
    tip: 'Use کل قیمت مبلغ for sale receipts (1, 2, 4) and کل رقم مبلغ for non-sale receipts (3, 5, 6).',
  },
  {
    id: 3,
    group: 'body',
    title: 'Total Amount in Words',
    urduTag: 'روپے صرف',
    description:
      'Immediately follow the digits with the full amount written in Urdu words inside parentheses, ending strictly with the word "صرف".',
    urduInstruction:
      'ہندسوں کے فوراً بعد پوری رقم اردو لفظوں میں قوسین میں لکھیں اور آخر میں لازماً "صرف" تحریر کریں۔',
  },
  {
    id: 4,
    group: 'body',
    title: 'Half Amount in Digits',
    urduTag: 'نصف جن کے مبلغ',
    description:
      'Repeat half of the total value in digits using "نصف جن کے مبلغ (=.../=)" right after the full amount in words.',
    urduInstruction:
      'لفظوں میں رقم کے فوراً بعد "نصف جن کے مبلغ" لکھ کر آدھی رقم دوبارہ ہندسوں میں (=.../=) کے ساتھ لکھیں۔',
  },
  {
    id: 5,
    group: 'body',
    title: 'Half Amount in Words',
    urduTag: 'روپے صرف بنتے ہیں',
    description:
      'Write the half amount in Urdu words ending with "صرف", followed by "بنتے ہیں" — completing all 4 required mentions of the amount.',
    urduInstruction:
      'آدھی رقم لفظوں میں لکھ کر آخر میں "صرف" اور پھر "بنتے ہیں" لکھیں؛ اس طرح رقم کل چار مرتبہ لکھی جائے گی۔',
  },
  {
    id: 6,
    group: 'body',
    title: 'Continuous Single-Paragraph Purpose',
    urduTag: 'بابت / بابت قیمت فروخت',
    description:
      'Keep the entire body from کل قیمت/رقم through بوقتِ ضرورت کام آئے in one continuous sentence without line breaks or paragraph gaps.',
    urduInstruction:
      'پورا متن کل قیمت/رقم سے لے کر "بوقتِ ضرورت کام آئے۔" تک ایک ہی مسلسل جملے میں بغیر کسی پیراگراف یا وقفے کے لکھیں۔',
    tip: 'Use "بابت قیمت فروخت" for sales and "بابت" for rent, land revenue, or stipends.',
  },
  {
    id: 7,
    group: 'body',
    title: 'Expanded Full-Page Details',
    urduTag: 'تفصیلِ شے / مقصد',
    description:
      'Include realistic specifications (weight, brand, engine/chassis numbers, rooms, cattle traits, land area, or academic session) so the receipt covers a full exam page.',
    urduInstruction:
      'فروخت کردہ شے یا مقصد کی مکمل تفصیل (وزن، رنگ، ماڈل، انجن/چیسیز نمبر، رقبہ، کمرے یا سیشن وغیرہ) درج کریں تاکہ رسید پورا صفحہ بھر سکے۔',
  },
  {
    id: 8,
    group: 'body',
    title: 'Payer Identity & Parentage',
    urduTag: 'ازاں جناب ۔۔۔ ولد ۔۔۔',
    description:
      'State who paid the money using "ازاں جناب" followed by full name, parentage (ولد), and caste/tribe (ذات/قوم) or official designation.',
    urduInstruction:
      '"ازاں جناب" لکھ کر رقم ادا کرنے والے کا پورا نام، ولدیت اور ذات یا سرکاری عہدہ تحریر کریں۔',
  },
  {
    id: 9,
    group: 'body',
    title: 'Payer Complete Address',
    urduTag: 'ساکن / تحصیل و ضلع',
    description:
      'Provide complete residential or institutional address including locality/village, tehsil, and district.',
    urduInstruction:
      'رقم دینے والے کا مکمل پتہ مع محلہ یا چک، تحصیل اور ضلع واضح طور پر تحریر کریں۔',
  },
  {
    id: 10,
    group: 'body',
    title: 'Fixed Legal Closing Sentence',
    urduTag: 'تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
    description:
      'End the continuous sentence with "سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔".',
    urduInstruction:
      'رسید کے مرکزی جملے کا اختتام ہمیشہ اس مقررہ جملے پر کریں: "سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔"',
  },
  {
    id: 11,
    group: 'closing',
    title: 'Right Witness Column',
    urduTag: 'گواہ شد (دائیں)',
    description:
      'Place the first witness on the right side with full name, parentage, complete fictitious address, 13-digit CNIC, and signature line.',
    urduInstruction:
      'صفحے کے دائیں جانب "گواہ شد" لکھ کر پہلے گواہ کا نام، ولدیت، فرضی مکمل پتہ، شناختی کارڈ نمبر اور دستخط کی لکیر بنائیں۔',
  },
  {
    id: 12,
    group: 'closing',
    title: 'Center Scribe / Receiver Column',
    urduTag: 'العبد (درمیان)',
    description:
      'Place "العبد" (the person receiving the money and issuing the receipt) dead center between the two witnesses with address, CNIC, and signature.',
    urduInstruction:
      'دونوں گواہوں کے عین درمیان "العبد" لکھ کر رقم وصول کرنے والے کا نام، ولدیت، پتہ، شناختی کارڈ نمبر اور دستخط درج کریں۔',
  },
  {
    id: 13,
    group: 'closing',
    title: 'Left Witness Column',
    urduTag: 'گواہ شد (بائیں)',
    description:
      'Place the second witness on the left side with full name, parentage, address, CNIC, and signature line.',
    urduInstruction:
      'صفحے کے بائیں جانب دوسرا "گواہ شد" لکھ کر دوسرے گواہ کا نام، ولدیت، فرضی پتہ، شناختی کارڈ نمبر اور دستخط کی لکیر بنائیں۔',
  },
  {
    id: 14,
    group: 'closing',
    title: 'Tahreer Date Format',
    urduTag: 'تحریر: دن ہندسوں میں، مہینہ لفظوں میں',
    description:
      'Center "تحریر" directly below العبد, writing the day in digits, the month name in Urdu words, and the year in digits with "ء".',
    urduInstruction:
      '"العبد" کے عین نیچے درمیان میں "تحریر" لکھیں؛ تاریخ ہندسوں میں، مہینہ لفظوں میں اور سنہ ہندسوں میں مع "ء" لکھیں (مثلاً 15 جنوری 2026ء)۔',
  },
  {
    id: 15,
    group: 'closing',
    title: 'Raseedi Ticket Stamp Box',
    urduTag: '(رسیدی ٹکٹ)',
    description:
      'Draw a small square in the bottom-left corner (under the left گواہ شد) with a cross extending half inside and half outside the box, labeled "(رسیدی ٹکٹ)" beneath.',
    urduInstruction:
      'بائیں جانب والے "گواہ شد" کے نیچے ایک چھوٹا چوکور ڈبہ بنائیں، اس پر کراس (×) آدھا ڈبے کے اندر اور آدھا باہر رکھیں اور نیچے "(رسیدی ٹکٹ)" لکھیں۔',
  },
];

export const MASTER_BLUEPRINT: ReceiptItem = {
  id: 0,
  englishTitle: 'Master Format Blueprint',
  urduTitle: 'خاکہ رسید نگاری',
  category: 'blueprint',
  textbookPages: 'Video Guide · Rules 1–15',
  headingLines: [
    'ـــــــ سوال نمبر (7) ـــــــ',
    'ـــــــ رسید نگاری ـــــــ',
    '"رسید بابت ۔۔۔۔۔۔ (عنوانِ رسید)"',
  ],
  openingPhrase: 'باعثِ تحریر آنکہ',
  totalAmountDigits: '(= ۔۔۔ /=)',
  halfAmountDigits: '(= ۔۔۔ /=)',
  bodySegments: [
    {
      text: 'کل قیمت مبلغ (فروخت کے لیے) / کل رقم مبلغ (کرایہ، لگان، وظیفہ کے لیے) ',
      ruleId: 2,
    },
    {
      text: '(= ۔۔۔۔۔۔ /=)',
      ruleId: 2,
      markerRuleId: 2,
      isAmountDigits: true,
    },
    { text: ' ' },
    {
      text: '( ۔۔۔۔۔۔ روپے صرف)',
      ruleId: 3,
      markerRuleId: 3,
    },
    { text: ' نصف جن کے مبلغ ', ruleId: 4 },
    {
      text: '(= ۔۔۔۔۔۔ /=)',
      ruleId: 4,
      markerRuleId: 4,
      isAmountDigits: true,
    },
    { text: ' ' },
    {
      text: '( ۔۔۔۔۔۔ روپے صرف)',
      ruleId: 5,
      markerRuleId: 5,
    },
    { text: ' بنتے ہیں، ', ruleId: 5 },
    {
      text: 'بابت (قیمت فروخت / کرایہ / زرِ لگان / وظیفہ)',
      ruleId: 6,
      markerRuleId: 6,
    },
    {
      text: ' (شے یا مقصد کی مکمل و تفصیلی وضاحت: وزن، مقدار، قسم، رنگ، ماڈل، انجن/چیسیز نمبر، مدت یا کمرے وغیرہ تاکہ عبارت ایک مکمل صفحے پر پھیل جائے)، ',
      ruleId: 7,
      markerRuleId: 7,
    },
    {
      text: 'ازاں جناب (رقم ادا کرنے والے کا نام ولد والد کا نام، ذات/قوم)',
      ruleId: 8,
      markerRuleId: 8,
    },
    {
      text: ' (مکمل پتہ: ساکن/سکنہ، محلہ یا چک، تحصیل و ضلع) ',
      ruleId: 9,
      markerRuleId: 9,
    },
    {
      text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
      ruleId: 10,
      markerRuleId: 10,
    },
  ],
  rightWitness: {
    heading: 'گواہ شد',
    name: 'پہلا گواہ ولد والد کا نام',
    lines: ['ساکن: محلہ / گلی نمبر ۔۔۔ (فرضی پتہ)', 'تحصیل و ضلع: ۔۔۔۔۔۔'],
    cnic: 'شناختی کارڈ نمبر: XXXXX-XXXXXXX-3',
    signatureLabel: 'دستخط: ________',
  },
  scribe: {
    heading: 'العبد',
    name: 'وصول کنندہ کا نام ولد والد کا نام',
    lines: ['ساکن: محلہ / مکان نمبر ۔۔۔ (فرضی پتہ)', 'تحصیل و ضلع: ۔۔۔۔۔۔'],
    cnic: 'شناختی کارڈ نمبر: XXXXX-XXXXXXX-1',
    signatureLabel: 'دستخط: ________',
  },
  leftWitness: {
    heading: 'گواہ شد',
    name: 'دوسرا گواہ ولد والد کا نام',
    lines: ['ساکن: محلہ / گلی نمبر ۔۔۔ (فرضی پتہ)', 'تحصیل و ضلع: ۔۔۔۔۔۔'],
    cnic: 'شناختی کارڈ نمبر: XXXXX-XXXXXXX-2',
    signatureLabel: 'دستخط: ________',
  },
  tahreerDate: 'تحریر: (دن ہندسوں میں) (مہینہ لفظوں میں) (سال ہندسوں میں)ء',
};

export const RECEIPTS: ReceiptItem[] = [
  {
    id: 1,
    englishTitle: 'Wheat Sale Receipt',
    urduTitle: 'فروخت گندم',
    category: 'sale',
    textbookPages: 'pp. 96–97',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت فروختگی گندم"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=6,000/=)',
    halfAmountDigits: '(=3,000/=)',
    bodySegments: [
      { text: 'کل قیمت مبلغ ', ruleId: 2 },
      { text: '(=6,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(چھ ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=3,000/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(تین ہزار روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت قیمت فروخت', ruleId: 6 },
      {
        text: ' ایک عدد توڑا گندم، دیسی اعلیٰ قسم، صاف ستھری، خشک اور بے غبار، کل وزن ساٹھ (60) کلوگرام یعنی ڈیڑھ من بمطابق نرخ چار ہزار روپے فی من، بوری کی سلائی مکمل اور حالت بالکل درست و محفوظ، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب محمد خالد ولد محمد سعید، ذات کھوکھر،', ruleId: 8 },
      { text: ' ساکن رحمت ٹاؤن، تحصیل و ضلع فیصل آباد ', ruleId: 9 },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'رضوان ولد محمد بخش',
      lines: ['ساکن: محلہ اسلام نگر، گلی نمبر 2', 'تحصیل و ضلع: فیصل آباد'],
      cnic: 'شناختی کارڈ نمبر: 33100-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'محمد مسعود ولد محمد سعید',
      lines: ['ساکن: رحمت ٹاؤن، مکان نمبر 14', 'تحصیل و ضلع: فیصل آباد'],
      cnic: 'شناختی کارڈ نمبر: 33100-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'محمد فیاض ولد محمد بشیر',
      lines: ['ساکن: پیپلز کالونی، مکان نمبر 8', 'تحصیل و ضلع: فیصل آباد'],
      cnic: 'شناختی کارڈ نمبر: 33100-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 15 جنوری 2026ء',
  },
  {
    id: 2,
    englishTitle: 'Motorcycle Sale Receipt',
    urduTitle: 'فروخت موٹر سائیکل',
    category: 'sale',
    textbookPages: 'pp. 97–98',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت فروختگی موٹر سائیکل"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=50,000/=)',
    halfAmountDigits: '(=25,000/=)',
    bodySegments: [
      { text: 'کل قیمت مبلغ ', ruleId: 2 },
      { text: '(=50,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(پچاس ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=25,000/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(پچیس ہزار روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت قیمت فروخت', ruleId: 6 },
      {
        text: ' ایک عدد موٹر سائیکل، کمپنی ہونڈا، برانڈ سی ڈی 70 (70 سی سی)، رجسٹریشن نمبر ایل ای 765 (LE-765)، ماڈل 2000ء، رنگ سرخ، انجن نمبر پی ایس 191887 (PS-191887)، چیسیز نمبر 2255436، مع مکمل اصل کاغذات و رجسٹریشن بک، ظاہری و مکینیکل حالت تسلی بخش و چالو حالت میں، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب محمد قاسم ولد محمد سلیم، ذات بھٹی،', ruleId: 8 },
      { text: ' ساکن مومن آباد، تحصیل و ضلع سرگودھا ', ruleId: 9 },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'کوثر علی ولد رحمت',
      lines: ['ساکن: چک نمبر 46 شمالی، گلی نمبر 1', 'تحصیل و ضلع: سرگودھا'],
      cnic: 'شناختی کارڈ نمبر: 38403-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'محمد دین ولد حمد اللہ',
      lines: ['ساکن: سیٹلائٹ ٹاؤن، بلاک بی', 'تحصیل و ضلع: سرگودھا'],
      cnic: 'شناختی کارڈ نمبر: 38403-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'اعجاز احمد ولد محمد منیر',
      lines: ['ساکن: مومن آباد، گلی نمبر 5', 'تحصیل و ضلع: سرگودھا'],
      cnic: 'شناختی کارڈ نمبر: 38403-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 20 فروری 2026ء',
  },
  {
    id: 3,
    englishTitle: 'House Rent Receipt',
    urduTitle: 'کرایہ مکان',
    category: 'non-sale',
    textbookPages: 'p. 98',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت وصولی کرایہ مکان"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=30,000/=)',
    halfAmountDigits: '(=15,000/=)',
    bodySegments: [
      { text: 'کل رقم مبلغ ', ruleId: 2 },
      { text: '(=30,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(تیس ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=15,000/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(پندرہ ہزار روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت', ruleId: 6 },
      {
        text: ' کرایہ مکان نمبر 42، سی بلاک، کنڈر گارٹن کالونی، گوجرانوالہ، مشتمل بر تین کمرے، باورچی خانہ، غسل خانہ، صحن اور برآمدہ، مع بجلی و گیس میٹر اور پینے کے پانی کی سہولت، بابت ماہِ مارچ 2026ء (یکم مارچ تا 31 مارچ 2026ء) بمطابق باہمی شرائطِ کرایہ نامہ، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب محمد عمیر ولد صغیر احمد، ذات چیمہ،', ruleId: 8 },
      {
        text: ' ساکن جھنگ (حال مقیم مکان نمبر 42، سی بلاک، کنڈر گارٹن کالونی، گوجرانوالہ) ',
        ruleId: 9,
      },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'اللہ بخش ولد محمد بخش',
      lines: ['ساکن: ڈی بلاک، کنڈر گارٹن کالونی', 'تحصیل و ضلع: گوجرانوالہ'],
      cnic: 'شناختی کارڈ نمبر: 34101-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'عبدالمنان ولد محمد اکبر',
      lines: ['ساکن: مکان نمبر 40، سی بلاک، کنڈر گارٹن کالونی', 'تحصیل و ضلع: گوجرانوالہ'],
      cnic: 'شناختی کارڈ نمبر: 34101-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'محمد اشرف ولد محمد اکبر',
      lines: ['ساکن: ماڈل ٹاؤن، گلی نمبر 4', 'تحصیل و ضلع: گوجرانوالہ'],
      cnic: 'شناختی کارڈ نمبر: 34101-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 30 مارچ 2026ء',
  },
  {
    id: 4,
    englishTitle: 'Cow Sale Receipt',
    urduTitle: 'فروخت گائے',
    category: 'sale',
    textbookPages: 'pp. 96, 98',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت فروختگی گائے"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=80,000/=)',
    halfAmountDigits: '(=40,000/=)',
    bodySegments: [
      { text: 'کل قیمت مبلغ ', ruleId: 2 },
      { text: '(=80,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(اسی ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=40,000/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(چالیس ہزار روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت قیمت فروخت', ruleId: 6 },
      { text: ' ایک ', ruleId: 7 },
      {
        text: 'شاخ',
        ruleId: 7,
        terminologyVariant: {
          video: 'شاخ',
          book: 'راس',
        },
      },
      {
        text: ' گائے، دیسی نسل، رنگ بھورا، دائیں آنکھ سیاہ، عمر تقریباً چھ سال، درمیانے مڑے ہوئے سینگ، مکمل صحت مند و تندرست اور ہر قسم کے عیب و بیماری سے پاک، دودھ دینے والی حالت میں، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب مسمی میاں عبدالرشید ولد میاں عبدالقدیر، ذات آرائیں،', ruleId: 8 },
      { text: ' سکنہ چک نمبر 32 شمالی، تحصیل کمالیہ، ضلع ٹوبہ ٹیک سنگھ ', ruleId: 9 },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'افتخار احمد ولد شجاع',
      lines: ['ساکن: چک نمبر 31 شمالی', 'تحصیل کمالیہ، ضلع: ٹوبہ ٹیک سنگھ'],
      cnic: 'شناختی کارڈ نمبر: 33302-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'طلحہ خان ولد اسد خان',
      lines: ['ساکن: محلہ اسلام آباد، گلی نمبر 3', 'تحصیل کمالیہ، ضلع: ٹوبہ ٹیک سنگھ'],
      cnic: 'شناختی کارڈ نمبر: 33302-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'محمد طارق ولد محمد شفقت',
      lines: ['ساکن: چک نمبر 32 شمالی', 'تحصیل کمالیہ، ضلع: ٹوبہ ٹیک سنگھ'],
      cnic: 'شناختی کارڈ نمبر: 33302-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 10 اپریل 2026ء',
    specialNote: {
      title: 'Terminology Note: شاخ (Video) vs. راس (Textbook)',
      urduSummary:
        'ویڈیو لیکچر کے مطابق بڑے جانور (گائے، بھینس، اونٹ) کے لیے "شاخ" اور چھوٹے جانور (بکرا، بکری، دنبہ) کے لیے "راس" لکھا جاتا ہے، جبکہ کتاب کے صفحہ 96 اور 98 پر "ایک راس گائے" درج ہے۔',
      englishSummary:
        'The video lecture specifies "شاخ" for large cattle (cow, buffalo, camel) and "راس" for small livestock (goat, sheep), whereas textbook pages 96 & 98 print "ایک راس گائے". Switch freely to match your examiner.',
    },
  },
  {
    id: 5,
    englishTitle: 'Land Revenue (Zar-e-Lagan) Receipt',
    urduTitle: 'زرِ لگان',
    category: 'non-sale',
    textbookPages: 'pp. 98–99',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت وصولی زرِ لگان"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=10,000/=)',
    halfAmountDigits: '(=5,000/=)',
    bodySegments: [
      { text: 'کل رقم مبلغ ', ruleId: 2 },
      { text: '(=10,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(دس ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=5,000/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(پانچ ہزار روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت', ruleId: 6 },
      {
        text: ' زرِ لگان موازی چار ایکڑ زرعی اراضی، واقع موضع رسول پور، تحصیل و ضلع شیخوپورہ، بابت فصلِ ربیع (گندم)، سال 2026ء، جو بمطابق مقررہ شرحِ لگان واجب الادا تھا، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب مسمی منیر حسین ولد امیر حسین، قوم قریشی،', ruleId: 8 },
      { text: ' ساکن موضع رسول پور، تحصیل و ضلع شیخوپورہ ', ruleId: 9 },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'نعمان احمد ولد محمد اعظم',
      lines: ['ساکن: موضع رسول پور', 'تحصیل و ضلع: شیخوپورہ'],
      cnic: 'شناختی کارڈ نمبر: 35404-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'عبداللہ ولد مشتاق احمد',
      lines: ['ساکن: ہاؤسنگ کالونی، مکان نمبر 19', 'تحصیل و ضلع: شیخوپورہ'],
      cnic: 'شناختی کارڈ نمبر: 35404-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'ضیاء الدین ولد غلام محمد',
      lines: ['ساکن: موضع رسول پور', 'تحصیل و ضلع: شیخوپورہ'],
      cnic: 'شناختی کارڈ نمبر: 35404-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 20 مئی 2026ء',
  },
  {
    id: 6,
    englishTitle: 'Educational Stipend Receipt',
    urduTitle: 'وظیفہ',
    category: 'non-sale',
    textbookPages: 'p. 99',
    headingLines: [
      'ـــــــ سوال نمبر (7) ـــــــ',
      'ـــــــ رسید نگاری ـــــــ',
      '"رسید بابت وصولی وظیفہ"',
    ],
    openingPhrase: 'باعثِ تحریر آنکہ',
    totalAmountDigits: '(=5,000/=)',
    halfAmountDigits: '(=2,500/=)',
    bodySegments: [
      { text: 'کل رقم مبلغ ', ruleId: 2 },
      { text: '(=5,000/=)', ruleId: 2, isAmountDigits: true },
      { text: ' ' },
      { text: '(پانچ ہزار روپے صرف)', ruleId: 3 },
      { text: ' نصف جن کے مبلغ ', ruleId: 4 },
      { text: '(=2,500/=)', ruleId: 4, isAmountDigits: true },
      { text: ' ' },
      { text: '(پچیس سو روپے صرف)', ruleId: 5 },
      { text: ' بنتے ہیں، ', ruleId: 5 },
      { text: 'بابت', ruleId: 6 },
      {
        text: ' ماہانہ تعلیمی وظیفہ برائے ماہِ دسمبر 2022ء، برائے طالب علم سالِ اول، رول نمبر 104، سیشن 2022ء تا 2024ء، جو کالج ہٰذا کے وظیفہ فنڈ سے منظور شدہ قواعد و ضوابط کے تحت جاری ہوا، ',
        ruleId: 7,
      },
      { text: 'ازاں جناب پرنسپل،', ruleId: 8 },
      { text: ' گورنمنٹ پوسٹ گریجویٹ گرلز کالج، جام پور، ضلع راجن پور ', ruleId: 9 },
      {
        text: 'سے نقد وصول پا کر رسید لکھ دی ہے تاکہ سند رہے اور بوقتِ ضرورت کام آئے۔',
        ruleId: 10,
      },
    ],
    rightWitness: {
      heading: 'گواہ شد',
      name: 'ریحانہ اکبر ولد محمد اکبر مزمل',
      lines: [
        'طالب علم سالِ اول',
        'گورنمنٹ پوسٹ گریجویٹ گرلز کالج، جام پور',
        'ضلع: راجن پور',
      ],
      cnic: 'شناختی کارڈ نمبر: 32402-0000000-3',
      signatureLabel: 'دستخط: ________',
    },
    scribe: {
      heading: 'العبد',
      name: 'راحیلہ روحی ولد محمد اکبر',
      lines: [
        'طالب علم سالِ اول',
        'گورنمنٹ پوسٹ گریجویٹ گرلز کالج، جام پور',
        'ضلع: راجن پور',
      ],
      cnic: 'شناختی کارڈ نمبر: 32402-0000000-1',
      signatureLabel: 'دستخط: ________',
    },
    leftWitness: {
      heading: 'گواہ شد',
      name: 'رخسانہ جمیل ولد محمد نذر',
      lines: [
        'جونیئر کلرک',
        'گورنمنٹ پوسٹ گریجویٹ گرلز کالج، جام پور',
        'ضلع: راجن پور',
      ],
      cnic: 'شناختی کارڈ نمبر: 32402-0000000-2',
      signatureLabel: 'دستخط: ________',
    },
    tahreerDate: 'تحریر: 30 نومبر 2022ء',
  },
];
