import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Изделие',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      description: 'Например: Картхолдер "Классика" из итальянской кожи',
    }),
    defineField({
      name: 'slug',
      title: 'Ссылка (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Аксессуары', value: 'accessories' },
          { title: 'Ремни', value: 'belts' },
          { title: 'Кошельки', value: 'wallets' },
          { title: 'Сумки', value: 'bags' },
          { title: 'Обложки', value: 'covers' },
        ],
      },
    }),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'string',
      description: 'Например: 2 900 ₽',
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'mainImage',
      title: 'Главное фото',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'ozonLink',
      title: 'Ссылка на Ozon',
      type: 'url',
    }),
    defineField({
      name: 'ymLink',
      title: 'Ссылка на Яндекс Маркет',
      type: 'url',
    }),
    defineField({
      name: 'wbLink',
      title: 'Ссылка на Wildberries',
      type: 'url',
    }),
    defineField({
      name: 'contactTelegram',
      title: 'Telegram (username или ссылка)',
      type: 'string',
      description: 'Например: @username или https://t.me/username',
    }),
    defineField({
      name: 'contactWhatsapp',
      title: 'WhatsApp (номер или ссылка)',
      type: 'string',
      description: 'Например: +79001234567 или https://wa.me/79001234567',
    }),
    defineField({
      name: 'contactMax',
      title: 'Другой мессенджер (Макс)',
      type: 'string',
      description: 'Ссылка или username для связи',
    }),
    defineField({
      name: 'isAvailable',
      title: 'В наличии?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})