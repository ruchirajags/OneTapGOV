from supabase import create_client
import os

def _get_env(*names):
    for name in names:
        value = os.getenv(name)
        if value:
            return value
    return None

url = _get_env("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL")
key = _get_env("SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_KEY")

if not url or not key:
    raise RuntimeError(
        "Missing Supabase environment variables. Set SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env."
    )

supabase = create_client(url, key)


def update_table(table_name, user_id, data):

    return (
        supabase
        .table(table_name)
        .update(data)
        .eq("user_id", user_id)
        .execute()
    )