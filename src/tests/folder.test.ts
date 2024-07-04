import inquirer from 'inquirer'
import path from 'path'
import { it, describe, vi, expect } from 'vitest'
import fs from 'node:fs/promises'
import { folder } from '../folder.js'

const localRoute = process.argv[1]
const rootRoute = path.join(path.dirname(localRoute), '../../../../../')
const imageRoute = path.join(rootRoute, '/public/test.jpg')
const folderRoute = path.join(rootRoute, '/public/')

describe('Function folder', () => {
  it('Should convert the all images .jpg to .png', async () => {
    vi.spyOn(inquirer, 'prompt')
      .mockResolvedValueOnce({ route: folderRoute })
      .mockResolvedValueOnce({ type: 'png' })
      .mockResolvedValueOnce({ verify: true })
      .mockResolvedValueOnce({ type: 'jpg' })
      .mockResolvedValueOnce({ verify: 'true' })

    await folder()

    const routeNewImage = imageRoute.replace('jpg', 'png')
    const existNewImage = await fs.stat(routeNewImage)
    expect(existNewImage.isFile()).toBe(true)
    await fs.unlink(routeNewImage)
  })
})
