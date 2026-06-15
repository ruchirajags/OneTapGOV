# OneTapGOV

**Quickstart (Windows)**

- **Prerequisites**:
  - Python 3.10+ installed and on PATH
  - Node.js 16+ installed and on PATH
  - `pnpm` (optional, recommended if you want to respect the lockfile). Install with `npm i -g pnpm` if needed.

**Backend**

- **Files:** See [backend/requirements.txt](backend/requirements.txt#L1)
- Recommended Python workflow (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

- If `pip install -r backend/requirements.txt` errors because the file encoding is Unicode/UTF-16 (null bytes shown), convert to UTF-8 first:

```powershell
Get-Content -Path backend/requirements.txt -Encoding Unicode | Set-Content -Path backend/requirements.utf8.txt -Encoding utf8
pip install -r backend/requirements.utf8.txt
```

- Environment variables: create `backend/.env` with at least the following keys used by the app:
  - `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `SUPABASE_KEY`)
  - `GEMINI_API_KEY`

- Run the backend (from `backend/`):

```powershell
# if uvicorn is installed
uvicorn main:app --reload --port 8000

# or
python -m uvicorn main:app --reload --port 8000
```

**Frontend**

- **Files:** See [frontend/package.json](frontend/package.json#L1-L20)
- Install and run (from `frontend/`):

```bash
cd frontend
pnpm install   # preferred if pnpm installed
pnpm dev

# or with npm
npm install
npm run dev
```

The frontend uses Next.js and `@supabase/supabase-js` to communicate with the backend/Supabase.

**Common commands**

- Start backend: `uvicorn main:app --reload --port 8000` (run in `backend/`)
- Start frontend: `pnpm dev` or `npm run dev` (run in `frontend/`)

**Troubleshooting (Windows-specific)**

- If `backend/requirements.txt` appears to contain null bytes or an unexpected encoding, convert it as shown above.
- If a package fails to build (native wheels), install the Visual C++ build tools or use prebuilt wheels where possible.
- If `pnpm install` fails, ensure Node version is >=16 and try `npm install` as a fallback.

**Environment variables (summary)**

- `SUPABASE_URL`, `SUPABASE_ANON_KEY` (or public variants), `SUPABASE_KEY`
- `GEMINI_API_KEY` (Google GenAI key used by `GeminiService`)

**Notes**

- The backend uses FastAPI + Pydantic and connects to Supabase via `supabase` Python client.
- The frontend is a Next.js app (React 19+).

---
If you'd like, I can:
- run the installs here in your workspace,
- convert `backend/requirements.txt` to UTF-8 and install packages,
- or create a small `dev` script to run backend+frontend concurrently.
