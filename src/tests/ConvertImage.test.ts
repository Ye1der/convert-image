import { it, describe, expect } from 'vitest'
import { convertImage } from '../convertImage.js'
import path from 'path'
import fs from 'node:fs/promises'
import { Format } from '../constants.js'

const localRoute = process.argv[1]
const rootRoute = path.join(path.dirname(localRoute), '../../../../../')
const imageRoute = path.join(rootRoute, '/public/test.jpg')

describe('Function ConvertImage', () => {
  it('Should convert the image test.jpg to .png', async () => {
    const result = await convertImage({ url: imageRoute, format: 'png' })
    const existNewImagePng = await fs.stat(imageRoute.replace('jpg', 'png'))

    expect(existNewImagePng.isFile()).toBe(true)
    expect(result.includes('convertida a png')).toBe(true)

    await fs.unlink(imageRoute.replace('jpg', 'png'))
  })

  it('Should return error invalid format', async () => {
    try {
      const result = await convertImage({
        url: 'image/with/bad/format',
        format: 'png'
      })

      expect(result.includes('formato no soportado')).toBe(true)
    } catch (error) {
      if (typeof error == 'string') {
        expect(error.includes('formato no soportado')).toBe(true)
      }
    }
  })

  it('Should return error to convert image', async () => {
    try {
      const result = await convertImage({
        url: '/image/with/bad/route.webp',
        format: 'png'
      })

      expect(result.includes('Error al convertir la imagen')).toBe(true)
    } catch (error) {
      if (typeof error == 'string') {
        expect(error.includes('Error al convertir la imagen')).toBe(true)
      }
    }
  })
})
