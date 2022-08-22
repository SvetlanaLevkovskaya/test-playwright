// @ts-check
const { test, expect } = require('@playwright/test');


test('first test', async ({ page }) => {
  //Перейти на страницу
  await page.goto('http://89.189.152.235:1337/?path=/story/eos-tabs--default')
  const frame = page.frameLocator('#storybook-preview-iframe')

  //Перейти на "Вкладка 7"
  const el1 = frame.locator('.eos-badge-wrapper').last()
  const el2 = el1.locator('span')
  await el2.locator('span').click()

  //Проверить наличие "Текст 7"

  // 1 вариант
  //const text1 = frame.locator('.eos-tabs-content >> div >> div')
  //const text2 = text1.innerText()
  //await expect(text2).toContain('Текст 7');

  // 2 вариант
  //await expect(frame.locator('.eos-tabs-content >> div >> div >> nth=1')).toHaveText('Текст 7')

  // 3 вариант
  //const text1 = frame.locator('.eos-tabs-content >> div:nth-child(6)')
  //const text2 = text1.innerText('div')
  //expect(text1).toBe('Текст 7')

  // 4 вариант
  await expect(frame.locator('text=Текст 7')).toHaveText('Текст 7')
    
});

test('second test', async ({ page }) => {
  //Перейти на страницу
  await page.goto('http://89.189.152.235:1337/?path=/story/eos-timepicker--in-form')
  const frame = page.frameLocator('#storybook-preview-iframe')

  // Раскрыть список
  await frame.locator('svg').click()

  // Нажать кнопку "Сейчас"
  await frame.locator('text=Сейчас').click()

  // Нажать кнопку "Submit"
  await frame.locator('button:has-text("Submit")').click()

  // Отобразилось сообщение с текущим временем
  const date = 'Значение поля: ' + new Date().toString().split(" ", 6).join(' ')
  await expect(frame.locator('.eos-message__content')).toHaveText(date)

  // Поле class="eos-picker-input" содержит текущее время
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const minutes = (minute < 10) ? '0' + minute : minute
  const hours = (hour < 10) ? '0' + hour : hour
  const time = hours + ':' + minutes
  await expect(frame.locator('.eos-picker-input > input')).toHaveValue(time)

});

test('third test', async ({ page }) => {
  //Перейти на страницу
  await page.goto('http://89.189.152.235:1337/?path=/story/eos-twincolumn--default')
  const frame = page.frameLocator('#storybook-preview-iframe')
  
  //Нажать на элемент "{4} Заголовок" ==>  "{4} Заголовок" содержит "eos-checkbox-wrapper-checked"
  await frame.locator('text={4} Заголовок').click()
  await expect(frame.locator('.eos-checkbox-wrapper-checked')).toHaveCount(1)

  //Нажать кнопку "class="anticon anticon-right"
  await frame.locator('.anticon-right').click()

  //Элемент "{4} Заголовок" перенесен в "ИТОГОВЫЙ СПИСОК"
  const el1 = frame.locator('.eos-transfer-list').last()
  const el2 = el1.locator('li').first()
  await expect(el2).toHaveAttribute('title', '{4} Заголовок')
 
  //Кнопка "class="anticon anticon-right" содержит disabled
  await frame.locator('.anticon-right').isDisabled()

});
