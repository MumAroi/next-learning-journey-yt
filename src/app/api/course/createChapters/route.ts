import { getAuthSession } from '@/lib/auth';
import { createChaptersSchema } from '@/validators/course';
import { NextResponse } from 'next/server'
import { ZodError } from 'zod';

export async function POST(req: Request, res: Response){
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }

    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];
    
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
  return NextResponse.json({hello:"world"})
}