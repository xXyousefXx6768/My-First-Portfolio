import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
  const cookieStore = cookies(); 

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet = []) {
        try {
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: { name: string; value: string; options?: CookieOptions }) =>
              cookieStore.set(name, value, options || {})
          );
        } catch {
          // ممكن تتجاهلها لو الكود ده شغال في Server Component
        }
      },
    },
  });
};
