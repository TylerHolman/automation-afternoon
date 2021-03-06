const {Builder, Capabilities, By}  = require('selenium-webdriver')

require(`chromedriver`)

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get(`http://127.0.0.1:5500/movieList/index.html`)
    popUp = await driver.findElement(By.xpath(`//aside`))
})

afterAll(async () => {
    await driver.quit()
})

test(`add a movie`, async () => {
    const searchTerm = `Tenet`
    const inputField = await driver.findElement(By.xpath(`//input`))
    await inputField.sendKeys(`Tenet`)
    await driver.sleep(2000)
    const movieButton = await driver.findElement(By.css(`button`))
    await movieButton.click()
    await driver.sleep(2000)

    const theResult = await driver.findElement(By.xpath(`//li/span`)).getText()
    expect(theResult).toBe(searchTerm)
    await driver.sleep(2000)


})

// test(`cross of a movie`, async () => {
//     const crossOff = await driver.findElement(By.css(`span`))
//     await crossOff.click()
//     await driver.sleep(2000)
//     expect(await crossOff.getAttribute(`class`)).toBe(`checked`)
   
// })
describe(`message`, () => {
    
    test(`cross of a movie`, async () => {
        const crossOff = await driver.findElement(By.css(`span`))
        await crossOff.click()
        await driver.sleep(1000)
        expect(await crossOff.getAttribute(`class`)).toBe(`checked`)
       
    })
    test(`pop up message`, async () => {
        popUp = await driver.findElement(By.xpath(`//aside`))
        expect(await popUp.getText(`Tenet watched!`))
        
    })
    test('adding movie back', async () => {
        const crossOff = await driver.findElement(By.css(`span`))
        await crossOff.click()
        expect(await popUp.getText()).toBe(`Tenet added back!`)
        await driver.sleep(1000)
      
    })
})

test(`delete a movie`, async () => {
   const deletebtn = await driver.findElement(By.css(`.delete-button`))
   await deletebtn.click()
   await driver.sleep(1000)
})

