# Архитектура и правила разработки

## Архитектурные правила

| Правило                                    | Обоснование                        |
|--------------------------------------------|------------------------------------|
| Server Components by default               | Минимизация клиентского JavaScript |
| use client только при необходимости        | Явная граница браузера и сервера   |
| CMS-запросы только на сервере              | Безопасность данных и секретов     |
| Queries вне route components               | Простая тестируемость              |
| Данные CMS типизированы                    | Меньше ошибок при изменении схем   |
| Не дублировать коллекции в интерфейсах     | Payload генерирует типы            |
| Презентационные компоненты без DB-запросов | Разделение ответственности         |
| Не создавать generic abstractions заранее  | Меньше сложности                   |


## TypeScript и React

### 1. Предпочитать функции и явные типы

```typescript
type ProductCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ProductCard({
  title,
  description,
  href,
}: ProductCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={href}>Подробнее</a>
    </article>
  );
}
```

Не нужно использовать React.FC повсеместно. Обычные типизированные функции читаются проще.

### 2. Избегать any и необоснованных type assertions

```typescript
// Плохо
function parseProduct(data: any) {
  return data.name;
}

// Лучше
function parseProduct(data: unknown) {
  return productSchema.parse(data);
}
```

При работе с данными, уже проверенными Payload, повторная Zod-валидация на каждом шаге обычно не нужна. Zod имеет смысл на настоящих границах доверия: webhooks, внешние API, environment configuration, пользовательский ввод.

### 3. Не использовать `useEffect` для серверного контента

```typescript
// Не нужно для обычной продуктовой страницы
useEffect(() => {
  fetch("/api/products");
}, []);
```

Если данные нужны для первоначального отображения, лучше загружать их в Server Component.

### 4. Не делать всё клиентским приложением

`"use client"` на уровне layout.tsx без необходимости приведёт к лишней гидратации больших частей интерфейса.

## Правила для CMS

 - Каждый блок имеет понятную схему и предсказуемую React-реализацию.
 - Поля содержат валидацию и разумные ограничения длины.
 - Публичное чтение не возвращает черновики.
 - Поля ссылок и CTA ограничены доверенными действиями или валидируемыми URL.
 - Медиа имеют alt text, размеры и правила обработки.
 - Удаление опубликованного продукта или страницы — управляемая операция.
 - Контентные изменения не требуют Git-коммита, изменения схемы требуют.

## Тестирование

Не нужно на старте строить большой объём тестовой инфраструктуры,
но основные сценарии следует автоматизировать

| Уровень     | Инструмент          | Что тестируем                                |
|-------------|---------------------|----------------------------------------------|
| Unit        | Vitest              | Mappers, SEO, URL validation, компоненты     |
| Integration | Vitest + PostgreSQL | Payload collections, hooks, access rules     |
| E2E         | Playwright          | Навигация, CMS preview, публикация, переходы |
| Performance | Lighthouse CI       | Web Vitals, JS bundle, основные страницы     |

Предполагаемая структура:

```plain
tests/
├── unit/
│   ├── features/
│   └── components/
│
├── integration/
│   ├── cms/
│   │   ├── products.test.ts
│   │   ├── drafts.test.ts
│   │   └── permissions.test.ts
│   └── publishing.test.ts
│
├── e2e/
│   ├── homepage.spec.ts
│   ├── products.spec.ts
│   ├── navigation.spec.ts
│   └── cms-preview.spec.ts
│
└── fixtures/
```

## CI/CD и деплой

### Действия при изменении коллекции

1. Изменить Payload schema.
2. Сгенерировать TypeScript types и миграцию.
3. Проверить SQL миграции.
4. Добавить её в Pull Request.
5. CI запускает integration-тесты на чистой PostgreSQL.
6. Перед production deploy выполняется отдельный migration job.
