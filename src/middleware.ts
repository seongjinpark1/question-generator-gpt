import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl, url } = request;
  const isValidTime = () => {
    const today = dayjs();
    const studyDate = dayjs('2024-05-03T08:50:00'); // 해당 날짜라 시간만 수정!
    const isWithinRange =
      today.isAfter(studyDate) &&
      today.isBefore(studyDate.add(1, 'hour').add(30, 'minute'));
    return isWithinRange;
  };

  if (!isValidTime() && nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|sitemap.json|sitemap.xml|manifest.json|icons|videos|fonts|images|favicon.ico).*)',
  ],
};
