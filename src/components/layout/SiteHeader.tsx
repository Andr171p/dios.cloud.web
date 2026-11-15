import Link from 'next/link';

import {Container} from '@/components/ui/Container';

const navigation = [
  { label: "Продукты", href: "/#products" },
  { label: "Платформа", href: "/#platform" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-white/10">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-[-0.06em]"
            aria-label="DIOS — главная"
          >
            DIOS<span className="text-[#bb252d]">.</span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-9 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href='/admin'
            className='rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10'
          >
            Войти
          </Link>
        </div>
      </Container>
    </header>
  );
}
