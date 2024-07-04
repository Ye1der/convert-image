import { folder } from './folder.js'
import { files } from './files.js'
import inquirer from 'inquirer'

console.log('')

const choices = [
  '• Convertir una ó varias imágenes',
  '• Convertir todas las imágenes de una carpeta',
  '• salir'
]

const action = await inquirer.prompt({
  type: 'list',
  name: 'action',
  message: '¿Que quieres hacer?',
  choices
})

if (action.action == choices[0]) await files()
if (action.action == choices[1]) await folder()
console.log('')

if (action.action == choices[2]) process.exit(1)
