import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const DEFAULTS = {
  TITLE: 'Special Report',
  DESCRIPTION: 'Special Report',
  'BUTTON TEXT': 'Grab It Now',
  'BOOK ID': 'special_report',
};

let ctaDataCache = null;

function loadCtaData() {
  if (ctaDataCache) return ctaDataCache;
  const csvPath = path.resolve('./CTA_Data - Sheet1.csv');
  const csv = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  });
  // Index by PAGE and LOCATION for fast lookup
  const ctaMap = {};
  for (const row of records) {
    const page = row.PAGE || 'home';
    const location = row.LOCATION;
    if (!ctaMap[page]) ctaMap[page] = {};
    ctaMap[page][location] = row;
  }
  console.log('DEBUG: CTA Map:', JSON.stringify(ctaMap, null, 2));
  ctaDataCache = { ctaMap };
  return ctaDataCache;
}

function getCta({ page, location }) {
  const { ctaMap } = loadCtaData();
  // Fallback to 'home' if page not found
  const pageKey = ctaMap[page] ? page : 'home';
  const row = (ctaMap[pageKey] && ctaMap[pageKey][location]) || {};
  console.log(`DEBUG: getCta lookup for page="${page}" location="${location}". pageKey="${pageKey}". Row:`, row);
  // Apply defaults for any missing/blank fields
  const result = {};
  for (const key of Object.keys(DEFAULTS)) {
    result[key] = row[key] && row[key].trim() !== '' ? row[key] : DEFAULTS[key];
  }
  return result;
}

export { getCta as g };
