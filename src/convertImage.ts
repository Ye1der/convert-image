import path from 'path'
import sharp from '../node_modules/sharp/lib/index'
import { Format, formats } from './constants'
import ora from '../node_modules/ora/index'

interface Params {
  url: string
  format: Format
}

export async function convertImage({ url, format }: Params) {
  const loader = ora('Convirtiendo imagen...').start()
  loader.color = 'yellow'

  const formatImage = path.extname(url).replace('.', '')
  const nameImage = path.basename(url)

  if (!formats.includes(formatImage)) {
    loader.fail(`La imagen ${nameImage} tiene un formato no soportado`)
  }

  try {
    sharp(url)
      .toFormat(format)
      .toFile(url.replace(formatImage, format), (err, info) => {
        if (err) {
          loader.fail('Error al convertir la imagen ' + nameImage)
        } else {
          loader.succeed(`Imagen ${nameImage} convertida a ${format}`)
        }
      })
  } catch (error) {
    loader.fail('Error al convertir la imagen ' + nameImage)
  }
}
