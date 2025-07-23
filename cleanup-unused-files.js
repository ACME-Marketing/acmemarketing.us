#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Files that are definitely used in the app
const definitelyUsed = new Set([
  'package.json',
  'package-lock.json',
  'astro.config.mjs',
  'tailwind.config.js',
  'postcss.config.js',
  
  'README.md',
  '.gitignore',
  'src/env.d.ts',
  'src/layouts/BaseLayout.astro',
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/services.astro',
  'src/pages/privacy.astro',
  'src/pages/posts/index.astro',
  'src/pages/posts/[...slug].astro',
  'src/components/Hero.astro',
  'src/components/HomepagePosts.astro',
  'src/components/MotionReveal.tsx',
  'src/lib/graphql.js',
  'src/lib/loadCtaData.js',
  'public/global.css',
  'public/hero-background.svg',
  'public/ai-automation.svg',
  'public/workflow-automation.svg',
  'public/acmemarketing logo1.jpg'
]);

// Files that are definitely NOT used in the app
const definitelyUnused = new Set([
  'allfiles.txt',
  'GEMINI_PLAN.md',
  'CTA_Data - Sheet1.csv',
  'wordpress_webhook_snippet_final.php',
  
  'backup_outer_project/',
  'tempstor/'
]);

// Load keeper list
function loadKeeperList() {
  const keeperPath = path.join(projectRoot, 'tempstor-keeper.txt');
  if (fs.existsSync(keeperPath)) {
    try {
      const content = fs.readFileSync(keeperPath, 'utf8');
      return new Set(content.split('\n').filter(line => line.trim() !== ''));
    } catch (error) {
      console.log('⚠️  Could not read keeper list, starting fresh');
      return new Set();
    }
  }
  return new Set();
}

// Save keeper list
function saveKeeperList(keeperList) {
  const keeperPath = path.join(projectRoot, 'tempstor-keeper.txt');
  try {
    const content = Array.from(keeperList).join('\n');
    fs.writeFileSync(keeperPath, content + '\n');
  } catch (error) {
    console.log(`❌ Failed to save keeper list: ${error.message}`);
  }
}

// Add file to keeper list
function addToKeeperList(filePath, keeperList) {
  const relativePath = path.relative(projectRoot, filePath);
  keeperList.add(relativePath);
  saveKeeperList(keeperList);
  console.log(`✅ Added to keeper list: ${relativePath}`);
}

// Check if a file is referenced in code
function isReferencedInCode(filePath, projectRoot) {
  const relativePath = path.relative(projectRoot, filePath);
  const fileName = path.basename(filePath);
  const fileExt = path.extname(filePath);
  
  // Skip certain file types that are typically not referenced
  if (['.md', '.txt', '.csv', '.json', '.php'].includes(fileExt)) {
    return false;
  }
  
  // Check for references in common file types
  const searchExtensions = ['.js', '.ts', '.jsx', '.tsx', '.astro', '.css', '.html'];
  const searchPatterns = [
    fileName,
    relativePath,
    path.basename(filePath, fileExt),
    `/${fileName}`,
    `./${fileName}`,
    `../${fileName}`
  ];
  
  for (const ext of searchExtensions) {
    const files = getAllFiles(path.join(projectRoot, 'src'), ext);
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of searchPatterns) {
          if (content.includes(pattern)) {
            return true;
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
  
  return false;
}

// Get all files with specific extension
function getAllFiles(dir, ext) {
  const files = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, ext));
      } else if (item.endsWith(ext)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }
  return files;
}

