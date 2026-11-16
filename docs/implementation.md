# Реализация главной страницы

Документ фиксирует текущее состояние по `docs/plan.md`, `docs/design.md` и `docs/features/product-carousel.md`.

## Порядок секций

1. Hero — центрированный: eyebrow, заголовок, подзаголовок, 2 CTA, demo frame  
2. Logo Marquee — партнёры и заказчики (CSS infinite track)  
3. Focused Product Carousel — заголовок по центру, карточки по Embla  
4. Platform Capabilities — слева, 4 колонки без card-контейнеров  
5. Connected Ecosystem — слева  
6. Articles & Insights — editorial rail  
7. Final CTA — по центру  

## Hero

Композиция в духе Atlassian (принцип, не копия):

- центрированный текст + primary/secondary CTA (`HeroActions`)
- тонкая CSS-сетка + мягкий cursor ripple (`HeroBackground` / `InteractiveGrid`)
- demo stage сразу под CTA (`HeroDemo`) с product-frame
- theme-aware видео/постеры через `ThemeVideo` / `ThemeImage`
- fallback демо из `product-registry` (`dio-desk` dark/light), если CMS-медиа пустые

CMS-поля `Homepage.hero`: текст, CTA, флаги `demoEnabled` / `gridEnabled` / `interactiveBackgroundEnabled`, uploads `demo{Dark,Light}{Image,Video}`.

Поведение (эффект, тема, адаптив) — в коде; контент — в CMS.

## Карусель

- Одинаковая ширина слайдов, вес через `transform: scale` + opacity
- Активный / соседний / дальний режимы (`carousel.css`)
- Клик по соседней карточке переключает выбранный продукт (не hover)
- Стрелки вынесены за ряд на desktop
- Клавиатура только при фокусе на viewport
- Wheel/trackpad: `embla-carousel-wheel-gestures` с `forceWheelAxis: "x"`
- 1 продукт — без карусели; 2+ — center + `startIndex` ближе к середине
- Демо продукта также внутри активной карточки (`ProductDemo`)

## CMS

| Сущность | Назначение |
|----------|------------|
| `Products` | Продуктовая витрина |
| `Articles` | Материалы: engineering / guide / update / case-study + `cardTheme` |
| `Organizations` | Публичные партнёры/заказчики для Logo Marquee (не IAM) |
| `Homepage` | Hero (в т.ч. theme-aware demo) + слоты секций + featured |
| `Media` | Обложки, poster, video; `seedKey` для seed |

`cardTheme` — editorial palette (`red|blue|forest|iris|petrol|orange`), HEX только в коде.

ProductCarousel: center + distance scale/opacity + `mask-image` edge fade (off on mobile).  
ArticleRail: start-aligned Embla, peeks next card, staggered reveal via Motion.

## Brand

- Типографика: **Wix Madefor Display** для заголовков, **Onest** для текста
- Hero motion: `public/demos/motion-{dark,light}.mp4` (`heroMotionDemo`)
- Карусель: скрины (image/video через `ProductDemo`); motion-демо продуктов — позже
- Логотип: `public/brand/dios-mark.png` (прозрачный) + `DiosMark`
- Иконки платформы: `src/assets/icons/PlatformIcons.tsx` (не generic icon pack)

## Seed

```bash
pnpm seed:assets
pnpm seed
```

Идемпотентно: media по `seedKey`, products/articles по `slug`, homepage дозаполняет новые секции и обновляет centered hero без удаления существующих документов.

## Запуск

```bash
docker compose up -d postgres rustfs
pnpm install
pnpm seed:assets
pnpm seed
pnpm dev
```

## Дальше

- TT Firs Neue вместо Madefor Display, когда появятся лицензионные файлы
- Отдельные CMS-загруженные light/dark hero-ролики (сейчас fallback из registry)
- Полный rich-text рендер статей
- Тесты после стабилизации контента
