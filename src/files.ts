import inquirer from 'inquirer'
import { loopInput } from './utils.js'
import fs from 'node:fs/promises'
import { Format, formats } from './constants.js'
import chalk from 'chalk'
import path from 'node:path'
import { convertImage } from './convertImage.js'
import ora from 'ora'

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
      const loader = ora('Convirtiendo imagen...')
      loader.color = 'yellow'
      loader.start()

      try {
        const result = await convertImage({
          url: image.url,
          format: image.format as Format
        })

        loader.succeed(result)
      } catch (error) {
        loader.fail(error as string)
      }
    }
  } else {
    console.log(chalk.bold.magenta('\n• Ninguna imagen se convirtió\n'))
  }
}
