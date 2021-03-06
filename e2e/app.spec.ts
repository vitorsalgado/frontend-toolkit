import * as Config from '../config'

const { devURL } = Config.devServer

describe('/ (Home)', () => {
  beforeEach(async () => await page.goto(devURL))

  it('should contain a #root element', async () => {
    await page.waitForSelector('#root')
  })
})
