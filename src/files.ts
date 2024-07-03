import inquirer from 'inquirer'
import { loopInput } from './utils'
import fs from 'node:fs/promises'
import { Format, formats } from './constants'
import chalk from '../node_modules/chalk/source/index'
import path from 'node:path'
import { convertImage } from './convertImage'

export async function files() {
  let loop = true
  let imagesToConvert = []

  do {
    const urlImage = await loopInput(async () => {
      const image = await inquirer.prompt({
        type: 'input',
        name: 'route',
        message: 'Ruta de la imagen:',
        default: '/ruta/imagen.png'
      })

      try {
        const file = await fs.stat(image.route)

        if (!file.isFile()) {
          throw new Error('La ruta debe apuntar hacia una imagen')
        }
      } catch (error) {
        throw new Error('La ruta hacia la imagen es invalida')
      }

      return image.route
    })

    const format = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Formato a convertir la imagen: ',
      choices: formats
    })

    console.log('')

    const otherImage = await inquirer.prompt({
      type: 'confirm',
      name: 'verify',
      message: '¿Quieres agregar otra imagen?'
    })

    imagesToConvert.push({
      url: urlImage,
      format: format.type
    })

    loop = otherImage.verify
  } while (loop)

  console.log('\n' + chalk.bold.yellow('• Imágenes a convertir:\n'))

  console.log(
    imagesToConvert.map((image) => {
      return {
        imagen: path.basename(image.url),
        formato: image.format
      }
    }),
    '\n'
  )

  const verification = await inquirer.prompt({
    type: 'confirm',
    name: 'verify',
    message: '¿Convertir imágenes?'
  })

  if (verification.verify) {
    for (const image of imagesToConvert) {
      await convertImage({
        url: image.url,
        format: image.format as Format
      })
    }
  } else {
    console.log(chalk.bold.magenta('\n• Ninguna imagen se convirtió\n'))
  }
}
