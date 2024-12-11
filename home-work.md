## Vazifa: REST Xizmat

## Ta'rif

Keling, Uy Kutubxonasi Xizmatini yaratishga harakat qilamiz! `Users` `Artists`, `Tracks` va `Albums` haqidagi ma'lumotlarni yaratishi, o'qishi, yangilashi, o'chirishi va ularni o'z Uy Kutubxonalariga `Sevimlilar`ga qo'shishi mumkin!

**Ilova yarating, ilova quyidagi resurslar bilan ishlashi kerak:**

- `User` (xususiyatlar bilan):

  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Artist` (xususiyatlar bilan):

  ```typescript
  interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
  }
  ```

- `Favorites` (xususiyatlar bilan):

  ```typescript
  interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
  }
  ```

**Tafsilotlar:**

1. `Users`, `Artists`, `Albums`, `Tracks` va `Favorites` uchun REST endpointlarini alohida router yo'llari bilan yaratish kerak

- `Users` (`/user` yo'lida)

  - `GET /user` - barcha foydalanuvchilarni olish
    - Server `status code` **200** va barcha foydalanuvchilar yozuvlari bilan javob berishi kerak
  - `GET /user/:id` - id bo'yicha bitta foydalanuvchini olish
    - Server `status code` **200** va `id === userId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /user` - foydalanuvchi yaratish (quyidagi DTO dan foydalaniladi)
    `CreateUserDto`

    ```typescript
    interface CreateUserDto {
      login: string;
      password: string;
    }
    ```

    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa

  - `PUT /user/:id` - foydalanuvchi parolini yangilash
    `UpdatePasswordDto` (xususiyatlar bilan):

    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string; // oldingi parol
      newPassword: string; // yangi parol
    }
    ```

    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa
    - Server `status code` **403** va mos xabar bilan javob berishi kerak agar `oldPassword` noto'g'ri bo'lsa

  - `DELETE /user/:id` - foydalanuvchini o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `userId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === userId` bo'lgan yozuv mavjud bo'lmasa

- `Tracks` (`/track` yo'lida)

  - `GET /track` - barcha Tracksni olish
    - Server `status code` **200** va barcha trek yozuvlari bilan javob berishi kerak
  - `GET /track/:id` - id bo'yicha bitta trekni olish
    - Server `status code` **200** va `id === trackId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /track` - yangi trek yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /track/:id` - trek ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa
  - `DELETE /track/:id` - trekni o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan yozuv mavjud bo'lmasa

- `Artists` (`/artist` yo'lida)
  - `GET /artist` - barcha Artistsni olish
    - Server `status code` **200** va barcha artists yozuvlari bilan javob berishi kerak
  - `GET /artist/:id` - id bo'yicha bitta artistsni olish
    - Server `status code` **200** va `id === artistId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /artist` - yangi artists yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /artist/:id` - artists ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code

`**400** va mos xabar bilan javob berishi kerak agar`artist`noto'g'ri (uuid emas) bo'lsa
      - Server`status code`**404** va mos xabar bilan javob berishi kerak agar`id === artistId`bo'lgan yozuv mavjud bo'lmasa
    *`DELETE /artist/:id`- artistsni o'chirish
      - Server`status code`**204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
      - Server`status code`**400** va mos xabar bilan javob berishi kerak agar`artistId`noto'g'ri (uuid emas) bo'lsa
      - Server`status code`**404** va mos xabar bilan javob berishi kerak agar`id === artistId` bo'lgan yozuv mavjud bo'lmasa

- `Albums` (`/album` yo'lida)

  - `GET /album` - barcha albomlarni olish
    - Server `status code` **200** va barcha albom yozuvlari bilan javob berishi kerak
  - `GET /album/:id` - id bo'yicha bitta albomni olish
    - Server `status code` **200** va `id === albumId` bo'lgan yozuv bilan javob berishi kerak agar mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa
  - `POST /album` - yangi albom yaratish
    - Server `status code` **201** va yangi yaratilgan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar so'rov `body` si kerakli maydonlarni o'z ichiga olmasa
  - `PUT /album/:id` - albom ma'lumotlarini yangilash
    - Server `status code` **200** va yangilangan yozuv bilan javob berishi kerak agar so'rov to'g'ri bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa
  - `DELETE /album/:id` - albomni o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar yozuv topilgan va o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan yozuv mavjud bo'lmasa

- `Favorites`

  - `GET /favs` - barcha sevimlilarni olish

    - Server `status code` **200** va barcha sevimli yozuvlar (**ularning id lari emas**) bilan javob berishi kerak, entity turi bo'yicha ajratilgan holda:

    ```typescript
    interface FavoritesResponse {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```

  - `POST /favs/track/:id` - trekni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan trek mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === trackId` bo'lgan trek mavjud bo'lmasa
  - `DELETE /favs/track/:id` - trekni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar trek sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `trackId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos trek sevimli bo'lmasa
  - `POST /favs/album/:id` - albomni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan albom mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === albumId` bo'lgan albom mavjud bo'lmasa
  - `DELETE /favs/album/:id` - albomni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar albom sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `albumId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos albom sevimli bo'lmasa
  - `POST /favs/artist/:id` - artistsni sevimlilarga qo'shish
    - Server `status code` **201** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan artists mavjud bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **422** va mos xabar bilan javob berishi kerak agar `id === artistId` bo'lgan artists mavjud bo'lmasa
  - `DELETE /favs/artist/:id` - artistsni sevimlilardan o'chirish
    - Server `status code` **204** bilan javob berishi kerak agar artists sevimlilar ro'yxatida bo'lgan va endi o'chirilgan bo'lsa
    - Server `status code` **400** va mos xabar bilan javob berishi kerak agar `artistId` noto'g'ri (uuid emas) bo'lsa
    - Server `status code` **404** va mos xabar bilan javob berishi kerak agar mos artists sevimli bo'lmasa

2. Hozircha, bu endpointlar faqat **memory** (_hardcoded_) ma'lumotlari bilan ishlashi kerak, keyingi vazifalarda biz DB dan foydalanamiz. Ma'lumot manbai yaqin orada o'zgarishini hisobga olgan holda modullarni tashkil qilishingiz kerak.

3. So'rov va javob tanasi uchun `application/json` formatidan foydalanish kerak.

4. Hammasini bitta faylga joylashtirmang - dastur yaratish (bootstrapping), controllerlar (routerlar) va biznes logikasiga tegishli kod uchun alohida fayldan foydalaning. Shuningdek, fayllarni domen (foydalanuvchi bilan bog'liq, artists bilan bog'liq va hokazo) bo'yicha turli modullarga ajrating.

5. Server javobidan `Foydalanuvchi`ning paroli chiqarib tashlanishi kerak.

6. `artists`, `Albom` yoki `Trek` ni o'chirganingizda, ularning `id` si sevimlilardan (agar u yerda bo'lsa) o'chirilishi kerak va boshqa entity lardagi havolalar `null` ga aylanadi. Masalan: `artists` o'chiriladi => bu `artistId` mos `Albom`lar va `Trek`larda `null`ga aylanadi + bu artistsning `id` si sevimlilardan o'chiriladi, xuddi shu mantiq `Albom` va `Trek` uchun ham amal qiladi.

7. Mavjud bo'lmagan entity `Sevimlilar`ga qo'shilmasligi kerak.

8. Xizmatni ishga tushirish uchun `npm start` buyrug'idan foydalanish kerak.

9. Xizmat `4000` portda tinglashi kerak, PORT qiymati `.env` faylida saqlanadi.

10. Kelayotgan so'rovlar tekshirilishi kerak.
