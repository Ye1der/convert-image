import fs from 'node:fs/promises'
import { Format, formats } from './constants'
import path from 'node:path'
import { convertImage } from './convertImage'
import { loopInput } from './utils'
import inquirer from 'inquirer'
import chalk from '../node_modules/chalk/source/index'

export async function folder() {
  const urlFolder = await loopInput(async () => {
    const folderRoute = await inquirer.prompt({
      type: 'input',
      name: 'route',
      message: 'Ruta de la carpeta',
      default: '/ruta/carpeta'
    })

    try {
      const folder = await fs.stat(folderRoute.route)
      if (!folder.isDirectory())
        throw new Error('La ruta debe apuntar a una carpeta')
      return folderRoute.route
    } catch (error) {
      throw new Error('La ruta debe apuntar a una carpeta')
    }
  })

  const format = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'Formato a convertir las imágenes: ',
    choices: formats
  })

  const files = await fs.readdir(urlFolder)

  let images = files.filter((file) => {
    const ext = path.extname(file).toLowerCase().replace('.', '')
    return formats.includes(ext)
  })

  console.log('\n' + chalk.bold.yellow('• Imágenes a convertir:\n'))

  images.forEach((image) => {
    console.log(' ', chalk.bold.magentaBright(image))
  })

  console.log('')

  const filter = await inquirer.prompt({
    type: 'confirm',
    name: 'verify',
    message: '¿Quieres convertir solo las imágenes que tenga un cierto formato?'
  })

  if (filter.verify) {
    const newFormat = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Formato a convertir las imágenes: ',
      choices: formats
    })

    images = images.filter(
      (image) => path.extname(image) == '.' + newFormat.type
    )

    console.log('\n' + chalk.bold.yellow('• Imágenes a convertir:\n'))

    images.forEach((image) => {
      console.log(' ', chalk.bold.magentaBright(image))
    })

    console.log('')
  }

  const verification = await inquirer.prompt({
    type: 'confirm',
    name: 'verify',
    message: '¿Convertir imágenes?'
  })

  if (verification.verify) {
    for (const image of images) {
      await convertImage({
        url: path.join(urlFolder, image),
        format: format.type
      })
    }
  } else {
    console.log(chalk.bold.magenta('\n• Ninguna imagen se convirtió\n'))
  }
}
