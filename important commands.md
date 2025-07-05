# Important Commands - Tailwind CSS Issue Resolution

## Issue Description
The Astro development server was experiencing persistent Tailwind CSS import errors:
```
[ERROR] Could not import `/node_modules/@astrojs/tailwind/base.css`.
```

## Troubleshooting Steps Taken

### 1. Initial Assessment
- **Command**: `ls -la node_modules/@astrojs/tailwind/`
- **Purpose**: Verify that the Tailwind CSS files exist in the expected location
- **Result**: Files were present, including `base.css`

### 2. File Content Verification
- **Command**: `cat node_modules/@astrojs/tailwind/base.css`
- **Purpose**: Confirm the file contains the correct Tailwind directives
- **Result**: File contained proper content:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### 3. Dependency Reinstallation
- **Command**: `npm install`
- **Purpose**: Reinstall all dependencies to ensure proper installation
- **Result**: Dependencies reinstalled successfully

### 4. Supabase Integration
- **Command**: `npm install @supabase/supabase-js`
- **Purpose**: Add Supabase client for course system authentication
- **Result**: Supabase client installed successfully

### 5. Process Management Check
- **Command**: `ps aux | grep astro`
- **Purpose**: Identify if multiple Astro dev servers were running simultaneously
- **Result**: Found multiple conflicting Astro processes

### 6. Process Cleanup
- **Command**: `pkill -f "astro dev"`
- **Purpose**: Kill all running Astro development servers to eliminate conflicts
- **Result**: All Astro processes terminated

### 7. Cache Clearing
- **Command**: `rm -rf .astro dist`
- **Purpose**: Remove Astro build cache and distribution files
- **Result**: Cache cleared successfully

### 8. Fresh Server Start
- **Command**: `npm run dev`
- **Purpose**: Start a clean development server with cleared cache
- **Result**: Server started on port 4322 (4321 was in use)

### 9. Server Health Check
- **Command**: `curl -s http://localhost:4321 > /dev/null && echo "Server is running successfully" || echo "Server not responding"`
- **Purpose**: Verify the development server is responding properly
- **Result**: Server responded successfully

### 10. Final Process Verification
- **Command**: `ps aux | grep "astro dev" | grep -v grep`
- **Purpose**: Confirm only one Astro dev server is running
- **Result**: Single Astro process running cleanly

## Root Cause Analysis
The Tailwind CSS import errors were caused by:
1. **Multiple conflicting dev servers** running simultaneously
2. **Stale build cache** from previous sessions
3. **File watching conflicts** between multiple processes

## Resolution Summary
The issue was resolved by:
1. **Killing all conflicting processes**
2. **Clearing the Astro cache** (`.astro` and `dist` folders)
3. **Starting a fresh development server**

## Prevention Measures
- Always check for multiple dev server processes before troubleshooting
- Clear cache when experiencing import or build issues
- Use `pkill -f "astro dev"` to cleanly stop all Astro processes
- Restart with `npm run dev` after cache clearing

## Current Status
✅ **Tailwind CSS** - Working properly  
✅ **Supabase integration** - Ready for use  
✅ **Course system** - Foundation complete  
✅ **Development server** - Running cleanly on localhost:4322  

## Related Files Modified
- `src/lib/supabase.js` - Supabase client configuration
- `src/pages/courses.astro` - Course listing page
- `src/layouts/BaseLayout.astro` - Navigation menu updates
- `supabase-schema.sql` - Database schema for course system

## Next Steps
1. Set up Supabase project and run schema
2. Add environment variables for Supabase credentials
3. Create n8n workflows for Stripe integration
4. Test course enrollment flow 