// Check if font files are actually used in CSS
function isFontUsedInCSS(fontPath) {
  const fontName = path.basename(fontPath, path.extname(fontPath));
  const cssFiles = getAllFiles(path.join(projectRoot, 'src'), '.css');
  cssFiles.push(path.join(projectRoot, 'public/global.css'));
  
  for (const cssFile of cssFiles) {
    try {
      const content = fs.readFileSync(cssFile, 'utf8');
      if (content.includes(fontName) || content.includes(path.basename(fontPath))) {
        return true;
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  // Also check Astro files for font references
  const astroFiles = getAllFiles(path.join(projectRoot, 'src'), '.astro');
  for (const astroFile of astroFiles) {
    try {
      const content = fs.readFileSync(astroFile, 'utf8');
      if (content.includes(fontName) || content.includes(path.basename(fontPath))) {
        return true;
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  return false;
}

// Create tempstor directory if it doesn't exist
function ensureTempstorExists() {
  const tempstorPath = path.join(projectRoot, 'tempstor');
  if (!fs.existsSync(tempstorPath)) {
    fs.mkdirSync(tempstorPath, { recursive: true });
  }
  return tempstorPath;
}

// Move file to tempstor
function moveToTempstor(filePath) {
  const tempstorPath = ensureTempstorExists();
  const fileName = path.basename(filePath);
  const destPath = path.join(tempstorPath, fileName);
  
  try {
    fs.renameSync(filePath, destPath);
    return true;
  } catch (error) {
    console.log(`❌ Failed to move ${filePath}: ${error.message}`);
    return false;
  }
}

// Ask user what to do with a file
function askUserAction(filePath, reason, keeperList) {
  return new Promise((resolve) => {
    console.log(`\n📁 File: ${filePath}`);
    console.log(`📝 Reason: ${reason}`);
    console.log(`📏 Size: ${fs.statSync(filePath).size} bytes`);
    
    rl.question('What would you like to do? (d=delete, m=move to tempstor, k=add to keeper list, s=skip, q=quit): ', (answer) => {
      const action = answer.toLowerCase().trim();
      resolve(action);
    });
  });
}

// Main analysis function
async function analyzeFiles() {
  console.log('🔍 Analyzing files for actual usage in the application...\n');
  
  // Load keeper list
  const keeperList = loadKeeperList();
  console.log(`📋 Loaded keeper list with ${keeperList.size} entries\n`);
  
  const allFiles = [];
  const unusedFiles = [];
  const usedFiles = [];
  const questionableFiles = [];
  
  function scanDirectory(dir, relativePath = '') {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativeFilePath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip certain directories
          if (['node_modules', '.git', '.astro', 'dist', 'tempstor'].includes(item)) {
            continue;
          }
          scanDirectory(fullPath, relativeFilePath);
        } else {
          allFiles.push(relativeFilePath);
          
          // Check if in keeper list
          if (keeperList.has(relativeFilePath)) {
            usedFiles.push(relativeFilePath);
            continue;
          }
          
          // Check if definitely used
          if (definitelyUsed.has(relativeFilePath)) {
            usedFiles.push(relativeFilePath);
            continue;
          }
          
          // Check if definitely unused
          if (definitelyUnused.has(relativeFilePath)) {
            unusedFiles.push(relativeFilePath);
            continue;
          }
          
          // Special handling for font files
          if (relativeFilePath.includes('/fonts/') || relativeFilePath.endsWith('.otf') || relativeFilePath.endsWith('.ttf')) {
            if (isFontUsedInCSS(fullPath)) {
              usedFiles.push(relativeFilePath);
            } else {
              unusedFiles.push(relativeFilePath);
            }
            continue;
          }
          
          // Check if referenced in code
          if (isReferencedInCode(fullPath, projectRoot)) {
            usedFiles.push(relativeFilePath);
          } else {
            // For questionable files, check if they're in public directory (assets)
            if (relativeFilePath.startsWith('public/')) {
              questionableFiles.push(relativeFilePath);
            } else {
              unusedFiles.push(relativeFilePath);
            }
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not scan directory: ${dir}`);
    }
  }
  
  scanDirectory(projectRoot);
  
  // Results summary
  console.log(`📊 Analysis Results:\n`);
  console.log(`Total files found: ${allFiles.length}`);
  console.log(`✅ Used files: ${usedFiles.length}`);
  console.log(`❌ Unused files: ${unusedFiles.length}`);
  console.log(`❓ Questionable files: ${questionableFiles.length}\n`);
  
  // Process unused files
  if (unusedFiles.length > 0) {
    console.log('❌ UNUSED FILES - Let\'s decide what to do with each:\n');
    
    for (const file of unusedFiles) {
      const fullPath = path.join(projectRoot, file);
      const reason = definitelyUnused.has(file) ? 'Definitely unused (in predefined list)' : 'Not referenced in code';
      
      const action = await askUserAction(fullPath, reason, keeperList);
      
      switch (action) {
        case 'd':
          try {
            fs.unlinkSync(fullPath);
            console.log(`✅ Deleted: ${file}`);
          } catch (error) {
            console.log(`❌ Failed to delete ${file}: ${error.message}`);
          }
          break;
        case 'm':
          if (moveToTempstor(fullPath)) {
            console.log(`✅ Moved to tempstor: ${file}`);
          }
          break;
        case 'k':
          addToKeeperList(fullPath, keeperList);
          break;
        case 's':
          console.log(`⏭️  Skipped: ${file}`);
          break;
        case 'q':
          console.log('\n👋 Exiting...');
          rl.close();
          return;
        default:
          console.log(`⏭️  Skipped: ${file} (invalid input)`);
      }
    }
  }
  
  // Process questionable files
  if (questionableFiles.length > 0) {
    console.log('\n❓ QUESTIONABLE FILES - These are in public directory but not referenced:\n');
    
    for (const file of questionableFiles) {
      const fullPath = path.join(projectRoot, file);
      const reason = 'In public directory but not referenced in code';
      
      const action = await askUserAction(fullPath, reason, keeperList);
      
      switch (action) {
        case 'd':
          try {
            fs.unlinkSync(fullPath);
            console.log(`✅ Deleted: ${file}`);
          } catch (error) {
            console.log(`❌ Failed to delete ${file}: ${error.message}`);
          }
          break;
        case 'm':
          if (moveToTempstor(fullPath)) {
            console.log(`✅ Moved to tempstor: ${file}`);
          }
          break;
        case 'k':
          addToKeeperList(fullPath, keeperList);
          break;
        case 's':
          console.log(`⏭️  Skipped: ${file}`);
          break;
        case 'q':
          console.log('\n👋 Exiting...');
          rl.close();
          return;
        default:
          console.log(`⏭️  Skipped: ${file} (invalid input)`);
      }
    }
  }
  
  console.log('\n✅ Cleanup complete!');
  rl.close();
}

// Run the analysis
analyzeFiles().catch(console.error); 